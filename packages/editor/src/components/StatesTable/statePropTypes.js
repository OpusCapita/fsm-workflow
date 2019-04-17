import PropTypes from 'prop-types';
import guardPropTypes from '../Guards/guardPropTypes';

export const stateReleaseGuardsPropTypes = PropTypes.arrayOf(PropTypes.shape({
  to: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.arrayOf(PropTypes.string)
  ]),
  guards: PropTypes.arrayOf(guardPropTypes)
}));

export default PropTypes.shape({
  name: PropTypes.string,
  description: PropTypes.string,
  release: stateReleaseGuardsPropTypes
});
