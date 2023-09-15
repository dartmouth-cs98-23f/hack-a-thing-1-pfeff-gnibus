import React from "react";
import { IClass } from "../types";
import { Card } from 'antd';
import './components.scss';

interface CourseCardProps {
  courses: IClass[];
  deleteCourse: (course: IClass) => void;
}

function CourseCards({ courses, deleteCourse }: CourseCardProps): JSX.Element {

  return (
    <div className="course-cards">
      {courses &&
        courses.map((course) => (
        <Card
          key={course.periodCode}
          bodyStyle={{ paddingTop: '1rem', paddingBottom: '1rem'}}
          title={course.classTitle}
          extra={<a onClick={ () => deleteCourse(course)}>Remove</a>}
          style={{ width: 300 }}
        >
          <p><span className="bold">Period: </span>{course.periodCode}</p>
          <p><span className="bold">Location: </span>{course.location}</p>
          <p><span className="bold">Instructor: </span>{course.instructor}</p>
        </Card>
        ))}
    </div>
  );
}

export default CourseCards;
