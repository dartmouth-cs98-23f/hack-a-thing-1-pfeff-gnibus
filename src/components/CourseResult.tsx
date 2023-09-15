import { Class } from "../types";
import { Table } from 'antd';
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
      // render: (_, record) => (
      //   <Space size="middle">
      //     <a>Invite {record.name}</a>
      //     <a>Delete</a>
      //   </Space>
      // ),
    },
  ];

  return (
    <Table pagination={false} columns={columns} dataSource={courses} />
  );
}

export default CourseResult;