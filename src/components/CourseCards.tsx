import { IClass } from "../types";
import { Card, Empty } from 'antd';
import './components.scss';
import { useAppDispatch, useAppSelector } from "../hooks";
import { removeClass } from "./classesSlice";

function CourseCards(): JSX.Element {
  const classes = useAppSelector((state) => state.classes.classesList);
  const dispatch = useAppDispatch();
  return (
    <>
      {classes.length === 0 && <Empty className='empty-courses' image={Empty.PRESENTED_IMAGE_SIMPLE} description="No courses added yet" />}
      <div className="course-cards">
        {classes &&
          classes.map((course) => (
            <Card
              key={course.periodCode}
              bodyStyle={{ paddingTop: '1rem', paddingBottom: '1rem' }}
              title={course.classTitle}
              extra={<a onClick={() => dispatch(removeClass(course.id))}>Remove</a>}
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
