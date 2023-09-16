import { IClass } from "../types";
import { Card, Empty } from 'antd';
import './components.scss';

interface CourseCardProps {
  courses: IClass[];
  deleteCourse: (course: IClass) => void;
}

function CourseCards({ courses, deleteCourse }: CourseCardProps): JSX.Element {
  return (
    <>
      {courses.length === 0 && <Empty className='empty-courses' image={Empty.PRESENTED_IMAGE_SIMPLE} description="No courses added yet"/>}
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
    </>
  );
}

export default CourseCards;
