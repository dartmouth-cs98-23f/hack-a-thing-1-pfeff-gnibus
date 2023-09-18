import { IClass } from "../types";
import { Table, Space, ConfigProvider, Empty } from 'antd';
import type { ColumnsType } from 'antd/es/table';

import { useAppSelector, useAppDispatch } from "../hooks";

import { addClass } from "./classesSlice";


interface Props {
  courses: IClass[];
}

function CourseResult({ courses }: Props): JSX.Element {
  const dispatch = useAppDispatch()

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
          <a
            onClick={() => dispatch(addClass(record))
            }>Add to Calendar</a>
        </Space>
      ),
    },
  ];

  // https://stackoverflow.com/questions/42186723/antd-ui-library-overriding-table-behavior-on-empty-data
  return (
    <ConfigProvider renderEmpty={() => <Empty style={{ margin: '1rem' }} image={Empty.PRESENTED_IMAGE_SIMPLE} description="No courses found" />}>
      <Table tableLayout='fixed' pagination={false} columns={columns} dataSource={courses} rowKey="periodCode" />
    </ConfigProvider>
  );
}

export default CourseResult;