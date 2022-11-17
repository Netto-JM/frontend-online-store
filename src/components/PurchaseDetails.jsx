import React, { Component } from 'react';
import PropTypes from 'prop-types';
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
      <div className="fora">
        <img className="img-prod" src={ thumbnail } alt={ title } />
        <div className="itens-prod title">{title}</div>
        <div className="itens-prod desc">{`Itens: ${quantity}`}</div>
        <div className="itens-prod desc">{`R$ ${newPrice}`}</div>
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
