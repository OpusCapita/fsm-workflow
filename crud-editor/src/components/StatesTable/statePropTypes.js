import PropTypes from 'prop-types';

export default PropTypes.shape({
  name: PropTypes.string,
  description: PropTypes.string,
  isInitial: PropTypes.bool,
  isFinal: PropTypes.bool
})
