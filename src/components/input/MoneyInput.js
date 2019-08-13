import React from 'react';
import PropTypes from 'prop-types';
import { Input, InputNumber, Select } from 'antd';
import { currenyTypePair } from 'common/enums';
import FormInput from '../form-input/FormInput';

const MoneyInput = props => {
  const { label, name, touched, errors, values, initialValues, handleBlur, setFieldValue, setFieldTouched, required, disabled } = props;
  const value = values[name] || { price: undefined, currency: undefined };

  const isTouched = touched[name];
  const defaultValue = initialValues[name] || { price: undefined, currency: currenyTypePair[0].value };
  let errorMessage = errors[name];
  if (typeof errorMessage === 'object') {
    errorMessage = Object.values(errorMessage).join('. ');
  }
  const { labelCol, wrapperCol } = props;
  const onNumberChange = price => {
    var currency = value.currency;
    setFieldValue(name, { price, currency }, true);
    setFieldTouched(name, true, true);
    props.customChange && props.customChange({ price, currency });
  };
  const onCurrencyChange = currency => {
    var price = value.price;
    setFieldValue(name, { price, currency }, true);
    setFieldTouched(name, true, true);
    props.customChange && props.customChange({ price, currency });
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
      <Input.Group compact>
        <InputNumber
          style={{ width: 'calc(100% - 100px)' }}
          name={name}
          placeholder={label}
          onBlur={handleBlur}
          onChange={onNumberChange}
          value={value.price}
          formatter={value => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, '.')}
          parser={value => value.replace(/\$\s?|(\.*)/g, '')}
          decimalSeparator=","
          defaultValue={defaultValue.price}
          disabled={disabled}
        />
        <Select
          style={{ width: 100 }}
          placeholder="Döviz"
          onChange={onCurrencyChange}
          value={value.currency}
          defaultValue={defaultValue.currency}
          disabled={disabled}
        >
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

MoneyInput.propTypes = {
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
  labelCol: PropTypes.object,
  wrapperCol: PropTypes.object
};

export default MoneyInput;
