import React from 'react';
import PropTypes from 'prop-types';
import { Select, Spin } from 'antd';
import FormInput from '../form-input/FormInput';

function LookupInput(props) {
  const { name, label, touched, errors, values, initialValues, required, setFieldTouched, setFieldValue } = props;
  const { selectQuery, dataField, filterOption, optionLabelProp, renderOption } = props;
  const isTouched = touched[name];
  const value = values[name];
  const defaultValue = initialValues[name];
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
      <Select
        name={name}
        allowClear
        showSearch
        notFoundContent={selectQuery.loading ? <Spin size="small" /> : null}
        placeholder={label}
        onChange={value => {
          setFieldTouched(name, true);
          setFieldValue(name, value, true);
        }}
        value={value}
        defaultValue={defaultValue}
        filterOption={filterOption}
        optionLabelProp={optionLabelProp}
        //filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
      >
        {selectQuery.data &&
          selectQuery.data[dataField] &&
          selectQuery.data[dataField].map(option => {
            return renderOption(option);
          })}
      </Select>
    </FormInput>
  );
}

LookupInput.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  options: PropTypes.array,
  hasError: PropTypes.bool,
  errorMessage: PropTypes.string,
  required: PropTypes.bool,
  value: PropTypes.string,
  defaultValue: PropTypes.string,
  handleBlur: PropTypes.func.isRequired,
  handleChange: PropTypes.func.isRequired,
  isTouched: PropTypes.bool,
  selectQuery: PropTypes.object.isRequired,
  dataField: PropTypes.string.isRequired,
  optionLabelProp: PropTypes.string,
  filterOption: PropTypes.func,
  renderOption: PropTypes.func.isRequired
};

export default LookupInput;

LookupInput.defaultProps = {
  options: []
};
