import React from 'react';
import PropTypes from 'prop-types';
import RibbonContainer from './RibbonContainer';
import RibbonButton from './Ribbon';

const TableRibbon = props => (
  <RibbonContainer>
    <RibbonButton icon="plus" text="Yeni" {...props.onNewButton} />
    <RibbonButton icon="reload" text="Yenile" {...props.onReloadButton} />
    <RibbonButton icon="delete" text="Sil" {...props.onDeleteButton} />
    {props.children}
  </RibbonContainer>
);

TableRibbon.propTypes = {
  onNewButton: PropTypes.shape({
    onClick: PropTypes.func,
    loading: PropTypes.bool,
    visible: PropTypes.bool,
    disabled: PropTypes.bool
  }).isRequired,
  onReloadButton: PropTypes.shape({
    onClick: PropTypes.func,
    loading: PropTypes.bool,
    visible: PropTypes.bool,
    disabled: PropTypes.bool
  }).isRequired,
  onDeleteButton: PropTypes.shape({
    onClick: PropTypes.func,
    loading: PropTypes.bool,
    visible: PropTypes.bool,
    disabled: PropTypes.bool
  })
};

export default TableRibbon;
