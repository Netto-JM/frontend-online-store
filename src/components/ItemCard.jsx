import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { FaPlusCircle, FaMinusCircle, FaTrashAlt } from 'react-icons/fa';
import Button from './Button';
import { addToCart, removeFromCart, removeCompleteItemFromCart } from '../services/api';
import '../styles/ItemCard.css';

class ItemCard extends Component {
  render() {
    const {
      thumbnail,
      title,
      price,
      id,
      isShoppingCart,
      quantity,
      item,
      onUpdateShoppingCartItems,
      freeShipping,
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
              {freeShipping && <p data-testid="free-shipping">Entrega grátis</p> }
            </div>
          </div>
        </Link>

        {isShoppingCart && (
          <div>
            <div className="container-btn">
              <div className="input-group-increase-decrease">
                <FaMinusCircle
                  onClick={ () => {
                    removeFromCart(item);
                    onUpdateShoppingCartItems();
                  } }
                  type="button"
                  data-testid="product-decrease-quantity"
                />
                <p data-testid="shopping-cart-product-quantity">
                  {quantity}
                </p>
                <FaPlusCircle
                  onClick={ () => {
                    addToCart(item);
                    onUpdateShoppingCartItems();
                  } }
                  type="button"
                  data-testid="product-increase-quantity"
                />
              </div>
            </div>
            <div className="input-remove-cart">
              <FaTrashAlt
                onClick={ () => {
                  removeCompleteItemFromCart(item);
                  onUpdateShoppingCartItems();
                } }
                color="red"
                data-testid="remove-product"
              />
            </div>
          </div>
        )}

        {!isShoppingCart && (
          <Button
            buttonText="Adicionar ao carrinho"
            testid="product-add-to-cart"
            item={ { ...this.props } }
            onClick={ () => {
              addToCart(item);
              onUpdateShoppingCartItems();
            } }
          />
        )}
      </div>
    );
  }
}

ItemCard.defaultProps = {
  isShoppingCart: false,
  item: {},
  quantity: 0,
  onUpdateShoppingCartItems: () => {},
};

ItemCard.propTypes = {
  thumbnail: PropTypes.string.isRequired,
  quantity: PropTypes.number,
  title: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  id: PropTypes.string.isRequired,
  isShoppingCart: PropTypes.bool,
  item: PropTypes.shape(),
  onUpdateShoppingCartItems: PropTypes.func,
  freeShipping: PropTypes.bool.isRequired,
};

export default ItemCard;
