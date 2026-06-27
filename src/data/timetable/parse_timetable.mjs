/** @import {Welcome} from "./timetable_returntype" */

export class Room {
  /**
   *
   * @param {string} building
   * @param {number} level
   * @param {number} number
   */
  constructor(building, level, number) {
    /** @type {string} */
    this.building = building;

    /** @type {number} */
    this.level = level;

    /** @type {number} */
    this.number = number;
  }

  /**
   *
   * @param {Welcome} api
   * @param {string} id
   * @returns {Room | null}
   */
  static fromAPI(api, id) {
    const obj = api.raeume?.[id];
    if (!obj?.nummer) return null;

    return Room.parseFromRoomDescription(obj.nummer);
  }

  /**
   * Parses a room description in the format BLNN
   * Example: "G102" -> building="G", level=1, number=2
   *
   * @param {string} desc
   * @returns {Room}
   */
  static parseFromRoomDescription(desc) {
    const match = desc.trim().match(/^([A-Za-z]+)(\d)(\d+)$/);

    if (!match) {
      throw new Error(`Invalid room description: "${desc}"`);
    }

    const [, building, level, number] = match;

    return new Room(building, Number(level), Number(number));
  }

  toRoom_Description() {
    return `${this.building}${this.level}${this.number}`;
  }
}

export class Course {
  constructor(name, rooms) {
    /** @type {string} */
    this.name = name;

    /** @type {Room[]} */
    this.rooms = rooms;
  }

  /**
   *
   * @param {Welcome} api
   * @param {*} termin
   * @returns {Course}
   */
  static fromTermin(api, termin) {
    const rooms = [];

    for (const id of termin.raeume ?? []) {
      const room = Room.fromAPI(api, id);
      if (room) rooms.push(room);
    }

    return new Course(
      termin.fach_name || termin.kurztitel || "Unknown Course",
      rooms,
    );
  }
}

export class SchoolDay {
  /**
   *
   * @param {Course[]} slots
   */
  constructor(slots = []) {
    /** @type {Course[]} */
    this.slots = slots;
  }

  /**
   * @param {Course} course
   */
  addCourse(course) {
    this.slots.push(course);
  }
}

export class TimeTable {
  constructor() {
    /** @type {SchoolDay} */
    this.monday = new SchoolDay();

    /** @type {SchoolDay} */
    this.tuesday = new SchoolDay();

    /** @type {SchoolDay} */
    this.wednesday = new SchoolDay();

    /** @type {SchoolDay} */
    this.thursday = new SchoolDay();

    /** @type {SchoolDay} */
    this.friday = new SchoolDay();
  }

  /**
   * Creates an "average week" timetable from the API response.
   * (ignores dates, treats occurrences as weekly pattern)
   *
   * @param {Welcome} api
   * @returns {TimeTable}
   */
  static fromAPI(api) {
    const timetable = new TimeTable();

    if (!api?.termine) return timetable;

    const roomTable = api.raeume ?? {};

    const dayMap = {
      1: timetable.monday,
      2: timetable.tuesday,
      3: timetable.wednesday,
      4: timetable.thursday,
      5: timetable.friday,
    };

    /** @type {Map<string, Course>} */
    const courseCache = new Map();

    for (const termin of Object.values(api.termine)) {
      const courseId = termin.lvid || termin.key;

      // --- build course once ---
      if (!courseCache.has(courseId)) {
        const rooms = [];

        for (const id of termin.raeume ?? []) {
          const r = roomTable[id];
          if (!r?.nummer) continue;

          rooms.push(Room.parseFromRoomDescription(r.nummer));
        }

        courseCache.set(
          courseId,
          new Course(
            termin.fach_name || termin.kurztitel || "Unknown Course",
            rooms,
          ),
        );
      }

      const course = courseCache.get(courseId);

      // --- detect weekdays where this course appears ---
      const weekdays = new Set();

      for (const zeit of Object.values(termin.zeiten ?? {})) {
        if (!zeit?.datum) continue;

        const [d, m, y] = zeit.datum.split(".").map(Number);
        const date = new Date(y, m - 1, d);

        const jsDay = date.getDay(); // 0=Sun ... 6=Sat

        if (jsDay >= 1 && jsDay <= 5) {
          weekdays.add(jsDay);
        }
      }

      // --- assign course once per weekday ---
      for (const day of weekdays) {
        dayMap[day].addCourse(course);
      }
    }

    return timetable;
  }
}
