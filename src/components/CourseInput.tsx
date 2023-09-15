import React, { useState } from 'react';
import fetchCourseInfo from '../utils/fetchCourseInfo';
import CourseResult from './CourseResult';
import { Input } from 'antd';
import { IClass } from '../types';

const { Search } = Input;
// import { Class } from '../types';

// gnibus look over this because I'm not sure about all the typescript stuff

interface CIProps {
  addCourseToState: (course: IClass) => void;
}

function CourseInput({ addCourseToState }: CIProps): JSX.Element {
  const [error, setError] = useState<boolean>(false);
  const [courseResults, setCourseResults] = useState<any[]>([]);

  function addCourseMiddle(course: IClass) {
    addCourseToState(course);
  }

  const onSearch = async (value: string) => {
    try {
      const numberIndex = value.search(/[0-9]/);
      const subj = value.slice(0, numberIndex).trim().toUpperCase();
      const crsenum = value.slice(numberIndex).trim();
      const courses = await fetchCourseInfo(subj, crsenum);
      setCourseResults(courses);
    } catch (err) {
      console.error('Error:', err);
      setError(true);
    }
  };

  return (
    <div className="text-input">
      <Search placeholder="Enter course code (e.g., COSC 31)" onSearch={onSearch} style={{ width: 200 }} />
      {error && <p>Error occurred while fetching data.</p>}
      <CourseResult courses={courseResults} addCourse={addCourseMiddle} />

    </div>
  );
}

export default CourseInput;
