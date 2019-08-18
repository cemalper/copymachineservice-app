import React from 'react';
import PropTypes from 'prop-types';
import { DatePicker as AntDatePicker } from 'antd/';
import locale from 'antd/lib/date-picker/locale/tr_TR';
import FormInput from '../form-input/FormInput';
import moment from 'moment';

const DateInput = props => {
  const { label, name, touched, errors, values, initialValues, defaultValue, isRequired: required, setFieldTouched, setFieldValue, disabled } = props;
  let value = values[name];
  if (typeof value === 'string') {
    value = moment(value);
  }
  const isTouched = touched[name];
  const _defaultValue = defaultValue || initialValues[name];
  const errorMessage = errors[name];
  const { labelCol, wrapperCol } = props;
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
      <AntDatePicker
        locale={locale}
        defaultPickerValue={_defaultValue}
        onChange={(date /*, dateString*/) => {
          setFieldTouched(name, true);
          setFieldValue(name, date, true);
        }}
        value={value || _defaultValue}
        disabled={disabled}
      />
    </FormInput>
  );
};

DateInput.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  errorMessage: PropTypes.string,
  required: PropTypes.bool,
  value: PropTypes.string,
  defaultValue: PropTypes.object,
  handleChange: PropTypes.func.isRequired,
  handleBlur: PropTypes.func.isRequired,
  isTouched: PropTypes.bool,
  disabled: PropTypes.bool,
  labelCol: PropTypes.object,
  wrapperCol: PropTypes.object
};

export default DateInput;
