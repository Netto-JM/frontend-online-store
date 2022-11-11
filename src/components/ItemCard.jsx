import React, { Component } from 'react';
import PropTypes from 'prop-types';
import '../styles/ItemCard.css';
import { Link } from 'react-router-dom';
import Button from './Button';

class ItemCard extends Component {
  render() {
    const { thumbnail, title, price, id, clickHandler, isShoppingCart } = this.props;
    const newPrice = Number.parseFloat(price).toFixed(2).replace('.', ',');
    return (
      <div>
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

        {isShoppingCart ? (
          <Button
            buttonText="Remover do carrinho"
            testid="product-add-to-cart"
            id={ id }
            clickHandler={ clickHandler }
          />
        ) : (
          <Button
            buttonText="Adicionar ao carrinho"
            testid="product-add-to-cart"
            id={ id }
            clickHandler={ clickHandler }
          />
        )}
      </div>
    );
  }
}

ItemCard.defaultProps = {
  isShoppingCart: false,
};

ItemCard.propTypes = {
  thumbnail: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  id: PropTypes.string.isRequired,
  clickHandler: PropTypes.func.isRequired,
  isShoppingCart: PropTypes.bool,
};

export default ItemCard;
