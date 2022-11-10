import React, { Component } from 'react';
import PropTypes from 'prop-types';
import '../styles/ItemCard.css';
import { Link } from 'react-router-dom';

class ItemCard extends Component {
  render() {
    const { thumbnail, title, price, id } = this.props;
    const newPrice = Number.parseFloat(price).toFixed(2).replace('.', ',');
    return (
      <Link
        to={ `/productdetail/${id}` }
      >
        <div className="container-list" data-testid="product-detail-link">
          <div
            data-testid="product"
            className="container-item"
          >
            <img src={ thumbnail } alt={ title } width="100" height="100" />
            <p>{title}</p>
            <p>{`R$ ${newPrice}`}</p>
          </div>
        </div>
      </Link>
    );
  }
}

ItemCard.propTypes = {
  thumbnail: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  id: PropTypes.string.isRequired,
};

export default ItemCard;
