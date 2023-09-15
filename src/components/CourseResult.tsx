import { Class } from "../types";
import { Table, Space } from 'antd';
import type { ColumnsType } from 'antd/es/table';

interface Props {
  courses: Class[];
}

function CourseResult({ courses }: Props): JSX.Element {

  const columns: ColumnsType<Class> = [
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
      render: () => (
        <Space size="middle">
          <a>Add to Calendar</a>
        </Space>
      ),
    },
  ];

  return (
    <Table tableLayout='fixed' pagination={false} columns={columns} dataSource={courses} />
  );
}

export default CourseResult;