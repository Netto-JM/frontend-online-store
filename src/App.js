import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Home from './pages/Home';
import PaymentPage from './pages/PaymentPage';
import ProductsDetail from './pages/ProductsDetail';
import ShoppingCart from './pages/ShoppingCart';

class App extends React.Component {
  render() {
    return (
      <Switch>
        <Route exact path="/" component={ Home } />
        <Route exact path="/shoppingcart" component={ ShoppingCart } />
        <Route exact path="/productdetail/:id" component={ ProductsDetail } />
        <Route exact path="/payment" component={ PaymentPage } />
      </Switch>
    );
  }
}

export default App;
