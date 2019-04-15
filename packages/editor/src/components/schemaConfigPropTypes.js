import PropTypes from 'prop-types';

export const releaseGuardsPropTypes = PropTypes.shape({
  toState: PropTypes.oneOf(['all', 'single', 'multiple'])
});

export const stateConfigPropTypes = PropTypes.shape({
  availableNames: PropTypes.arrayOf(PropTypes.string),
  releaseGuards: releaseGuardsPropTypes
});

export const schemaConfigPropTypes = PropTypes.shape({
  state: stateConfigPropTypes
});
