type TimeTable = {
  days: [SchoolDay, SchoolDay, SchoolDay, SchoolDay, SchoolDay];
};

type SchoolDay = {
  slots: Room[];
};

type Room = {
  building: string;
  level: number;
  number: number;
};
