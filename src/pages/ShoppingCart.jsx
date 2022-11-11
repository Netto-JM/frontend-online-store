import React from 'react';
import ItemCard from '../components/ItemCard';

class ShoppingCart extends React.Component {
  state = {
    productsList: [],
  };

  componentDidMount() {
    const productsList = JSON.parse(localStorage.getItem('productKeys'));
    if (productsList) {
      this.setState({ productsList });
    }
  }

  removeFromCart() {
    console.log('removed');
  }

  render() {
    const { productsList } = this.state;
    const itemList = productsList.map((item) => (
      <ItemCard
        { ...item }
        key={ item.id }
        onClick={ this.removeFromCart }
        isShoppingCart
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
