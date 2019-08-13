import React from 'react';
import PropTypes from 'prop-types';
import { Select, Radio } from 'antd';
import FormInput from '../form-input/FormInput';

const Option = Select.Option;
const RadioGroup = Radio.Group;

const SelectInput = ({ name, label, value, defaultValue, options, setFieldTouched, setFieldValue }) => {
  return (
    <Select
      name={name}
      showSearch
      placeholder={label}
      onChange={value => {
        setFieldTouched(name, true);
        setFieldValue(name, value, true);
      }}
      value={value}
      defaultValue={defaultValue}
      filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
    >
      {options.map(option => (
        <Option key={option.value} value={option.value}>
          {option.text}
        </Option>
      ))}
    </Select>
  );
};

const RadioInput = ({ name, label, value, defaultValue, options, setFieldTouched, setFieldValue }) => {
  return (
    <RadioGroup
      onChange={event => {
        setFieldValue(name, event.target.value, true);
        setFieldTouched(name, true, true);
      }}
      defaultValue={defaultValue}
      value={value}
      buttonStyle="solid"
    >
      {options.map(option => (
        <Radio.Button key={option.value} value={option.value}>
          {option.text}
        </Radio.Button>
      ))}
    </RadioGroup>
  );
};

class OptionInput extends React.Component {
  static propTypes = {
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
    isTouched: PropTypes.bool
  };
  render() {
    const { name, label, touched, errors, values, initialValues, required, options } = this.props;
    const isTouched = touched[name];
    const value = values[name];
    const defaultValue = initialValues[name];
    const errorMessage = errors[name];
    const { labelCol, wrapperCol } = this.props;
    let _options = options;
    if (this.props.children) {
      _options = [..._options, ...React.Children.map(this.props.children, child => ({ text: child.props.text, value: child.props.value }))];
    }
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
        {_options.length > 3 ? (
          <SelectInput value={value} defaultValue={defaultValue} {...this.props} options={_options} />
        ) : (
          <RadioInput value={value} defaultValue={defaultValue} {...this.props} options={_options} />
        )}
      </FormInput>
    );
  }
}

const MyOption = props => null;

MyOption.propTypes = {
  text: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired
};

OptionInput.Option = MyOption;
export default OptionInput;

OptionInput.defaultProps = {
  options: [],
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
