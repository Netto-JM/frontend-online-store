import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
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

  componentDidUpdate() {
    const { shoppingCartItems } = this.state;
    localStorage.setItem('productKeys', JSON.stringify(shoppingCartItems));
  }

  addToCart = (item) => {
    const { shoppingCartItems } = this.state;
    this.setState({ shoppingCartItems: [...shoppingCartItems, item] });
  };

  removeFromCart = (item) => {
    console.log('remove');
    const { shoppingCartItems } = this.state;
    const index = shoppingCartItems.findIndex((object) => object.id === item.id);
    const noIndex = -1;
    if (index === noIndex) return;
    this.setState((prevState) => {
      const newCart = prevState.shoppingCartItems.splice(index, 1);
      return newCart;
    });
  };

  render() {
    const { shoppingCartItems } = this.state;
    return (
      <BrowserRouter>
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
                shoppingCartItems={ shoppingCartItems }
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
      </BrowserRouter>
    );
  }
}

export default App;
