import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FaStar } from 'react-icons/fa';

const maxStars = 5;
class RatingStars extends Component {
  render() {
    const { rating } = this.props;
    return (
      <div>
        {Array(maxStars)
          .fill('lightgray')
          .fill('gold', 0, Number(rating))
          .map((color, i) => (<FaStar key={ i } color={ color } />))}
      </div>
    );
  }
}

RatingStars.propTypes = {
  rating: PropTypes.string.isRequired,
};

export default RatingStars;
