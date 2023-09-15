export interface IClass {
  subjectCode: string;
  courseNum: string;
  classTitle: string;
  instructor: string;
  periodCode: string;
  location: string;
  main?: Period;
  xHour?: Period;
}

export interface Period {
  time: [number, number, number, number];
  days: string[];
}