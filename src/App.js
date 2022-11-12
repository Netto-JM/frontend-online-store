import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Home from './pages/Home';
import ProductsDetail from './pages/ProductsDetail';
import ShoppingCart from './pages/ShoppingCart';

class App extends React.Component {
  state = {
    shoppingCartItems: [],
  };

  // componentDidMount() {
  //   const { shoppingCartItems } = this.state;
  //   localStorage.getItem('productKeys', JSON.stringify(shoppingCartItems));
  // }

  updateLocalStorage = (items) => localStorage
    .setItem('productKeys', JSON.stringify(items));

  addToCart = (item) => {
    const { shoppingCartItems } = this.state;
    const updatedShoppingCartItems = [...shoppingCartItems, item];
    this.updateLocalStorage(updatedShoppingCartItems);
    this.setState({ shoppingCartItems: updatedShoppingCartItems });
  };

  removeFromCart = (item) => {
    const { shoppingCartItems } = this.state;
    const index = shoppingCartItems.findIndex((object) => object.id === item.id);

    const noIndex = -1;
    if (index === noIndex) return;
    const updatedShoppingCartItems = shoppingCartItems
      .filter((_, i) => i !== index);
    this.updateLocalStorage(updatedShoppingCartItems);
    this.setState({
      shoppingCartItems: updatedShoppingCartItems,
    });
  };

  render() {
    return (
      <Switch>
        <Route
          exact
          path="/"
          render={ () => <Home addToCart={ this.addToCart } /> }
        />
        <Route
          exact
          path="/shoppingcart"
          render={ (props) => (
            <ShoppingCart
              { ...props }
              addToCart={ this.addToCart }
              removeFromCart={ this.removeFromCart }
            />) }
        />
        <Route
          exact
          path="/productdetail/:id"
          render={ (props) => (
            <ProductsDetail
              { ...props }
              addToCart={ this.addToCart }
            />) }
        />
      </Switch>
    );
  }
}

export default App;
