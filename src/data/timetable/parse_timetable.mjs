/** @import {API} from "./THI_API" */

/* =========================
   Room
========================= */

/**
 * Represents a physical or virtual room.
 */
export class Room {
  /**
   * @param {string} building
   * @param {number} level
   * @param {number} number
   */
  constructor(building, level, number) {
    this.building = building;
    this.level = level;
    this.number = number;
  }

  /**
   * Parse room from API entry.
   * @param {API} api
   * @param {string} id
   * @returns {Room|null}
   */
  static fromAPI(api, id) {
    const obj = api?.raeume?.[id];
    if (!obj?.nummer) return null;
    return Room.parse(obj.nummer);
  }

  /**
   * Parses room string like "G102", "A012", "BIBLIOTHEK", "VIRTUELL".
   * @param {string} desc
   * @returns {Room|null}
   */
  static parse(desc) {
    if (!desc) return null;

    const normalized = desc.trim().toUpperCase();

    if (normalized === "BIBLIOTHEK") {
      return new Room("A", 0, 0);
    }

    if (normalized === "VIRTUELL") {
      return null;
    }

    const match = desc.trim().match(/^([A-Za-z]+)(\d)(\d+)$/);

    if (!match) {
      throw new Error(`Invalid room description: "${desc}"`);
    }

    const [, building, level, number] = match;

    return new Room(building, Number(level), Number(number));
  }

  /**
   * @returns {string}
   */
  toString() {
    return `${this.building}${this.level}${this.number}`;
  }

  /**
   * @returns {{building: string, level: number, number: number}}
   */
  toJSON() {
    return {
      building: this.building,
      level: this.level,
      number: this.number,
    };
  }
}

/* =========================
   Course Slot
========================= */

/**
 * A single scheduled occurrence of a course.
 */
export class CourseSlot {
  /**
   * @param {Course} course
   * @param {Date} date
   * @param {string} start
   * @param {string} end
   * @param {(Room|null)[]} rooms
   */
  constructor(course, date, start, end, rooms = []) {
    this.course = course;
    this.date = date;
    this.start = start;
    this.end = end;
    this.rooms = rooms;
  }

  /**
   * Safe serialization (breaks circular reference via course)
   * @returns {{
   *  courseName: string,
   *  date: string,
   *  start: string,
   *  end: string,
   *  rooms: object[]
   * }}
   */
  toJSON() {
    return {
      courseName: this.course?.name ?? "Unknown Course",
      date: this.date.toISOString(),
      start: this.start,
      end: this.end,
      rooms: this.rooms.map((r) => r?.toJSON?.()).filter(Boolean),
    };
  }
}

/* =========================
   Course
========================= */

/**
 * A course grouping multiple scheduled slots.
 */
export class Course {
  /**
   * @param {string} name
   */
  constructor(name) {
    this.name = name;
    this.slots = [];
  }

  /**
   * @param {CourseSlot} slot
   */
  addSlot(slot) {
    this.slots.push(slot);
  }
}

/* =========================
   SchoolDay
========================= */

/**
 * A day containing multiple course slots.
 */
export class SchoolDay {
  constructor() {
    /** @type {CourseSlot[]} */
    this.slots = [];
  }

  /**
   * Creates a stable hash for deduplication.
   * @param {CourseSlot} slot
   * @returns {string}
   */
  static slotKey(slot) {
    const roomKey = (slot.rooms ?? [])
      .map((r) => r?.toString?.() ?? "")
      .filter(Boolean)
      .sort()
      .join("|");

    return [slot.course?.name ?? "", slot.start, slot.end, roomKey].join("::");
  }

  /**
   * @param {CourseSlot} slot
   */
  add(slot) {
    if (!this._seen) {
      this._seen = new Set();
    }

    const key = SchoolDay.slotKey(slot);

    if (this._seen.has(key)) return;

    this._seen.add(key);
    this.slots.push(slot);

    this.slots.sort((a, b) => {
      const toMin = (t) => {
        const [h, m] = t.split(".").map(Number);
        return h * 60 + m;
      };
      return toMin(a.start) - toMin(b.start);
    });
  }

  /**
   * @returns {{slots: object[]}}
   */
  toJSON() {
    return {
      slots: this.slots.map((s) => s.toJSON()),
    };
  }
}

/* =========================
   TimeTable
========================= */

/**
 * Weekly timetable (Mon–Fri).
 */
export class TimeTable {
  constructor() {
    this.monday = new SchoolDay();
    this.tuesday = new SchoolDay();
    this.wednesday = new SchoolDay();
    this.thursday = new SchoolDay();
    this.friday = new SchoolDay();
  }

  /**
   * @param {TimeTable} tt
   * @returns {Record<number, SchoolDay>}
   */
  static dayMap(tt) {
    return {
      1: tt.monday,
      2: tt.tuesday,
      3: tt.wednesday,
      4: tt.thursday,
      5: tt.friday,
    };
  }

  /**
   * @param {string} ddmmyyyy
   * @returns {Date}
   */
  static parseDate(ddmmyyyy) {
    const [d, m, y] = ddmmyyyy.split(".").map(Number);
    return new Date(y, m - 1, d);
  }

  /**
   * @param {import("./THI_API").Zeit<any, any, any>} zeit
   * @returns {{start: string, end: string}}
   */
  static extractTime(zeit) {
    return {
      start: zeit.zeitvon,
      end: zeit.zeitbis,
    };
  }

  /**
   * Build timetable from API.
   * @param {API} api
   * @returns {TimeTable}
   */
  static fromAPI(api) {
    const tt = new TimeTable();
    if (!api?.termine) return tt;

    const roomCache = api.raeume ?? {};
    const courseMap = new Map();
    const dayMap = TimeTable.dayMap(tt);

    for (const termin of Object.values(api.termine)) {
      const courseId = termin.lvid || termin.key;

      if (!courseMap.has(courseId)) {
        courseMap.set(
          courseId,
          new Course(termin.fach_name || termin.kurztitel || "Unknown Course"),
        );
      }

      const course = courseMap.get(courseId);

      for (const zeit of Object.values(termin.zeiten ?? {})) {
        if (!zeit?.datum || !zeit?.zeitvon || !zeit?.zeitbis) continue;

        const date = TimeTable.parseDate(zeit.datum);
        const jsDay = date.getDay();

        if (jsDay < 1 || jsDay > 5) continue;

        const { start, end } = TimeTable.extractTime(zeit);

        const rooms = (termin.raeume ?? [])
          .map((id) => {
            const r = roomCache[id];
            if (!r?.nummer) return null;
            return Room.parse(r.nummer);
          })
          .filter(Boolean);

        const slot = new CourseSlot(course, date, start, end, rooms);

        course.addSlot(slot);
        dayMap[jsDay].add(slot);
      }
    }

    return tt;
  }

  /**
   * Safe JSON export (no circular references)
   * @returns {{
   *  monday: object,
   *  tuesday: object,
   *  wednesday: object,
   *  thursday: object,
   *  friday: object
   * }}
   */
  toJSON() {
    return {
      monday: this.monday.toJSON(),
      tuesday: this.tuesday.toJSON(),
      wednesday: this.wednesday.toJSON(),
      thursday: this.thursday.toJSON(),
      friday: this.friday.toJSON(),
    };
  }

  /**
   * Rebuild TimeTable from serialized JSON.
   * @param {{
   *  monday: {slots: any[]},
   *  tuesday: {slots: any[]},
   *  wednesday: {slots: any[]},
   *  thursday: {slots: any[]},
   *  friday: {slots: any[]}
   * }} json
   * @returns {TimeTable}
   */
  static fromJSON(json) {
    const tt = new TimeTable();

    const dayMap = {
      monday: tt.monday,
      tuesday: tt.tuesday,
      wednesday: tt.wednesday,
      thursday: tt.thursday,
      friday: tt.friday,
    };

    /** @type {Map<string, Course>} */
    const courseCache = new Map();

    for (const [day, data] of Object.entries(json ?? {})) {
      const targetDay = dayMap[day];
      if (!targetDay || !data?.slots) continue;

      for (const slot of data.slots) {
        const courseName = slot.courseName ?? "Unknown Course";

        if (!courseCache.has(courseName)) {
          courseCache.set(courseName, new Course(courseName));
        }

        const course = courseCache.get(courseName);

        const date = slot.date ? new Date(slot.date) : new Date();

        const rooms = (slot.rooms ?? []).map(
          (r) => new Room(r.building, r.level, r.number),
        );

        const reconstructedSlot = new CourseSlot(
          course,
          date,
          slot.start,
          slot.end,
          rooms,
        );

        course.addSlot(reconstructedSlot);
        targetDay.add(reconstructedSlot);
      }
    }

    return tt;
  }
}
