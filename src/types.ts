export interface IClass {
  subjectCode: string;
  courseNum: string;
  classTitle: string;
  instructor: string;
  periodCode: string;
  location: string;
  main?: IPeriod;
  xHour?: IPeriod;
}

export interface IPeriod {
  time: [number, number, number, number];
  days: string[];
}

export interface ICalendarYear {
  summer: [Date, Date];
  fall: [Date, Date];
  winter: [Date, Date];
  spring: [Date, Date];
}

// additioanl improvements: redux, date timing, headers, add the antd popup walkthroughs for a tutorial thing, edit functionality for each course (customize course name and description)
// include x hours on course individually or on all
// or maybe we have x hours toggleable and downloadblae as a separate calendar
// add google analytics