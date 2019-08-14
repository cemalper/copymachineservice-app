import React from 'react';
import PropTypes from 'prop-types';
import { Input } from 'antd';
import FormInput from '../form-input/FormInput';

const TextInput = props => {
  const { label, name, touched, errors, values, initialValues, handleChange, handleBlur, required, disabled } = props;
  const value = values[name];
  const isTouched = touched[name];
  const defaultValue = initialValues[name];
  const errorMessage = errors[name];
  //const { name, label, handleChange, onBlur, value, defaultValue, isRequired, isTouched, errorMessage } = props;
  const { labelCol, wrapperCol } = props;
  const onChange = e => {
    handleChange(e);
    props.customChange && props.customChange(e.target.value);
  };
  return (
    <FormInput
      label={label}
      required={required}
      hasFeedback={!!isTouched}
      help={!!errorMessage && !!isTouched ? errorMessage : undefined}
      validateStatus={!!errorMessage && !!isTouched ? 'error' : 'success'}
      labelCol={labelCol}
      wrapperCol={wrapperCol}
    >
      <Input name={name} placeholder={label} onBlur={handleBlur} onChange={onChange} value={value} defaultValue={defaultValue} disabled={disabled} />
    </FormInput>
  );
};

TextInput.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  errorMessage: PropTypes.string,
  required: PropTypes.bool,
  value: PropTypes.string,
  defaultValue: PropTypes.string,
  handleChange: PropTypes.func.isRequired,
  customChange: PropTypes.func,
  handleBlur: PropTypes.func.isRequired,
  isTouched: PropTypes.bool,
  disabled: PropTypes.bool,
  labelCol: PropTypes.object,
  wrapperCol: PropTypes.object
};

export default TextInput;
