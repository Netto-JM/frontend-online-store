import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Button extends Component {
  render() {
    const { buttonText, testid, item, onClick } = this.props;
    return (
      <button
        data-testid={ testid }
        type="button"
        onClick={ () => onClick(item) }
      >
        { buttonText }
      </button>
    );
  }
}

Button.propTypes = {
  buttonText: PropTypes.string.isRequired,
  testid: PropTypes.string.isRequired,
  item: PropTypes.shape({
    thumbnail: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    id: PropTypes.string.isRequired,
  }).isRequired,
  onClick: PropTypes.func.isRequired,
};

export default Button;
