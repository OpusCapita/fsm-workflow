import PropTypes from 'prop-types';

export default PropTypes.oneOfType([
  PropTypes.string, // implemented now
  PropTypes.object // for future support of action-like guards
]);
