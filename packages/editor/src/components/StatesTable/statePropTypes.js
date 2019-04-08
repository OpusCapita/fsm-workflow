import PropTypes from 'prop-types';
import guardPropTypes from '../Guards/guardPropTypes';

export default PropTypes.shape({
  name: PropTypes.string,
  description: PropTypes.string,
  // isInitial: PropTypes.bool,
  // isFinal: PropTypes.bool,
  release: PropTypes.arrayOf(PropTypes.shape({
    to: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.arrayOf(PropTypes.string)
    ]),
    guards: PropTypes.arrayOf(guardPropTypes)
  }))
})
