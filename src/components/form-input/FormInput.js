import React from 'react';
import { Form } from 'antd';

const FormItem = Form.Item;

export const FormInput = ({ label, required, hasFeedback, help, validateStatus, labelCol, wrapperCol, children, span }) => {
  return (
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
  );
};

export default FormInput;

FormInput.defaultProps = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 6 },
    md: { span: 8 },
    lg: { span: 8 },
    xl: { span: 4 }
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 18 },
    md: { span: 16 },
    lg: { span: 16 },
    xl: { span: 20 }
  }
};
