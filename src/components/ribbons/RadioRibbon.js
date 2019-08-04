import React from 'react';
import PropTypes from 'prop-types';
import { Radio } from 'antd';

const Ribbon = props => {
  const { defaultText, visible, options } = props;
  if (!visible) {
    return null;
  }
  return (
    <Radio.Group defaultValue={defaultText} buttonStyle="solid">
      {options.map(option => (
        <Radio.Button key={option.text} value={option.text} onClick={option.onClick}>
          {option.text}
        </Radio.Button>
      ))}
    </Radio.Group>
  );
};

Ribbon.propTypes = {
  defaultText: PropTypes.string,
  visible: PropTypes.bool,
  disabled: PropTypes.bool,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      text: PropTypes.string.isRequired,
      onClick: PropTypes.func
    }).isRequired
  )
};

Ribbon.defaultProps = {
  visible: true
};

export default Ribbon;
