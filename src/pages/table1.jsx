import { Pagination, Table, Form, Button, Select, Input, message } from 'antd';
import { useState, useEffect, useCallback } from 'react';
// In the fifth row, other columns are merged into first column
// by setting it's colSpan to be 0
import cloneDeep from 'lodash/cloneDeep';
import assign from 'lodash/assign';

const data1 = [
  {
    id: 1,
    alable: '1-1标准建设',
    blable: '2-1基础设施建设',
    clable: '3-1架构四级体系',
    templateScores: [1, 2],
    dlable: '4-1查看区、县（市）新时代文明实践中心',
  },
  {
    id: 2,
    alable: '1-1标准建设',
    blable: '2-1基础设施建设',
    clable: '3-2优化功能布局',
    templateScores: [1, 2],
    dlable: '4-2查看区、县（市）新时代文明实践中心',
  },
  {
    id: 3,
    alable: '1-1标准建设',
    blable: '2-1基础设施建设',
    clable: '3-3强化财政支持',
    templateScores: [1, 2],
    dlable: '4-3查看区、县（市）新时代文明实践中心',
  },
  {
    id: 4,
    alable: '1-1标准建设',
    blable: '2-2多元队伍建设',
    clable: '3-4配全管理员',
    templateScores: [1, 2],
    dlable: '4-4查看区、县（市）新时代文明实践中心',
  },
  {
    id: 5,
    alable: '1-1标准建设',
    blable: '2-2多元队伍建设',
    clable: '3-5配优志愿服务队伍',
    templateScores: [1, 2],
    dlable: '4-5查看区、县（市）新时代文明实践中心',
  },
  {
    id: 6,
    alable: '1-1标准建设',
    blable: '2-2多元队伍建设',
    clable: '3-6配优志愿服务队伍',
    templateScores: [1, 2],
    dlable: '4-6查看区、县（市）新时代文明实践中心',
  },
  {
    id: 7,
    alable: '1-2完善机制',
    blable: '2-3多元队伍建设',
    clable: '3-7建立运行机制',
    templateScores: [1, 2],
    dlable: '4-8查看区、县（市）新时代文明实践中心',
  },
  {
    id: 8,
    alable: '1-2完善机制',
    blable: '2-4多元队伍建设',
    clable: '3-8建立运行机制',
    templateScores: [1, 2],
    dlable: '4-9查看区、县（市）新时代文明实践中心',
  },
  {
    id: 9,
    alable: '1-2完善机制',
    blable: '2-4多元队伍建设',
    clable: '3-9建立运行机制',
    templateScores: [1, 2],
    dlable: '4-10查看区、县（市）新时代文明实践中心',
  },
];

const Table1 = () => {
  const [aNoRepeat, setANoRepeat] = useState({});
  const [bNoRepeat, setBNoRepeat] = useState({});
  const [cNoRepeat, setCNoRepeat] = useState({});
  const [dNoRepeat, setDNoRepeat] = useState({});
  const [data, setData] = useState(null);
  const [form] = Form.useForm();
  const [formData, setFormData] = useState({});

  const type = 4;

  // 数据-列-处理
  const noRepeatDeal = (result, setResult, name) => {
    let store = cloneDeep(result);
    data1.forEach((item) => {
      if (!store?.[item[name]]) {
        store[item[name]] = [item.id];
        setResult(store);
      } else if (
        store?.[item[name]] &&
        !store?.[item[name]]?.includes(item.id)
      ) {
        store[item[name]].push(item.id);
        setResult(store);
      }
    });
  };

  // table-列-处理
  const onCellDeal = (item, result, name) => {
    if (result?.[item[name]]) {
      let store = cloneDeep(result);
      if (item?.id == result?.[item[name]]?.[0]) {
        return {
          rowSpan: store?.[item[name]]?.length,
        };
      } else {
        return {
          rowSpan: 0,
        };
      }
    }
  };

  useEffect(() => {
    setTimeout(() => {
      setData(data1);
    }, 1000);
  }, []);

  useEffect(() => {
    noRepeatDeal(aNoRepeat, setANoRepeat, 'alable');
    noRepeatDeal(bNoRepeat, setBNoRepeat, 'blable');
    noRepeatDeal(cNoRepeat, setCNoRepeat, 'clable');
    noRepeatDeal(dNoRepeat, setDNoRepeat, 'dlable');
  }, [data]);

  const columns = [
    {
      title: '测评类别',
      dataIndex: 'alable',
      onCell: (item) => onCellDeal(item, aNoRepeat, 'alable'),
    },
    {
      title: '测评项目',
      dataIndex: 'blable',
      onCell: (item) => onCellDeal(item, bNoRepeat, 'blable'),
    },
    {
      title: '测评内容',
      dataIndex: 'clable',
      onCell: (item) => onCellDeal(item, cNoRepeat, 'clable'),
    },
    {
      title: '测评标准',
      dataIndex: 'dlable',
      // onCell: (item) => onCellDeal(item, dNoRepeat, 'dlable'),
    },
    {
      title: '分值',
      dataIndex: 'templateScores',
      key: 'templateScores',
      width: 250,
      render: (text, record, index) => {
        return (
          <Form.Item key={record?.id} name={record?.id}>
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

      <footer>
        <Button sytle={{ marginRight: 10 }}>取消</Button>
        <Button type="primary" onClick={() => form.submit()}>
          应用
        </Button>
      </footer>

      {/* <Table columns={columns} dataSource={Object.values(data2)} bordered /> */}
    </>
  );
};
export default Table1;
