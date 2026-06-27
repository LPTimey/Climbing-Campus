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

export class SchoolDay {
  /**
   *
   * @param {Room[]} slots
   */
  constructor(slots = []) {
    /** @type {Room[]} */
    this.slots = slots;
  }

  /**
   * @param {Room} room
   */
  addRoom(room) {
    this.slots.push(room);
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
   * FIXME: only adds the first one everywhere
   * Creates a TimeTable from the API response.
   *
   * @param {import("./timetable_returntype").Welcome} api
   * @returns {TimeTable}
   */
  static fromAPI(api) {
    const timetable = new TimeTable();

    const days = [
      timetable.monday,
      timetable.tuesday,
      timetable.wednesday,
      timetable.thursday,
      timetable.friday,
    ];

    api.events.forEach((dayEvents, dayIndex) => {
      const schoolDay = days[dayIndex];
      if (!schoolDay) return;

      /** @type {Set<string>} */
      const seenRooms = new Set();

      for (const event of dayEvents) {
        if (typeof event !== "object" || event === null) continue;

        const rooms = event.raeume
          .split(",")
          .map((room) => room.trim())
          .filter(Boolean);

        for (const room of rooms) {
          if (seenRooms.has(room)) continue;

          seenRooms.add(room);
          schoolDay.addRoom(Room.parseFromRoomDescription(room));
        }
      }
    });

    return timetable;
  }
}
