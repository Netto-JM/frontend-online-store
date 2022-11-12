import React, { Component } from 'react';
import PurchaseDetails from '../components/PurchaseDetails';
import { getTotal, getCartItems } from '../services/api';

class PaymentPage extends Component {
  state = {
    productsList: [],
  };

  componentDidMount() {
    this.toMountAndUpdate();
  }

  toMountAndUpdate = () => {
    const productsList = getCartItems();
    this.setState({
      productsList,
    });
  };

  render() {
    const { productsList } = this.state;
    const totalPrice = getTotal();

    const itemList = productsList.map(
      ({ id, quantity, item: { thumbnail, title, price } }) => (
        <PurchaseDetails
          key={ id }
          quantity={ quantity }
          thumbnail={ thumbnail }
          title={ title }
          price={ price }
        />
      ),
    );

    return (
      <div>
        {itemList}
        {`Total da compra, ${totalPrice}`}
      </div>
    );
  }
}

export default PaymentPage;
