import React from 'react';
import ItemCard from '../components/ItemCard';
import { getProductById } from '../services/api';

class ShoppingCart extends React.Component {
  state = {
    idList: [],
  };

  componentDidMount() {
    const { idList } = this.state;
    const getList = JSON.parse(localStorage.getItem('productKeys'));
    if (getList) {
      this.setState({ idList: getList });
    }
  }

  removeFromCart() {
    console.log('removed');
  }

  render() {
    const { idList } = this.state;
    const IS_SHOPPING_CART = true;

    console.log('idList', idList);

    const myProductsList = idList.map(async (id) => {
      const productDetails = await getProductById(id);
      return productDetails;
    });

    /*     const itemList = productsList.map((item) => (
      <ItemCard { ...item } key={ item.id } clickHandler={ this.addToCart } />
    )); */

    console.log('myProductsList', myProductsList);

    const itemList = myProductsList.map((item) => (
      <ItemCard
        { ...item }
        key={ item.id }
        clickHandler={ this.removeFromCart }
        isShoppingCart={ IS_SHOPPING_CART }
      />
    ));

    console.log(itemList);
    return (
      <div>
        {myProductsList.length === 0 ? (
          <p data-testid="shopping-cart-empty-message">
            Seu carrinho está vazio
          </p>
        ) : (
          { itemList }
        )}
      </div>
    );
  }
}

export default ShoppingCart;
