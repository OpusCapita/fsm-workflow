import PropTypes from 'prop-types';

export default PropTypes.oneOfType([
  PropTypes.shape({
    expression: PropTypes.string.isRequired
  }),
  PropTypes.shape({
    name: PropTypes.string.isRequired,
    params: PropTypes.arrayOf(PropTypes.shape({
      name: PropTypes.string.isRequired,
      value: PropTypes.any
    }))
  })
]);
