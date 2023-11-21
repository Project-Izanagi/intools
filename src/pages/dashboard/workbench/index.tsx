import { Col, Row, Typography } from 'antd';

import AreaDownload from './area-download';
import BannerCard from './banner-card';
import CurrentDownload from './current-download';
import NewInvoice from './new-invoice';
import ServicesCard from './service-card';
import TopAuthor from './top-authors';
import TopInstalled from './top-installed';
import TopRelated from './top-related';

const { Title } = Typography;

function Workbench() {
  return (
    <>
      <Row gutter={[16, 16]} justify="center">
        <Col span={24} md={24}>
          <BannerCard />
        </Col>
        {/* <Col span={24} md={8}>
          <Space direction="vertical" size="middle" className="h-full w-full">
            <Conversion />
            <Applications />
          </Space>
        </Col> */}
      </Row>
      <Row gutter={[16, 16]} className="mt-4" justify="center">
        <Col span={24} md={24}>
          <Title level={2}>Our Products</Title>
        </Col>
        {/* <Col span={24} md={8}>
          <Space direction="vertical" size="middle" className="h-full w-full">
            <Conversion />
            <Applications />
          </Space>
        </Col> */}
      </Row>
      <Row gutter={[16, 16]} className="mt-4" justify="center">
        <Col span={24} md={8}>
          <ServicesCard
            title="Rats Detection and Monitoring System"
            description="Is an innovative technology designed to track and manage rat populations, enhancing pest control for proactive prevention and efficient intervention."
          />
        </Col>
        <Col span={24} md={8}>
          <ServicesCard
            title="Central Electrical Device Database System (Electra)"
            description="Electra is an system that provide electrical devices such as motors, trafo, and cables in entire PTKP"
          />
        </Col>

        <Col span={24} md={8}>
          <ServicesCard
            title="Calibration Center"
            description="Ensuring precision and accuracy in measurements through meticulous calibration services, maintaining industry standards for reliable equipment performance."
          />{' '}
        </Col>
      </Row>

      {/* <Row gutter={[16, 16]} className="mt-4" justify="center">
        <Col span={24} md={12} lg={8}>
          <CurrentDownload />
        </Col>
        <Col span={24} md={12} lg={16}>
          <AreaDownload />
        </Col>
      </Row>

      <Row gutter={[16, 16]} className="mt-4" justify="center">
        <Col span={23} md={12} lg={16}>
          <NewInvoice />
        </Col>
        <Col span={23} md={12} lg={8}>
          <TopRelated />
        </Col>
      </Row>

      <Row gutter={[16, 16]} className="mt-4" justify="center">
        <Col span={24} md={12}>
          <TopInstalled />
        </Col>

        <Col span={24} md={12}>
          <TopAuthor />
        </Col>
      </Row> */}
    </>
  );
}

export default Workbench;
