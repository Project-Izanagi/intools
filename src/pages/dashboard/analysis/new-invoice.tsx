import { SearchOutlined } from '@ant-design/icons';
import { Button, Input, Space, Typography, Card, Row, Modal } from 'antd';
import Table, { ColumnsType } from 'antd/es/table';
import { useState, useEffect, useRef } from 'react';
import Highlighter from 'react-highlight-words';

import CardComponent from '@/components/card';
import Scrollbar from '@/components/scrollbar';

import './index.css';
import SearchForm from './search-form';

interface DataType {
  id: number;
  plant: string;
  category: string;
  area: string;
  qcode: string;
  name: string;
  maker: string;
  // pic?: PICProfile;
  frame: number;
  installed_qty: number;
  standby_qty: number;
  spare_qty: number;
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
  const [resetSearch, setResetSearch] = useState(false);
  const [openFrame, setOpenFrame] = useState(true);
  const [openCapacity, setOpenCapacity] = useState(true);
  const [modal, contextHolder] = Modal.useModal();
  const [data, setData] = useState<DataType[] | []>();
  const [searchText, setSearchText] = useState('');
  const [searchedColumn, setSearchedColumn] = useState('');
  const searchInput = useRef(null);
  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };
  const handleReset = (clearFilters) => {
    clearFilters();
    setSearchText('');
  };
  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters, close }) => (
      <div
        style={{
          padding: 8,
        }}
        onKeyDown={(e) => e.stopPropagation()}
      >
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{
            marginBottom: 8,
            display: 'block',
          }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{
              width: 90,
            }}
          >
            Search
          </Button>
          <Button
            onClick={() => clearFilters && handleReset(clearFilters)}
            size="small"
            style={{
              width: 90,
            }}
          >
            Reset
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              confirm({
                closeDropdown: false,
              });
              setSearchText(selectedKeys[0]);
              setSearchedColumn(dataIndex);
            }}
          >
            Filter
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              close();
            }}
          >
            close
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined
        style={{
          color: filtered ? '#1677ff' : undefined,
        }}
      />
    ),
    onFilter: (value, record) =>
      record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
    onFilterDropdownOpenChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
    render: (text) =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{
            backgroundColor: '#ffc069',
            padding: 0,
          }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ''}
        />
      ) : (
        text
      ),
  });

  const defaultSearch = () => {
    fetch('http://127.0.0.1:8080/api/v1/intools/electra/materials/motor/high-voltage')
      .then((response) => response.json())
      .then((json) => {
        if (Array.isArray(json.response.data)) {
          if (json.response.data.length > 0) {
            const newData = json.response.data || []; // Use the returned data or an empty array if undefined
            setData(newData);
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
  };

  const handleDynamicSearch = (formData) => {
    const queryParams = new URLSearchParams(formData);
    fetch(
      `http://127.0.0.1:8080/api/v1/intools/electra/materials/motor/high-voltage?${queryParams}`,
    )
      .then((response) => response.json())
      .then((json) => {
        if (Array.isArray(json.response.data)) {
          const newData = json.response.data || [];
          setData(newData);
          console.log(data);
        } else {
          // Handle the case where the response is not an array
          console.error('Invalid data format received from the API.');
          setData([]);
        }
      })
      .catch((error) => {
        console.error(error);
        setData([]); // Handle errors by setting data to an empty array
      });
  };

  const handleCompatibilitySearch = (record, flag) => {
    const { specifications, frame } = record;
    const { capacity } = specifications;

    const param = flag === 'capacity' ? `capacity=${capacity}` : `frame=${frame}`;
    // Perform compatibility search API call using voltage, e, and h
    // Replace 'your-compatibility-api-endpoint' with the actual endpoint
    fetch(`http://127.0.0.1:8080/api/v1/intools/electra/materials/motor/high-voltage?${param}`)
      .then((response) => response.json())
      .then((json) => {
        if (Array.isArray(json.response.data)) {
          const newData = json.response.data || [];
          setData(newData);
        } else {
          // Handle the case where the response is not an array
          console.error('Invalid data format received from the API.');
          setData([]);
        }
      })
      .catch((error) => {
        console.error(error);
        setData([]); // Handle errors by setting data to an empty array
      });
  };

  const countDownAfterSearch = () => {
    let secondsToGo = 1;

    const instance = modal.success({
      centered: true,
      title: 'Success',
      content: `Total ${data?.length} found.`,
    });

    const timer = setInterval(() => {
      secondsToGo -= 1;
      instance.update({
        content: `Total ${data?.length} found.`,
      });
    }, 1000);

    setTimeout(() => {
      clearInterval(timer);
      instance.destroy();
    }, secondsToGo * 1000);
  };

  useEffect(() => {
    defaultSearch();
  }, []);

  const columns: ColumnsType<DataType> = [
    // {
    //   title: 'No',
    //   dataIndex: 'id',
    //   key: 'id',
    //   sorter: false,
    //   render: (text) => <span>{text}</span>,
    // },
    {
      title: 'Plant',
      dataIndex: 'plant',
      key: 'plant',
      sortDirections: ['descend', 'ascend'],
      ...getColumnSearchProps('plant'),
      sorter: (a, b) => a.plant.localeCompare(b.plant),
      render: (text) => <span>{text}</span>,
    },
    {
      title: 'Area',
      dataIndex: 'area',
      key: 'area',
      sortDirections: ['descend', 'ascend'],
      ...getColumnSearchProps('area'),
      sorter: (a, b) => a.area.localeCompare(b.area),
      render: (text) => <span>{text}</span>,
    },
    // {
    //   title: 'QCode',
    //   dataIndex: 'qcode',
    //   key: 'qcode',
    //   ...getColumnSearchProps('qcode'),
    //   sortDirections: ['descend', 'ascend'],
    //   sorter: (a, b) => a.qcode.localeCompare(b.qcode),
    //   render: (text) => <span>{text}</span>,
    // },
    {
      title: 'Material Name',
      dataIndex: 'name',
      key: 'name',
      width: 160,
      ...getColumnSearchProps('name'),
      sortDirections: ['descend', 'ascend'],
      sorter: (a, b) => a.name.localeCompare(b.name),
      render: (text) => <span>{text}</span>,
    },
    {
      title: 'Frame',
      dataIndex: 'frame',
      key: 'frame',
      defaultSortOrder: 'ascend',
      sorter: (a, b) => a.frame - b.frame,
      render: (text) => <span>{text}</span>,
    },
    {
      title: 'Operation Status',
      children: [
        {
          title: 'Installed',
          dataIndex: 'installed_qty',
          key: 'installed_qty',
          defaultSortOrder: 'ascend',
          sorter: (a, b) => a.installed_qty - b.installed_qty,
          render: (text) => <span>{text}</span>,
        },
        {
          title: 'Standby',
          dataIndex: 'standby_qty',
          key: 'standby_qty',
          defaultSortOrder: 'ascend',
          sorter: (a, b) => a.standby_qty - b.standby_qty,
          render: (text) => <span>{text}</span>,
        },
        {
          title: 'Spare',
          dataIndex: 'spare_qty',
          key: 'spare_qty',
          defaultSortOrder: 'ascend',
          sorter: (a, b) => a.spare_qty - b.spare_qty,
          render: (text) => <span>{text}</span>,
        },
      ],
    },
    {
      title: 'Specifications',
      children: [
        {
          title: 'Capacity (kW)',
          dataIndex: 'specifications',
          key: 'capacity',
          defaultSortOrder: 'ascend',
          sorter: (a, b) => a.specifications.capacity - b.specifications.capacity,
          render: (text) => <span>{text.capacity}</span>,
        },
        {
          title: 'Voltage (V)',
          dataIndex: 'specifications',
          key: 'voltage',
          defaultSortOrder: 'ascend',
          sorter: (a, b) => a.specifications.voltage - b.specifications.voltage,
          render: (text) => <span>{text.voltage}</span>,
        },
        {
          title: 'Current (A)',
          dataIndex: 'specifications',
          key: 'current',
          defaultSortOrder: 'ascend',
          sorter: (a, b) => a.specifications.current - b.specifications.current,
          render: (text) => <span>{text.current}</span>,
        },
        {
          title: 'RPM',
          dataIndex: 'specifications',
          key: 'rpm',
          defaultSortOrder: 'ascend',
          sorter: (a, b) => a.specifications.rpm - b.specifications.rpm,
          render: (text) => <span>{text.rpm}</span>,
        },
      ],
    },
    {
      title: 'Size (mm)',
      children: [
        {
          title: 'Shaft Diameter',
          dataIndex: 'size',
          key: 'shaft_diameter',
          defaultSortOrder: 'ascend',
          sorter: (a, b) => a.size.shaft_diameter - b.size.shaft_diameter,
          render: (text) => <span>{text.shaft_diameter}</span>,
        },
        {
          title: 'Base Width',
          dataIndex: 'size',
          key: 'base_width',
          defaultSortOrder: 'ascend',
          sorter: (a, b) => a.size.base_width - b.size.base_width,
          render: (text) => <span>{text.base_width}</span>,
        },
        {
          title: 'Base Length',
          dataIndex: 'size',
          key: 'base_length',
          defaultSortOrder: 'ascend',
          sorter: (a, b) => a.size.base_length - b.size.base_length,
          render: (text) => <span>{text.base_length}</span>,
        },
        {
          title: 'C',
          dataIndex: 'size',
          key: 'c',
          width: 60,
          defaultSortOrder: 'ascend',
          sorter: (a, b) => a.size.c - b.size.c,
          render: (text) => <span>{text.c}</span>,
        },
        {
          title: 'E',
          dataIndex: 'size',
          key: 'e',
          width: 60,
          defaultSortOrder: 'ascend',
          sorter: (a, b) => a.size.e - b.size.e,
          render: (text) => <span>{text.e}</span>,
        },
        {
          title: 'H',
          dataIndex: 'size',
          key: 'h',
          width: 60,
          defaultSortOrder: 'ascend',
          sorter: (a, b) => a.size.h - b.size.h,
          render: (text) => <span>{text.h}</span>,
        },
      ],
    },
    {
      title: 'Maker',
      dataIndex: 'maker',
      key: 'maker',
      ...getColumnSearchProps('maker'),
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
      title: 'Compatibility Search  ',
      key: 'action',
      sorter: false,
      fixed: 'right',
      width: 150,
      render: (_, record) => (
        <Row gutter={[16, 16]}>
          {openFrame && (
            <Space size="middle">
              <Button
                className="w-32"
                onClick={() => {
                  handleCompatibilitySearch(record, 'frame');
                  countDownAfterSearch();
                  setResetSearch(true);
                  setOpenCapacity(false);
                }}
              >
                By Frame
              </Button>
            </Space>
          )}
          {openCapacity && (
            <Space size="middle">
              <Button
                className="w-32"
                onClick={() => {
                  handleCompatibilitySearch(record, 'capacity');
                  countDownAfterSearch();
                  setResetSearch(true);
                  setOpenFrame(false);
                }}
              >
                By Capacity
              </Button>
            </Space>
          )}
          {resetSearch && (
            <Space size="middle">
              <Button
                className="w-32"
                danger
                onClick={() => {
                  defaultSearch();
                  countDownAfterSearch();
                  setResetSearch(false);
                  setOpenCapacity(true);
                  setOpenFrame(true);
                }}
              >
                Reset
              </Button>
            </Space>
          )}
          {contextHolder}
        </Row>
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
    <>
      <Card
        style={{
          width: '100%',
          display: 'flex',
          marginTop: 20,
          boxShadow: '0 4px 8px 0 rgba(0,0,0,0.2)',
        }}
      >
        <SearchForm onSearch={handleDynamicSearch} />
      </Card>
      <CardComponent className="mt-2 h-fit w-full flex-col">
        <header className="mb-2">
          <Typography.Title level={3}>Materials Summary</Typography.Title>
        </header>
        <div className="mb-2 self-start">
          <Typography.Title level={5}>Total Data: {data?.length}</Typography.Title>
        </div>
        <main className="h-full w-full">
          <Scrollbar>
            <Table
              locale={{
                emptyText: 'No data available',
              }}
              rowKey={(record) => record.id}
              columns={columns}
              dataSource={data}
              pagination={{
                defaultPageSize: 20,
                showSizeChanger: true,
                pageSizeOptions: ['5', '10', '20', '30', '50', '100'],
              }}
              scroll={{ y: `calc(100vh - 250px)` }}
            />
          </Scrollbar>
        </main>
      </CardComponent>
    </>
  );
}
