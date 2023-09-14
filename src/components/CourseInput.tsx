import React, { useState, ChangeEvent } from 'react';
import fetchPeriodCodes from '../utils/fetchPeriodCodes';

// gnibus look over this because I'm not sure about all the typescript stuff

function CourseInput(): JSX.Element {
  const [courseName, setCourseName] = useState<string>('');
  const [courseNumber, setCourseNumber] = useState<string>('');
  const [error, setError] = useState<boolean>(false);
  const [periodCodes, setPeriodCodes] = useState<string[]>([]);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement>,
    setFunction: React.Dispatch<React.SetStateAction<string>>,
    setErrorFunction: React.Dispatch<React.SetStateAction<boolean>>
  ) => {
    if (setErrorFunction) {
      setErrorFunction(false);
    }
    setFunction(e.target.value);
  };

  const handleSubmit = async () => {
    try {
      console.log(courseName, courseNumber);
      const codes = await fetchPeriodCodes(courseName, courseNumber);
      setPeriodCodes(codes);
    } catch (err) {
      console.error('Error:', err);
      setError(true);
    }
  };

  return (
    <div className="text-input">
      <input
        type="text"
        value={courseName}
        onChange={(e) => handleChange(e, setCourseName, setError)}
      />
      <input
        type="text"
        value={courseNumber}
        onChange={(e) => handleChange(e, setCourseNumber, setError)}
      />
      <button type="button" onClick={handleSubmit}>
        Submit
      </button>
      {error && <p>Error occurred while fetching data.</p>}
      {periodCodes.length > 0 ? (
        <ul>
          {periodCodes.map((code) => (
            <p key={code}>{code}</p>
          ))}
        </ul>
      ) : (
        <p>No period codes found.</p>
      )}
    </div>
  );
}

export default CourseInput;
