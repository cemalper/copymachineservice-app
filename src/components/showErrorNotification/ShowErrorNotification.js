import React from 'react';
import { Row, Col, Button, Alert } from 'antd';

export default ({ message, retryAction, isLoading }) => (
  <div>
    <Row gutter={16}>
      <Col span={20}>
        <Alert type="error" message={message} />
      </Col>
      <Col span={4}>
        <Button
          type="primary"
          onClick={() => {
            retryAction();
          }}
          loading={isLoading}
        >
          Yeniden Dene
        </Button>
      </Col>
    </Row>
  </div>
);
