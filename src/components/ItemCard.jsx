import React, { Component } from 'react';
import PropTypes from 'prop-types';
import '../styles/ItemCard.css';

class ItemCard extends Component {
  render() {
    const { thumbnail, title, price } = this.props;
    const newPrice = Number.parseFloat(price).toFixed(2).replace('.', ',');
    return (
      <div className="container-list">
        <div
          data-testid="product"
          className="container-item"
        >
          <img src={ thumbnail } alt={ title } />
          <p>{title}</p>
          <p>{`R$ ${newPrice}`}</p>
        </div>
      </div>
    );
  }
}

ItemCard.propTypes = {
  thumbnail: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
};

export default ItemCard;
