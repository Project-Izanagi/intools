import { Col, Row, Typography } from 'antd';
import Color from 'color';

import motor_base from '@/assets/images/background/MotorBase.jpg';
import { useThemeToken } from '@/theme/hooks';

import AnalysisCard from './analysis-card';
import NewInvoice from './new-invoice';

function Analysis() {
  const theme = useThemeToken();
  return (
    <>
      <Typography.Title level={4}>Central Electrical Device Database System</Typography.Title>
      <Row gutter={[16, 16]}>
        <Col lg={24} md={18} span={24}>
          <AnalysisCard
            cover={motor_base}
            title="Motor Guideline"
            subtitle="Dimension"
            style={{
              textAlign: 'center',
              color: theme.colorPrimaryTextActive,
              background: `linear-gradient(135deg, ${Color(theme.colorPrimaryActive)
                .alpha(0.2)
                .toString()}, ${Color(theme.colorPrimary)
                .alpha(0.2)
                .toString()}) rgb(255, 255, 255)`,
            }}
          />
        </Col>
        {/* <Col lg={6} md={12} span={24}>
          <AnalysisCard
            cover={glass_buy}
            title="1.72m"
            subtitle="New Orders"
            style={{
              color: theme.colorWarningTextActive,
              background: `linear-gradient(135deg, ${Color(theme.colorWarningActive)
                .alpha(0.2)
                .toString()}, ${Color(theme.colorWarning)
                .alpha(0.2)
                .toString()}) rgb(255, 255, 255)`,
            }}
          />
        </Col>
        <Col lg={6} md={12} span={24}>
          <AnalysisCard
            cover={glass_message}
            title="234"
            subtitle="Bug Reports"
            style={{
              color: theme.colorErrorTextActive,
              background: `linear-gradient(135deg, ${Color(theme.colorErrorActive)
                .alpha(0.2)
                .toString()}, ${Color(theme.colorError).alpha(0.2).toString()}) rgb(255, 255, 255)`,
            }}
          />
        </Col> */}
      </Row>

      <NewInvoice />
      {/* 
      <Row gutter={[16, 16]} className="mt-8" justify="center">
        <Col span={23} lg={12} xl={16}>
          <Card title="Conversion Rates">
            <ChartBar />
          </Card>
        </Col>
        <Col span={23} lg={12} xl={8}>
          <Card title="Current Subject">
            <ChartRadar />
          </Card>
        </Col>
      </Row>

      <Row gutter={[16, 16]} className="mt-8">
        <Col span={24} lg={12} xl={16}>
          <Card title="News">
            <AnalysisNews />
          </Card>
        </Col>
        <Col span={24} lg={12} xl={8}>
          <Card title="Order Timeline">
            <AnalysisOrderTimeline />
          </Card>
        </Col>
      </Row>

      <Row gutter={[16, 16]} className="my-8">
        <Col span={24} lg={12} xl={8}>
          <Card title="Traffic by Site">
            <Row gutter={[16, 16]}>
              <Col span={12}>
                <AnalysisTrafficCard
                  icon={<Iconify icon="bxl:facebook" size={32} color="#1877f2" />}
                  title="1.95k"
                  subtitle="FaceBook"
                />
              </Col>

              <Col span={12}>
                <AnalysisTrafficCard
                  icon={<Iconify icon="ant-design:google-outlined" size={32} color="#df3e30" />}
                  title="9.12k"
                  subtitle="Google"
                />
              </Col>

              <Col span={12}>
                <AnalysisTrafficCard
                  icon={<Iconify icon="eva:linkedin-fill" size={32} color="#006097" />}
                  title="6.98k"
                  subtitle="Linkedin"
                />
              </Col>

              <Col span={12}>
                <AnalysisTrafficCard
                  icon={<Iconify icon="eva:twitter-fill" size={32} color="#1c9cea" />}
                  title="8.49k"
                  subtitle="Twitter"
                />
              </Col>
            </Row>
          </Card>
        </Col>

        <Col span={24} lg={12} xl={16}>
          <Card title="Tasks">
            <AnalysisTasks />
          </Card>
        </Col>
      </Row> */}
    </>
  );
}

export default Analysis;
