import React from 'react';
import PropTypes from 'prop-types';
import ReactSelect from '@opuscapita/react-select';

const getI18nReactSelectProps = ({ i18n }) => {
  const t = (path, args) => i18n.getMessage(`fsmWorkflowEditor.ui.select.${path}`, args);
  return ({
    searchPromptText: t('typeToSearch'),
    promptTextCreator: (option) => t('createOption', { option }),
    clearValueText: t('clearValue'),
    clearAllText: t('clearAll'),
    noResultsText: t('nothingFound'),
    loadingPlaceholder: t('loading')
  });
}

export default function Select(props, { i18n }) {
  return (
    <ReactSelect
      placeholder=''
      { ...getI18nReactSelectProps({ i18n }) }
      {...props}
    />
  )
}

Select.contextTypes = {
  i18n: PropTypes.object.isRequired
}
