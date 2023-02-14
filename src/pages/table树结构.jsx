import { Pagination, Table, Form, Button, Select, Input, message } from 'antd';
import { useState, useEffect, useCallback } from 'react';
import cloneDeep from 'lodash/cloneDeep';
import assign from 'lodash/assign';

const data = [
  {
    key: 1,
    name: 'John Brown sr.',
    age: 60,
    address: 'New York No. 1 Lake Park',
    templateScores: [1, 2],
    children: [
      {
        key: 11,
        name: 'John Brown',
        age: 42,
        address: 'New York No. 2 Lake Park',
        templateScores: [1, 2],
      },
      {
        key: 12,
        name: 'John Brown jr.',
        age: 30,
        address: 'New York No. 3 Lake Park',
        templateScores: [1, 2],
        children: [
          {
            key: 121,
            name: 'Jimmy Brown',
            age: 16,
            address: 'New York No. 3 Lake Park',
            templateScores: [1, 2],
          },
        ],
      },
      {
        key: 13,
        name: 'Jim Green sr.',
        age: 72,
        address: 'London No. 1 Lake Park',
        templateScores: [1, 2],
        children: [
          {
            key: 131,
            name: 'Jim Green',
            age: 42,
            address: 'London No. 2 Lake Park',
            templateScores: [1, 2],
            children: [
              {
                key: 1311,
                name: 'Jim Green jr.',
                age: 25,
                address: 'London No. 3 Lake Park',
                templateScores: [1, 2],
              },
              {
                key: 1312,
                name: 'Jimmy Green sr.',
                age: 18,
                address: 'London No. 4 Lake Park',
                templateScores: [1, 2],
              },
            ],
          },
        ],
      },
    ],
  },
  {
    key: 2,
    name: 'Joe Black',
    age: 32,
    address: 'Sydney No. 1 Lake Park',
    templateScores: [1, 2],
  },
];

const App = () => {
  const type = 4;
  const [form] = Form.useForm();
  const [formData, setFormData] = useState({});

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Age',
      dataIndex: 'age',
      key: 'age',
      width: '12%',
    },
    {
      title: 'Address',
      dataIndex: 'address',
      width: '30%',
      key: 'address',
    },

    {
      title: '分值',
      dataIndex: 'templateScores',
      key: 'templateScores',
      width: 250,
      render: (text, record, index) => {
        return (
          <Form.Item key={record?.key} name={record?.key}>
            {type == 5 ? (
              <Input
                onChange={(val) =>
                  setFormData(assign(formData, form.getFieldsValue()))
                }
              />
            ) : (
              <Select
                allowClear
                style={{ width: 180 }}
                options={text?.map((val) => ({ value: val, label: val }))}
                onChange={(val) =>
                  setFormData(assign(formData, form.getFieldsValue()))
                }
              />
            )}
          </Form.Item>
        );
      },
    },
  ];

  const onFinish = async () => {
    let scoreList = [];
    Object.entries(formData)?.map(([key, val]) => {
      if (val) {
        scoreList.push({
          id: key,
          score: +val,
        });
      }
    });
    let params = {
      scoreList,
      practiceManagementType: +type,
    };

    console.log(11111, params);
  };

  return (
    <>
      <Form form={form} onFinish={onFinish}>
        <Table
          columns={columns}
          dataSource={data}
          pagination={false}
          bordered
        />
      </Form>
      <Button type="primary" onClick={() => form.submit()}>
        应用
      </Button>
    </>
  );
};
export default App;
