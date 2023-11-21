import { Space, Typography, Button, Modal } from 'antd';
import Table, { ColumnsType } from 'antd/es/table';
import { SetStateAction, useState } from 'react';

import Card from '@/components/card';
import { IconButton, Iconify } from '@/components/icon';
import Scrollbar from '@/components/scrollbar';
import ProTag from '@/theme/antd/components/tag';

import './index.css';
import PICCard from './pic-card';

interface DataType {
  no: number;
  plant: string;
  category: string;
  area: string;
  qcode: string;
  name: string;
  maker: string;
  pic: PICProfile;
  specifications: Specification;
  size: Size;
}

interface Specification {
  capacity: number;
  voltage: number;
  current: number;
  rpm: number;
}

interface Size {
  shaft_diameter: number;
  base_width: number;
  base_length: number;
  c: number;
  e: number;
  h: number;
}

interface PICProfile {
  fullname: string;
  phone: string;
  team: string;
  email: string;
  photo?: string;
}

export default function NewInvoice() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [filteredInfo, setFilteredInfo] = useState({});
  const [sortedInfo, setSortedInfo] = useState({});

  const onChange = (
    pagination: any,
    filters: SetStateAction<{}>,
    sorter: SetStateAction<{}>,
    extra: any,
  ) => {
    console.log('params', pagination, filters, sorter, extra);
    setFilteredInfo(filters);
    setSortedInfo(sorter);
  };

  const columns: ColumnsType<DataType> = [
    {
      title: 'No',
      dataIndex: 'no',
      key: 'no',
      sorter: (a, b) => a.no - b.no,
      render: (text) => <span>{text}</span>,
    },
    {
      title: 'Plant',
      dataIndex: 'plant',
      key: 'plant',
      render: (text) => <span>{text}</span>,
    },
    {
      title: 'Area',
      dataIndex: 'area',
      key: 'area',
      sortDirections: ['descend', 'ascend'],
      sorter: (a, b) => a.area.localeCompare(b.area),
      render: (text) => <span>{text}</span>,
    },
    {
      title: 'QCode',
      dataIndex: 'qcode',
      key: 'qcode',
      render: (text) => <span>{text}</span>,
    },
    {
      title: 'Material Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Category',
      dataIndex: 'category',
      key: 'category',
      render: (text) => <span>{text}</span>,
    },
    {
      title: 'Capacity',
      dataIndex: 'specifications',
      key: 'capacity',
      sorter: (a, b) => a.specifications.capacity - b.specifications.capacity,
      render: (text) => <span>{text.capacity}</span>,
    },
    {
      title: 'Voltage',
      dataIndex: 'specifications',
      key: 'voltage',
      sorter: (a, b) => a.specifications.voltage - b.specifications.voltage,
      render: (text) => <span>{text.voltage}</span>,
    },
    {
      title: 'Current',
      dataIndex: 'specifications',
      key: 'current',
      sorter: (a, b) => a.specifications.current - b.specifications.current,
      render: (text) => <span>{text.current}</span>,
    },
    {
      title: 'RPM',
      dataIndex: 'specifications',
      key: 'rpm',
      sorter: (a, b) => a.specifications.rpm - b.specifications.rpm,
      render: (text) => <span>{text.rpm}</span>,
    },
    {
      title: 'Shaft Diameter',
      dataIndex: 'size',
      key: 'shaft_diameter',
      sorter: (a, b) => a.size.shaft_diameter - b.size.shaft_diameter,
      render: (text) => <span>{text.shaft_diameter}</span>,
    },
    {
      title: 'Base Width',
      dataIndex: 'size',
      key: 'base_width',
      sorter: (a, b) => a.size.base_width - b.size.base_width,
      render: (text) => <span>{text.base_width}</span>,
    },
    {
      title: 'Base Length',
      dataIndex: 'size',
      key: 'base_length',
      sorter: (a, b) => a.size.base_length - b.size.base_length,
      render: (text) => <span>{text.base_length}</span>,
    },
    {
      title: 'C',
      dataIndex: 'size',
      key: 'c',
      sorter: (a, b) => a.size.c - b.size.c,
      render: (text) => <span>{text.c}</span>,
    },
    {
      title: 'E',
      dataIndex: 'size',
      key: 'e',
      sorter: (a, b) => a.size.e - b.size.e,
      render: (text) => <span>{text.e}</span>,
    },
    {
      title: 'H',
      dataIndex: 'size',
      key: 'h',
      sorter: (a, b) => a.size.h - b.size.h,
      render: (text) => <span>{text.h}</span>,
    },
    {
      title: 'Maker',
      dataIndex: 'maker',
      key: 'maker',
      render: (text) => <span>{text}</span>,
    },
    {
      title: 'PIC (Contact)',
      dataIndex: 'pic',
      key: 'pic',
      render: (pic) => (
        <>
          <Button type="text" onClick={() => setIsModalOpen(true)}>
            {pic.fullname}
          </Button>
          <Modal
            open={isModalOpen}
            onOk={() => setIsModalOpen(false)}
            onCancel={() => setIsModalOpen(false)}
            mask={false}
            width={300}
            footer={null}
          >
            <PICCard
              team={pic.team}
              name={pic.fullname}
              phone={pic.phone}
              email={pic.email}
              photo={pic.photo}
            />
          </Modal>
        </>
      ),
    },
    {
      title: 'Status',
      key: 'status',
      dataIndex: 'status',
      render: (_status) => {
        const status = _status as string;
        let color = 'success';
        if (status === 'Progress') color = 'gold';
        if (status === 'Out of Date') color = 'red';
        return <ProTag color={color}>{status}</ProTag>;
      },
    },
    {
      title: 'Action',
      key: 'action',
      render: () => (
        <Space size="middle">
          <IconButton>
            <Iconify icon="fontisto:more-v-a" />
          </IconButton>
        </Space>
      ),
    },
  ];

  const listPic: PICProfile[] = [
    {
      email: 'verlymv@gmail.com',
      fullname: 'Muhammad Verly',
      phone: '085156839121',
      team: 'EIC Technology Team',
      photo: 'https://www.gravatar.com/avatar/2acfb745ecf9d4dccb3364752d17f65f?s=260&d=mp',
    },
    {
      email: 'verlymv@gmail.com',
      fullname: 'Muhammad Verly 2',
      phone: '085156839121',
      team: 'EIC Technology Team',
    },
    {
      email: 'verlymv@gmail.com',
      fullname: 'Muhammad Verly 3',
      phone: '085156839121',
      team: 'EIC Technology Team',
    },
  ];

  const listSpecification: Specification[] = [
    {
      capacity: 200,
      current: 250,
      rpm: 500,
      voltage: 900,
    },
  ];

  const listSize: Size[] = [
    {
      base_length: 100,
      base_width: 350,
      c: 450,
      e: 130,
      h: 220,
      shaft_diameter: 400,
    },
  ];

  const data: DataType[] = [
    {
      no: 6,
      plant: 'Plate Mill',
      category: 'HV Motor',
      area: 'SH #02',
      qcode: 'Q80991288',
      name: 'Motor 1234',
      maker: 'Hyosung',
      specifications: listSpecification[0],
      size: listSize[0],
      pic: listPic[0],
    },
    {
      no: 1,
      plant: 'Plate Mill',
      category: 'HV Motor',
      area: 'SH #02',
      qcode: 'Q80991288',
      name: 'Motor 1234',
      maker: 'Hyosung',
      specifications: listSpecification[0],
      size: listSize[0],
      pic: listPic[0],
    },
    {
      no: 2,
      plant: 'Plate Mill',
      category: 'HV Motor',
      area: 'SH #02',
      qcode: 'Q80991288',
      name: 'Motor 1234',
      maker: 'Hyosung',
      specifications: listSpecification[0],
      size: listSize[0],
      pic: listPic[0],
    },
    {
      no: 3,
      plant: 'Plate Mill',
      category: 'HV Motor',
      area: 'SH #02',
      qcode: 'Q80991288',
      name: 'Motor 1234',
      maker: 'Hyosung',
      specifications: listSpecification[0],
      size: listSize[0],
      pic: listPic[0],
    },
    {
      no: 4,
      plant: 'Plate Mill',
      category: 'HV Motor',
      area: 'SH #02',
      qcode: 'Q80991288',
      name: 'Motor 1234',
      maker: 'Hyosung',
      specifications: listSpecification[0],
      size: listSize[0],
      pic: listPic[0],
    },
    {
      no: 5,
      plant: 'Plate Mill',
      category: 'HV Motor',
      area: 'SH #02',
      qcode: 'Q80991288',
      name: 'Motor 1234',
      maker: 'Hyosung',
      specifications: listSpecification[0],
      size: listSize[0],
      pic: listPic[0],
    },
  ];

  return (
    <Card className="h-full w-full flex-col">
      <header className="self-start">
        <Typography.Title level={5}>Materials Summary</Typography.Title>
      </header>
      <main className="w-full">
        <Scrollbar>
          <Table columns={columns} dataSource={data} onChange={onChange} />
        </Scrollbar>
      </main>
    </Card>
  );
}
