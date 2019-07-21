import React from 'react';
import PropTypes from 'prop-types';
import { Input } from 'antd';
import FormInput from '../form-input/FormInput';

const TextInput = props => {
  const { label, name, touched, errors, values, initialValues, handleChange, handleBlur, isRequired, readOnly } = props;
  const value = values[name];
  const isTouched = touched[name];
  const defaultValue = initialValues[name];
  const errorMessage = errors[name];
  //const { name, label, handleChange, onBlur, value, defaultValue, isRequired, isTouched, errorMessage } = props;
  const { labelCol, wrapperCol } = props;
  return (
    <FormInput
      style={{ marginBottom: 10 }}
      label={label}
      required={isRequired}
      hasFeedback={isTouched}
      help={errorMessage}
      validateStatus={!!errorMessage ? 'error' : 'success'}
      labelCol={labelCol}
      wrapperCol={wrapperCol}
    >
      <Input name={name} placeholder={label} onBlur={handleBlur} onChange={handleChange} value={value} defaultValue={defaultValue} readOnly={readOnly} />
    </FormInput>
  );
};

TextInput.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  errorMessage: PropTypes.string,
  isRequired: PropTypes.bool,
  value: PropTypes.string,
  defaultValue: PropTypes.string,
  handleChange: PropTypes.func.isRequired,
  handleBlur: PropTypes.func.isRequired,
  isTouched: PropTypes.bool,
  readonly: PropTypes.bool,
  labelCol: PropTypes.object,
  wrapperCol: PropTypes.object
};

export default TextInput;
