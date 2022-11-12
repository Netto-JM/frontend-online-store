import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Home from './pages/Home';
import ProductsDetail from './pages/ProductsDetail';
import ShoppingCart from './pages/ShoppingCart';

class App extends React.Component {
  state = {
    shoppingCartItems: [],

  };

  componentDidUpdate() {
    const { shoppingCartItems } = this.state;
    localStorage.setItem('productKeys', JSON.stringify(shoppingCartItems));
  }

  addToCart = (item) => {
    const { shoppingCartItems } = this.state;
    this.setState({ shoppingCartItems: [...shoppingCartItems, item] });
  };

  render() {
    return (
      <Switch>
        <Route
          exact
          path="/"
          render={ () => <Home addToCart={ this.addToCart } /> }
        />
        <Route exact path="/shoppingcart" component={ ShoppingCart } />
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
