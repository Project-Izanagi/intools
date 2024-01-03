// SearchForm.js

import { Form, Input, Space, Button, Row, Col, Typography, Alert, Modal } from 'antd';
import React from 'react';

function SearchForm({ onSearch }) {
  const [form] = Form.useForm();
  const [modal, contextHolder] = Modal.useModal();

  const countDownAfterSearch = () => {
    let secondsToGo = 0.9;

    const instance = modal.success({
      centered: true,
      title: 'Success',
    });

    const timer = setInterval(() => {
      secondsToGo -= 1;
      instance.update({
        content: `Please wait...`,
      });
    }, 1000);

    setTimeout(() => {
      clearInterval(timer);
      instance.destroy();
    }, secondsToGo * 1000);
  };

  const onFinish = (values) => {
    console.log('Search Values:', values);
    // Perform any additional actions or send the data to the parent component
    onSearch(values);
    countDownAfterSearch();
  };

  return (
    <>
      {/* Specification Search Form */}
      <Row gutter={16} justify="space-between" align="middle" style={{ width: '100%' }}>
        <Col span={24}>
          <Typography.Title level={5}>Search by Specification</Typography.Title>
        </Col>
        <Col span={24}>
          <Form form={form} name="search" onFinish={onFinish} layout="vertical">
            <Space style={{ width: '100%' }}>
              <Form.Item label="Capacity" name="capacity" style={{ flex: 1 }}>
                <Input type="number" placeholder="Enter capacity" />
              </Form.Item>

              <Form.Item label="Voltage" name="voltage" style={{ flex: 1 }}>
                <Input type="number" placeholder="Enter voltage" />
              </Form.Item>

              <Form.Item label="Current" name="current" style={{ flex: 1 }}>
                <Input type="number" placeholder="Enter current" />
              </Form.Item>

              <Form.Item label="RPM" name="rpm" style={{ flex: 1 }}>
                <Input type="number" placeholder="Enter RPM" />
              </Form.Item>
            </Space>
          </Form>
        </Col>
      </Row>

      {/* Size Search Form */}
      <Row gutter={16} justify="space-between" align="middle" style={{ width: '100%' }}>
        <Col span={24}>
          <Typography.Title level={5}>Search by Size (mm)</Typography.Title>
        </Col>
        <Col span={24}>
          <Form form={form} name="search" onFinish={onFinish} layout="vertical">
            <Space style={{ width: '100%' }}>
              <Form.Item label="Shaft Diameter" name="shaft_diameter" style={{ flex: 1 }}>
                <Input type="number" placeholder="Enter shaft diameter" />
              </Form.Item>

              <Form.Item label="Base Width" name="base_width" style={{ flex: 1 }}>
                <Input type="number" placeholder="Enter base width" />
              </Form.Item>

              <Form.Item label="Base Length" name="base_length" style={{ flex: 1 }}>
                <Input type="number" placeholder="Enter base length" />
              </Form.Item>

              <Form.Item label="C" name="c" style={{ flex: 1 }}>
                <Input type="number" placeholder="Enter C" />
              </Form.Item>

              <Form.Item label="E" name="e" style={{ flex: 1 }}>
                <Input type="number" placeholder="Enter E" />
              </Form.Item>

              <Form.Item label="H" name="h" style={{ flex: 1 }}>
                <Input type="number" placeholder="Enter H" />
              </Form.Item>
            </Space>
          </Form>
        </Col>
      </Row>
      <Alert
        style={{ marginBottom: 10, width: 550 }}
        message="Search parameters can be combined. example: capacity = 500 & base width = 250"
      />

      {/* Search Button */}
      <Row gutter={16} justify="center" align="middle">
        <Col span={24}>
          <Form.Item>
            <Button type="primary" htmlType="submit" onClick={() => form.submit()}>
              Search
            </Button>
          </Form.Item>
        </Col>
      </Row>
      {contextHolder}
    </>
  );
}

export default SearchForm;
