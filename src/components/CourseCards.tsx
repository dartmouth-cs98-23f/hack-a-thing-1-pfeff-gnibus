import React from "react";
import { IClass } from "../types";
import { Card } from 'antd';

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
          bodyStyle={{ padding: '1rem' }}
          title={course.classTitle}
          extra={<a onClick={ () => deleteCourse(course)}>Remove</a>}
          style={{ width: 300 }}
        >
          <p>{course.periodCode}</p>
          <p>Card content</p>
          <p>Card content</p>
        </Card>
        ))}
    </div>
  );
}

export default CourseCards;
