import React from 'react';
import { Form, Col } from 'antd';

const FormItem = Form.Item;

export const FormInput = ({ label, required, hasFeedback, help, validateStatus, labelCol, wrapperCol, children, span }) => {
  return (
    <Col lg={span} md={span} xl={span} xxl={span} sm={24} xs={24}>
      <FormItem
        label={label}
        required={required}
        hasFeedback={hasFeedback}
        help={help}
        style={{ marginBottom: 10 }}
        validateStatus={validateStatus}
        labelCol={labelCol}
        wrapperCol={wrapperCol}
      >
        {children}
      </FormItem>
    </Col>
  );
};

export default FormInput;

FormInput.defaultProps = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 24 },
    md: { span: 12 },
    lg: { span: 8 },
    xl: { span: 8 }
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 24 },
    md: { span: 12 },
    lg: { span: 16 },
    xl: { span: 16 }
  },
  span: 24
};
