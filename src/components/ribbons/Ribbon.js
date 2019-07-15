import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'antd';

const Ribbon = props => {
  const { text, icon, loading, disabled, visible, onClick } = props;

  return visible ? (
    <Button icon={icon} loading={loading} disabled={disabled} style={{ margin: 3 }} onClick={onClick}>
      {text}
    </Button>
  ) : null;
};

Ribbon.propTypes = {
  text: PropTypes.string,
  icon: PropTypes.string,
  loading: PropTypes.bool,
  visible: PropTypes.bool,
  disabled: PropTypes.bool,
  onClick: PropTypes.func
};

Ribbon.defaultProps = {
  visible: true
};

export default Ribbon;
