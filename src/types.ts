export interface IClass {
  subjectCode: string;
  courseNum: string;
  classTitle: string;
  instructor: string;
  periodCode: string;
  building: string;
  roomNumber: string;
  main?: Period;
  xHour?: Period;
}

export interface Period {
  time: [number, number, number, number];
  days: string[];
}