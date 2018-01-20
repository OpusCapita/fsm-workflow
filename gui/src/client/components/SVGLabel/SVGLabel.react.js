import React, { PureComponent, PropTypes } from 'react';
import './SVGLabel.less';

const propTypes = {
  onUpdate: PropTypes.func
};

const defaultProps = {
  label: '',
  onUpdate: () => {}
};

export default
class SVGLabel extends PureComponent {
  constructor(props) {
    super(props);

    this.handleLabelElementRef = this.handleLabelElementRef.bind(this);
  }

  componentDidUpdate(nextProps, nextState) {
    console.log('update');
    nextProps.onUpdate(this.labelElement);
  }

  handleLabelElementRef(ref) {
    console.log('ref');
    this.labelElement = ref;
    this.props.onUpdate(ref);
  }

  render () {
    const {
      children,
      onUpdate,
      ...restProps
    } = this.props;


    return (
      <text
        ref={this.handleLabelElementRef}
        {...restProps}
      >
        {children}
      </text>
    );
  }
}

SVGLabel.propTypes = propTypes;
SVGLabel.defaultProps = defaultProps;
