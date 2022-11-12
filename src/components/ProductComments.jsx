import React, { Component } from 'react';
import PropTypes from 'prop-types';
import RatingStars from './RatingStars';
import '../styles/ProductDetail.css';

class ProductComments extends Component {
  render() {
    const { comments } = this.props;
    return (
      <div className="container-comments">
        {comments.map(({ email, text, rating }, index) => (
          <div key={ index } className="comment-item">
            <div className="container-email-rating">
              <div
                data-testid="review-card-email"
                className="comment-item-email"
              >
                {email}
              </div>
              <div
                data-testid="review-card-rating"
                className="comment-item-rating"
              >
                <RatingStars rating={ rating } />
              </div>
            </div>
            <div
              data-testid="review-card-evaluation"
              className="comment-item-evaluation"
            >
              {text}
            </div>
          </div>
        )) }
      </div>
    );
  }
}

ProductComments.propTypes = {
  comments: PropTypes.arrayOf(PropTypes.shape({
    email: PropTypes.string.isRequired,
    rating: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
  })).isRequired,
};

export default ProductComments;
