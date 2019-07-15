import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import RibbonButton from './Ribbon';
import RibbonContainer from './RibbonContainer';

export default class FormRibbon extends PureComponent {
  static propTypes = {
    onNewButton: PropTypes.shape({
      onClick: PropTypes.func,
      isLoading: PropTypes.bool,
      isVisible: PropTypes.bool,
      isDisable: PropTypes.bool
    }),
    onSaveButton: PropTypes.shape({
      onClick: PropTypes.func,
      isLoading: PropTypes.bool,
      isVisible: PropTypes.bool,
      isDisable: PropTypes.bool
    }),
    onDeleteClick: PropTypes.shape({
      onClick: PropTypes.func,
      isLoading: PropTypes.bool,
      isVisible: PropTypes.bool,
      isDisable: PropTypes.bool
    })
  };

  render() {
    const { onNewButton, onSaveButton, onDeleteButton, ...props } = this.props;
    return (
      <RibbonContainer>
        <RibbonButton text="Yeni" icon="plus" {...onNewButton} />
        <RibbonButton text="Kaydet" icon="save" {...onSaveButton} />
        <RibbonButton text="Sil" icon="delete" {...onDeleteButton} />
        {props.children}
      </RibbonContainer>
    );
  }
}
