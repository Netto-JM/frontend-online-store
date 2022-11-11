import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Button extends Component {
  render() {
    const { buttonText, testid, id, clickHandler } = this.props;
    return (
      <button
        data-testid={ testid }
        type="button"
        onClick={ () => clickHandler(id) }
      >
        { buttonText }
      </button>
    );
  }
}

Button.propTypes = {
  buttonText: PropTypes.string.isRequired,
  testid: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  clickHandler: PropTypes.func.isRequired,
};

export default Button;
