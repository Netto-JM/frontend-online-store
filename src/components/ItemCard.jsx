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

    const priceFloat = parseFloat(price);

    const newPrice = !priceFloat ? 'indisponível'
      : priceFloat.toFixed(2).replace('.', ',');

    return (
      <div>
        <div className="container-list" data-testid="product-detail-link">
          <div
            data-testid="product"
            className="container-item"
          >
            <img src={ thumbnail } alt={ title } className="img" />
            <p data-testid="shopping-cart-product-name">{title}</p>
            <p>{`R$ ${newPrice}`}</p>
            {freeShipping && <p data-testid="free-shipping">Entrega gratis</p> }
          </div>
          <div>
            {!isShoppingCart && (
              <Link
                to={ `/productdetail/${id}` }
              >
                <button
                  type="button"
                  className="btn-details"
                >
                  Ver detalhes
                </button>
              </Link>
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
        </div>

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
