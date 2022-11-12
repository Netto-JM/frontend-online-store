import React from 'react';
import PropTypes from 'prop-types';
import ItemCard from '../components/ItemCard';

class ShoppingCart extends React.Component {
  state = {
    productsList: [],
    uniqueList: [],
    quantity: {},
    numberOfRenders: 0,
  };

  componentDidMount() {
    this.toMountAndUpdate();
  }

  toMountAndUpdate = () => {
    const data = localStorage.getItem('productKeys');
    if (data) {
      const productsList = JSON.parse(data);
      const quantity = {};
      productsList.forEach((item) => {
        if (!quantity[item.id]) {
          quantity[item.id] = 1;
        } else {
          quantity[item.id] += 1;
        }
      });
      const unique = [];
      const distinct = [];
      for (let i = 0; i < productsList.length; i += 1) {
        if (!unique[productsList[i].id]) {
          distinct.push(productsList[i]);
          unique[productsList[i].id] = 1;
        }
      }
      this.setState({ uniqueList: distinct, quantity, productsList });
    }
  };

  completeRemoveFromCart = () => {
    console.log('completeRemoveFromCart');
  };

  render() {
    const { uniqueList, productsList, quantity, numberOfRenders } = this.state;
    const { addToCart, removeFromCart } = this.props;

    const addAndRender = (item) => {
      addToCart(item);
      this.toMountAndUpdate();
    };
    const removeAndRender = (item) => {
      removeFromCart(item);
      this.toMountAndUpdate();
    };

    const itemList = uniqueList.map((item) => (
      <ItemCard
        { ...item }
        key={ item.id }
        onClick={ this.completeRemoveFromCart }
        isShoppingCart
        quantity={ quantity[item.id] }
        addToCart={ addAndRender }
        removeFromCart={ removeAndRender }
        renderCart={ this.renderCart }
        item={ item }
      />
    ));

    return (
      <div>
        {productsList.length === 0 && (
          <p data-testid="shopping-cart-empty-message">
            Seu carrinho está vazio
          </p>
        )}
        <div className="container">
          {itemList}
          {numberOfRenders}
        </div>
      </div>
    );
  }
}

ShoppingCart.propTypes = {
  addToCart: PropTypes.func.isRequired,
  removeFromCart: PropTypes.func.isRequired,
};

export default ShoppingCart;
