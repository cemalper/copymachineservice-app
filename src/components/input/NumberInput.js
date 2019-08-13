import React from 'react';
import PropTypes from 'prop-types';
import { InputNumber } from 'antd';
import FormInput from '../form-input/FormInput';

const NumberInput = props => {
  const { label, name, touched, errors, values, initialValues, setFieldValue, handleBlur, isRequired, disabled } = props;
  const value = values[name];
  const isTouched = touched[name];
  const defaultValue = initialValues[name];
  const errorMessage = errors[name];
  //const { name, label, handleChange, onBlur, value, defaultValue, isRequired, isTouched, errorMessage } = props;
  const { labelCol, wrapperCol } = props;
  const onChange = newValue => {
    setFieldValue(name, newValue, true);
    props.customChange && props.customChange(newValue);
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
        formatter={value => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, '.')}
        parser={value => value.replace(/\$\s?|(\.*)/g, '')}
        decimalSeparator=","
        defaultValue={defaultValue}
        disabled={disabled}
      />
    </FormInput>
  );
};

NumberInput.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  errorMessage: PropTypes.string,
  isRequired: PropTypes.bool,
  value: PropTypes.string,
  defaultValue: PropTypes.string,
  handleChange: PropTypes.func.isRequired,
  customChange: PropTypes.func,
  handleBlur: PropTypes.func.isRequired,
  isTouched: PropTypes.bool,
  readonly: PropTypes.bool,
  labelCol: PropTypes.object,
  wrapperCol: PropTypes.object
};

export default NumberInput;
