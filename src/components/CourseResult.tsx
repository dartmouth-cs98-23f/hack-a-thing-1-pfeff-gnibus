import { IClass } from "../types";
import { Table, Space } from 'antd';
import type { ColumnsType } from 'antd/es/table';

interface Props {
  courses: IClass[];
  addCourse: (course: IClass) => void;
}

function CourseResult({ courses, addCourse }: Props): JSX.Element {

  const columns: ColumnsType<IClass> = [
    {
      title: 'Course Title',
      dataIndex: 'classTitle',
      key: 'courseTitle',
    },
    {
      title: 'Location',
      dataIndex: 'location',
      key: 'location',
    },
    {
      title: 'Period Code',
      dataIndex: 'periodCode',
      key: 'periodCode',
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <Space size="middle">
          <a onClick={() => addCourse(record)}>Add to Calendar</a>
        </Space>
      ),
    },
  ];

  return (
    <Table tableLayout='fixed' pagination={false} columns={columns} dataSource={courses} />
  );
}

export default CourseResult;