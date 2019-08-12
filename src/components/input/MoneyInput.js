import React from 'react';
import PropTypes from 'prop-types';
import { Input, InputNumber, Select } from 'antd';
import { currenyTypePair } from 'common/enums';
import FormInput from '../form-input/FormInput';

const TextInput = props => {
  const { label, name, touched, errors, values, initialValues, handleBlur, setFieldValue, setFieldTouched, isRequired, readOnly } = props;
  const value = values[name] || { price: null, currency: null };
  console.log(values);

  const isTouched = touched[name];
  const defaultValue = initialValues[name] || { price: undefined, currency: currenyTypePair[0].value };
  console.log(defaultValue);
  const errorMessage = errors[name];
  const { labelCol, wrapperCol } = props;
  const onNumberChange = price => {
    var currency = value.currency;
    setFieldValue(name, { price, currency }, true);
    setFieldTouched(name, true, true);
  };
  const onCurrencyChange = currency => {
    var price = value.price;
    setFieldValue(name, { price, currency }, true);
    setFieldTouched(name, true, true);
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
      <Input.Group compact>
        <InputNumber
          style={{ width: 'calc(100% - 100px)' }}
          name={name}
          placeholder={label}
          onBlur={handleBlur}
          onChange={onNumberChange}
          value={value.price}
          defaultValue={defaultValue.price}
          readOnly={readOnly}
        />
        <Select style={{ width: 100 }} onChange={onCurrencyChange} value={value.currency} defaultValue={defaultValue.currency}>
          {currenyTypePair.map(option => (
            <Select.Option key={option.value} value={option.value}>
              {option.text}
            </Select.Option>
          ))}
        </Select>
      </Input.Group>
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
