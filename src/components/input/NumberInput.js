import React from 'react';
import PropTypes from 'prop-types';
import { InputNumber } from 'antd';
import FormInput from '../form-input/FormInput';

const TextInput = props => {
  const { label, name, touched, errors, values, initialValues, setFieldValue, handleBlur, isRequired, readOnly } = props;
  const value = values[name];
  const isTouched = touched[name];
  const defaultValue = initialValues[name];
  const errorMessage = errors[name];
  //const { name, label, handleChange, onBlur, value, defaultValue, isRequired, isTouched, errorMessage } = props;
  const { labelCol, wrapperCol } = props;
  const onChange = newValue => {
    setFieldValue(name, newValue, true);
    //setFieldTouched(name, true, true);
  };
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
      <InputNumber
        style={{ width: '100%' }}
        name={name}
        placeholder={label}
        onBlur={handleBlur}
        onChange={onChange}
        value={value}
        precision={0}
        step={1000}
        defaultValue={defaultValue}
        readOnly={readOnly}
      />
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
