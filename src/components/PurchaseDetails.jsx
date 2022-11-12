import React, { Component } from 'react';
import PropTypes from 'prop-types';
// import { FaPlusCircle, FaMinusCircle, FaTrashAlt } from 'react-icons/fa';
import '../styles/ItemCard.css';

class PurchaseDetails extends Component {
  render() {
    const {
      thumbnail,
      title,
      price,
      quantity,
    } = this.props;
    const newPrice = Number.parseFloat(price).toFixed(2).replace('.', ',');
    return (
      <div className="container-list">
        <div className="container-item">
          <img src={ thumbnail } alt={ title } width="100" height="100" />
          <p>{title}</p>
          <p>{`R$ ${newPrice}`}</p>
          <p>{quantity}</p>
        </div>
      </div>
    );
  }
}

PurchaseDetails.propTypes = {
  thumbnail: PropTypes.string.isRequired,
  quantity: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
};

export default PurchaseDetails;
