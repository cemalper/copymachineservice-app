import React from 'react';
import { Form } from 'antd';

const FormItem = Form.Item;

export const FormInput = ({ label, required, isTouched, errorMessage, labelCol, wrapperCol, children }) => {
  return (
    <FormItem
      label={label}
      required={required}
      hasFeedback={isTouched}
      help={errorMessage}
      style={{ marginBottom: 10 }}
      validateStatus={!!errorMessage ? 'error' : 'success'}
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
