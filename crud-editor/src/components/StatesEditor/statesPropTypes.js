import PropTypes from 'prop-types';

export default PropTypes.arrayOf(PropTypes.shape({
  id: PropTypes.string,
  name: PropTypes.string,
  description: PropTypes.string,
  isInitial: PropTypes.bool,
  isFinal: PropTypes.bool
}))
