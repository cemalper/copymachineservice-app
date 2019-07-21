import React from 'react';
import PropTypes from 'prop-types';
import { DatePicker as AntDatePicker } from 'antd/';
import locale from 'antd/lib/date-picker/locale/tr_TR';
import FormInput from '../form-input/FormInput';

const DateInput = props => {
  const { label, name, touched, errors, values, initialValues, defaultValue, isRequired, setFieldTouched, setFieldValue, readOnly } = props;
  const value = values[name];
  const isTouched = touched[name];
  const _defaultValue = defaultValue || initialValues[name];
  const errorMessage = errors[name];
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
      <AntDatePicker
        locale={locale}
        defaultPickerValue={_defaultValue}
        onChange={(date /*, dateString*/) => {
          setFieldTouched(name, true);
          setFieldValue(name, date, true);
        }}
        value={value || _defaultValue}
        disabled={readOnly}
      />
    </FormInput>
  );
};

DateInput.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  errorMessage: PropTypes.string,
  isRequired: PropTypes.bool,
  value: PropTypes.string,
  defaultValue: PropTypes.object,
  handleChange: PropTypes.func.isRequired,
  handleBlur: PropTypes.func.isRequired,
  isTouched: PropTypes.bool,
  readonly: PropTypes.bool,
  labelCol: PropTypes.object,
  wrapperCol: PropTypes.object
};

export default DateInput;
