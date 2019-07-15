import React from 'react';
import PropTypes from 'prop-types';

const Option = props => {
    if(!props.value){
        debugger;
    }
  return null;
};

Option.propTypes = {
  text: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired
};

export default Option;
