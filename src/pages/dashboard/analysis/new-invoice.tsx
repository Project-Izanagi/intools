import { Input, Space, Typography } from 'antd';
import Table, { ColumnsType } from 'antd/es/table';
import { useState, useEffect } from 'react';

import Card from '@/components/card';
import { IconButton, Iconify } from '@/components/icon';
import Scrollbar from '@/components/scrollbar';

import './index.css';

interface DataType {
  id: number;
  plant: string;
  category: string;
  area: string;
  qcode: string;
  name: string;
  maker: string;
  // pic?: PICProfile;
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
  // const { data } = useFetchData();

  const [data, setData] = useState<DataType[] | []>();
  const [dataSource, setDataSource] = useState(data);
  const [value, setValue] = useState('');

  const FilterByNameInput = (
    <Input
      placeholder="Search Name"
      value={value}
      onChange={(e) => {
        const currValue = e.target.value;
        setValue(currValue);
        const filteredData = data?.filter((entry) => entry.name.includes(currValue));
        setDataSource(filteredData);
      }}
    />
  );

  useEffect(() => {
    fetch('http://127.0.0.1:8080/api/v1/intools/electra/materials/motor/high-voltage')
      .then((response) => response.json())
      .then((json) => {
        if (Array.isArray(json.response.data)) {
          if (json.response.data.length > 0) {
            setData(json.response.data);
          } else {
            console.error('Empty array received from the API.');
          }
        } else {
          // Convert non-array data to an array with a single element
          const dataArray = [json];
          console.log('Converted to Array:', dataArray);
          setData(dataArray);
        }
      })
      .catch((error) => console.error(error));
  }, []);

  // const listMaterials = data ?? [];

  console.log(data?.length, Array.isArray(data), 'DATA: ', data);

  const columns: ColumnsType<DataType> = [
    {
      title: 'No',
      dataIndex: 'id',
      key: 'id',
      sorter: false,
      render: (text) => <span>{text}</span>,
    },
    {
      title: 'Plant',
      dataIndex: 'plant',
      key: 'plant',
      sortDirections: ['descend', 'ascend'],
      sorter: (a, b) => a.plant.localeCompare(b.plant),
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
      sortDirections: ['descend', 'ascend'],
      sorter: (a, b) => a.qcode.localeCompare(b.qcode),
      render: (text) => <span>{text}</span>,
    },
    {
      title: 'Material Name',
      dataIndex: 'name',
      key: 'name',
      sortDirections: ['descend', 'ascend'],
      sorter: (a, b) => a.name.localeCompare(b.name),
      render: (text) => <span>{text}</span>,
    },
    {
      title: 'Category',
      dataIndex: 'category',
      key: 'category',
      sorter: false,
      render: (text) => <span>{text}</span>,
    },
    {
      title: 'Capacity',
      dataIndex: 'specifications',
      key: 'capacity',
      sorter: false,
      render: (text) => <span>{text.capacity}</span>,
    },
    {
      title: 'Voltage',
      dataIndex: 'specifications',
      key: 'voltage',
      sorter: false,
      render: (text) => <span>{text.voltage}</span>,
    },
    {
      title: 'Current',
      dataIndex: 'specifications',
      key: 'current',
      sorter: false,
      render: (text) => <span>{text.current}</span>,
    },
    {
      title: 'RPM',
      dataIndex: 'specifications',
      key: 'rpm',
      sorter: false,
      render: (text) => <span>{text.rpm}</span>,
    },
    {
      title: 'Shaft Diameter',
      dataIndex: 'size',
      key: 'shaft_diameter',
      sorter: false,
      render: (text) => <span>{text.shaft_diameter}</span>,
    },
    {
      title: 'Base Width',
      dataIndex: 'size',
      key: 'base_width',
      sorter: false,
      render: (text) => <span>{text.base_width}</span>,
    },
    {
      title: 'Base Length',
      dataIndex: 'size',
      key: 'base_length',
      sorter: false,
      render: (text) => <span>{text.base_length}</span>,
    },
    {
      title: 'C',
      dataIndex: 'size',
      key: 'c',
      sorter: false,
      render: (text) => <span>{text.c}</span>,
    },
    {
      title: 'E',
      dataIndex: 'size',
      key: 'e',
      sorter: false,
      render: (text) => <span>{text.e}</span>,
    },
    {
      title: 'H',
      dataIndex: 'size',
      key: 'h',
      sorter: false,
      render: (text) => <span>{text.h}</span>,
    },
    {
      title: 'Maker',
      dataIndex: 'maker',
      key: 'maker',
      sortDirections: ['descend', 'ascend'],
      sorter: (a, b) => a.maker.localeCompare(b.maker),
      render: (text) => <span>{text}</span>,
    },
    // {
    //   title: 'PIC (Contact)',
    //   dataIndex: 'pic',
    //   key: 'pic',
    //   render: (pic) => (
    //     <>
    //       <Button type="text" onClick={() => setIsModalOpen(true)}>
    //         {pic.fullname || 'EIC Technology'}
    //       </Button>
    //       <Modal
    //         open={isModalOpen}
    //         onOk={() => setIsModalOpen(false)}
    //         onCancel={() => setIsModalOpen(false)}
    //         mask={false}
    //         width={300}
    //         footer={null}
    //       >
    //         <PICCard
    //           team={pic.team}
    //           name={pic.fullname}
    //           phone={pic.phone}
    //           email={pic.email}
    //           photo={pic.photo}
    //         />
    //       </Modal>
    //     </>
    //   ),
    // },
    // {
    //   title: 'Status',
    //   key: 'status',
    //   dataIndex: 'status',
    //   render: (_status) => {
    //     const status = _status as string;
    //     let color = 'success';
    //     if (status === 'Progress') color = 'gold';
    //     if (status === 'Out of Date') color = 'red';
    //     return <ProTag color={color}>{status}</ProTag>;
    //   },
    // },
    {
      title: 'Action',
      key: 'action',
      sorter: false,
      render: () => (
        <Space size="middle">
          <IconButton>
            <Iconify icon="fontisto:more-v-a" />
          </IconButton>
        </Space>
      ),
    },
  ];

  // const listPic: PICProfile[] = [
  //   {
  //     email: 'verlymv@gmail.com',
  //     fullname: 'Muhammad Verly',
  //     phone: '085156839121',
  //     team: 'EIC Technology Team',
  //     photo: 'https://www.gravatar.com/avatar/2acfb745ecf9d4dccb3364752d17f65f?s=260&d=mp',
  //   },
  //   {
  //     email: 'verlymv@gmail.com',
  //     fullname: 'Muhammad Verly 2',
  //     phone: '085156839121',
  //     team: 'EIC Technology Team',
  //   },
  //   {
  //     email: 'verlymv@gmail.com',
  //     fullname: 'Muhammad Verly 3',
  //     phone: '085156839121',
  //     team: 'EIC Technology Team',
  //   },
  // ];

  // const listSpecification: Specification[] = [
  //   {
  //     capacity: 200,
  //     current: 250,
  //     rpm: 500,
  //     voltage: 900,
  //   },
  // ];

  // const listSize: Size[] = [
  //   {
  //     base_length: 100,
  //     base_width: 350,
  //     c: 450,
  //     e: 130,
  //     h: 220,
  //     shaft_diameter: 400,
  //   },
  // ];

  // const data: DataType[] = [
  //   {
  //     no: 6,
  //     plant: 'Plate Mill',
  //     category: 'HV Motor',
  //     area: 'SH #02',
  //     qcode: 'Q80991288',
  //     name: 'Motor 1234',
  //     maker: 'Hyosung',
  //     specifications: listSpecification[0],
  //     size: listSize[0],
  //     pic: listPic[0],
  //   },
  //   {
  //     no: 1,
  //     plant: 'Plate Mill',
  //     category: 'HV Motor',
  //     area: 'SH #02',
  //     qcode: 'Q80991288',
  //     name: 'Motor 1234',
  //     maker: 'Hyosung',
  //     specifications: listSpecification[0],
  //     size: listSize[0],
  //     pic: listPic[0],
  //   },
  //   {
  //     no: 2,
  //     plant: 'Plate Mill',
  //     category: 'HV Motor',
  //     area: 'SH #02',
  //     qcode: 'Q80991288',
  //     name: 'Motor 1234',
  //     maker: 'Hyosung',
  //     specifications: listSpecification[0],
  //     size: listSize[0],
  //     pic: listPic[0],
  //   },
  //   {
  //     no: 3,
  //     plant: 'Plate Mill',
  //     category: 'HV Motor',
  //     area: 'SH #02',
  //     qcode: 'Q80991288',
  //     name: 'Motor 1234',
  //     maker: 'Hyosung',
  //     specifications: listSpecification[0],
  //     size: listSize[0],
  //     pic: listPic[0],
  //   },
  //   {
  //     no: 4,
  //     plant: 'Plate Mill',
  //     category: 'HV Motor',
  //     area: 'SH #02',
  //     qcode: 'Q80991288',
  //     name: 'Motor 1234',
  //     maker: 'Hyosung',
  //     specifications: listSpecification[0],
  //     size: listSize[0],
  //     pic: listPic[0],
  //   },
  //   {
  //     no: 5,
  //     plant: 'Plate Mill',
  //     category: 'HV Motor',
  //     area: 'SH #02',
  //     qcode: 'Q80991288',
  //     name: 'Motor 1234',
  //     maker: 'Hyosung',
  //     specifications: listSpecification[0],
  //     size: listSize[0],
  //     pic: listPic[0],
  //   },
  // ];

  return (
    <Card className="h-full w-full flex-col">
      <header className="self-start">
        <Typography.Title level={5}>Materials Summary</Typography.Title>
      </header>
      <main className="h-full w-full">
        <Scrollbar>
          <Table
            rowKey={(record) => record.id}
            columns={columns}
            dataSource={data}
            pagination={{
              defaultPageSize: 5,
              showSizeChanger: true,
              pageSizeOptions: ['10', '20', '30'],
            }}
          />
        </Scrollbar>
      </main>
    </Card>
  );
}
