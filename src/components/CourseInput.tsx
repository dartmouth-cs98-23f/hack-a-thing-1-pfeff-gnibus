import { useState } from 'react';
import fetchCourseInfo from '../utils/fetchCourseInfo';
import CourseResult from './CourseResult';
import { Input } from 'antd';

const { Search } = Input;

// gnibus look over this because I'm not sure about all the typescript stuff


function CourseInput(): JSX.Element {
  const [courseResults, setCourseResults] = useState<any[]>([]);

  const onSearch = async (value: string) => {
    try {
      const numberIndex = value.search(/[0-9]/);
      const subj = value.slice(0, numberIndex).trim().toUpperCase();
      const crsenum = value.slice(numberIndex).trim();
      const courses = await fetchCourseInfo(subj, crsenum);
      setCourseResults(courses);
    } catch (err) {
      setCourseResults([]);
      console.error(err);
    }
  };

  return (
    <div className="text-input">
      <Search className="search-bar" placeholder="Enter course code (e.g., COSC 31)" onSearch={onSearch} style={{ width: 200 }} />
      <CourseResult courses={courseResults} />

    </div>
  );
}

export default CourseInput;
