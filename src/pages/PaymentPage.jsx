import React, { Component } from 'react';
import { FaCcVisa, FaCcMastercard, FaRegCreditCard, FaBarcode } from 'react-icons/fa';
import PropTypes from 'prop-types';
import PurchaseDetails from '../components/PurchaseDetails';
import { getTotal, getCartItems } from '../services/api';
import Header from '../components/Header';
import '../styles/Payment.css';

class PaymentPage extends Component {
  state = {
    productsList: [],
    fullName: '',
    email: '',
    cpf: '',
    phone: '',
    cep: '',
    address: '',
    method: '',
    isValid: true,
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

  validateForm = () => {
    const { method, fullName, email, cpf, phone, cep, address } = this.state;
    const isValid = !!(fullName && email && cpf && phone && cep && method && address);
    this.setState({ isValid });
    return isValid;
  };

  clickHandler = () => {
    const isValid = this.validateForm();
    if (isValid) {
      localStorage.removeItem('productKeys');
      const { history } = this.props;
      history.push('/');
    }
  };

  changeHandler = ({ target: { name, value } }) => {
    this.setState({ [name]: value });
  };

  render() {
    const {
      productsList,
      fullName,
      email,
      cpf,
      phone,
      cep,
      address,
      isValid,
    } = this.state;

    const totalPrice = getTotal();
    const newPrice = parseFloat(totalPrice).toFixed(2).replace('.', ',');

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
        <Header
          activeSearch={ false }
          notHome
          notShop={ false }
        />

        {productsList.length === 0 ? (
          <p data-testid="shopping-cart-empty-message">
            Seu carrinho está vazio
          </p>
        ) : (
          <div className="container-resume-prod">
            <div className="container-resume">
              <h2 className="title-page-detail">Resumo da compra</h2>
              {itemList}
            </div>
            <div className="total-price">{`Total da compra: R$ ${newPrice}`}</div>
          </div>
        )}

        <form className="form-buyer">
          <h2 className="title-page-buyer">Dados do comprador</h2>
          <div className="input">
            <input
              type="text"
              data-testid="checkout-fullname"
              name="fullName"
              value={ fullName }
              onChange={ this.changeHandler }
              placeholder="Nome Completo"
              required
            />
          </div>
          <div className="input">
            <input
              type="email"
              data-testid="checkout-email"
              name="email"
              value={ email }
              onChange={ this.changeHandler }
              placeholder="Email"
              required
            />
          </div>
          <div className="input">
            <input
              type="text"
              data-testid="checkout-cpf"
              name="cpf"
              value={ cpf }
              onChange={ this.changeHandler }
              placeholder="CPF"
              required
            />
          </div>
          <div className="input">
            <input
              type="phone"
              data-testid="checkout-phone"
              name="phone"
              value={ phone }
              onChange={ this.changeHandler }
              placeholder="Telefone"
              required
            />
          </div>
          <div className="input">
            <input
              type="text"
              data-testid="checkout-cep"
              name="cep"
              value={ cep }
              onChange={ this.changeHandler }
              placeholder="CEP"
              required
            />
          </div>
          <div className="input">
            <input
              type="text"
              data-testid="checkout-address"
              name="address"
              value={ address }
              onChange={ this.changeHandler }
              placeholder="Endereço"
              required
            />
          </div>
          <div className="container-payment">
            <p className="title-page-buyer">Método de Pagamento</p>
            <label htmlFor="boleto" className="icon-payment">
              <input
                type="radio"
                name="method"
                id="boleto"
                value="boleto"
                data-testid="ticket-payment"
                onChange={ this.changeHandler }
                required
              />
              <FaBarcode />
            </label>
            <label htmlFor="visa" className="icon-payment">
              <input
                type="radio"
                name="method"
                id="visa"
                value="visa"
                data-testid="visa-payment"
                onChange={ this.changeHandler }
              />
              <FaCcVisa />
            </label>
            <label htmlFor="master" className="icon-payment">
              <input
                type="radio"
                name="method"
                id="master"
                value="master"
                data-testid="master-payment"
                onChange={ this.changeHandler }
              />
              <FaCcMastercard />
            </label>
            <label htmlFor="elo" className="icon-payment">
              <input
                type="radio"
                name="method"
                id="elo"
                value="elo"
                data-testid="elo-payment"
                onChange={ this.changeHandler }
              />
              <FaRegCreditCard />
            </label>
          </div>
          <button
            className="btn-form-buyer"
            type="button"
            data-testid="checkout-btn"
            onClick={ this.clickHandler }
          >
            Comprar
          </button>
        </form>
        {isValid || <p data-testid="error-msg">Campos inválidos</p>}
      </div>
    );
  }
}

PaymentPage.propTypes = {
  history: PropTypes.shape().isRequired,
};

export default PaymentPage;
