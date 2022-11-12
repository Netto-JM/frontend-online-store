import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Button from './Button';
import '../styles/ItemCard.css';

class ItemCard extends Component {
  render() {
    const {
      thumbnail,
      title,
      price,
      id,
      onClick,
      isShoppingCart,
      quantity,
      addToCart,
      removeFromCart,
      item,
    } = this.props;
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
              <p data-testid="shopping-cart-product-name">{title}</p>
              <p>{`R$ ${newPrice}`}</p>
            </div>
          </div>
        </Link>

        {isShoppingCart && (
          <div>
            <button
              onClick={ () => removeFromCart(item) }
              type="button"
              data-testid="product-decrease-quantity"
            >
              Remover
            </button>
            <p data-testid="shopping-cart-product-quantity">
              {`quantidade ${quantity}`}
            </p>
            <button
              onClick={ () => addToCart(item) }
              type="button"
              data-testid="product-increase-quantity"
            >
              Adicionar
            </button>
          </div>
        )}

        {isShoppingCart ? (
          <Button
            buttonText="Remover do carrinho"
            // testid="product-add-to-cart"
            id={ id }
            onClick={ onClick }
          />
        ) : (
          <Button
            buttonText="Adicionar ao carrinho"
            testid="product-add-to-cart"
            item={ { ...this.props } }
            onClick={ onClick }
          />
        )}
      </div>
    );
  }
}

ItemCard.defaultProps = {
  isShoppingCart: false,
  item: {},
  addToCart: () => {},
  removeFromCart: () => {},
};

ItemCard.propTypes = {
  thumbnail: PropTypes.string.isRequired,
  quantity: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  id: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  isShoppingCart: PropTypes.bool,
  addToCart: PropTypes.func,
  removeFromCart: PropTypes.func,
  item: PropTypes.shape(),
};

export default ItemCard;
