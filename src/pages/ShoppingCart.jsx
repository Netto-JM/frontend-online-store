import React from 'react';
import ItemCard from '../components/ItemCard';

class ShoppingCart extends React.Component {
  state = {
    productsList: [],
    uniqueList: [],
    quantity: {},
  };

  componentDidMount() {
    const productsList = JSON.parse(localStorage.getItem('productKeys'));
    if (productsList) {
      this.setState({ productsList });
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
      this.setState({ uniqueList: distinct, quantity });
    }
  }

  removeFromCart() {
    console.log('removed');
  }

  render() {
    const { uniqueList, productsList, quantity } = this.state;
    const itemList = uniqueList.map((item) => (
      <ItemCard
        { ...item }
        key={ item.id }
        onClick={ this.removeFromCart }
        isShoppingCart
        quantity={ quantity[item.id] }
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
          { itemList }
        </div>
        <p data-testid="shopping-cart-product-quantity">
          { `Quantidade de items: ${productsList.length}` }
        </p>
      </div>
    );
  }
}

export default ShoppingCart;
