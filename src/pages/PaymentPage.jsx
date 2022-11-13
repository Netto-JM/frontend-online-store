import React, { Component } from 'react';
import PropTypes from 'prop-types';
import PurchaseDetails from '../components/PurchaseDetails';
import { getTotal, getCartItems } from '../services/api';

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
        {productsList.length === 0 ? (
          <p data-testid="shopping-cart-empty-message">
            Seu carrinho está vazio
          </p>
        ) : (
          <div>
            {itemList}
            {`Total da compra, ${totalPrice}`}
          </div>
        )}
        <form>
          <input
            type="text"
            data-testid="checkout-fullname"
            name="fullName"
            value={ fullName }
            onChange={ this.changeHandler }
            required
          />
          <input
            type="email"
            data-testid="checkout-email"
            name="email"
            value={ email }
            onChange={ this.changeHandler }
            required
          />
          <input
            type="text"
            data-testid="checkout-cpf"
            name="cpf"
            value={ cpf }
            onChange={ this.changeHandler }
            required
          />
          <input
            type="phone"
            data-testid="checkout-phone"
            name="phone"
            value={ phone }
            onChange={ this.changeHandler }
            required
          />
          <input
            type="text"
            data-testid="checkout-cep"
            name="cep"
            value={ cep }
            onChange={ this.changeHandler }
            required
          />
          <input
            type="text"
            data-testid="checkout-address"
            name="address"
            value={ address }
            onChange={ this.changeHandler }
            required
          />
          <p>Método de Pagamento</p>
          <label htmlFor="boleto">
            <input
              type="radio"
              name="method"
              id="boleto"
              value="boleto"
              data-testid="ticket-payment"
              onChange={ this.changeHandler }
              required
            />
            Boleto
            {/* Aqui seria apenas a imagem de um código de barras como mostra no README */}
          </label>
          <label htmlFor="visa">
            <input
              type="radio"
              name="method"
              id="visa"
              value="visa"
              data-testid="visa-payment"
              onChange={ this.changeHandler }
            />
            Visa
          </label>
          <label htmlFor="master">
            <input
              type="radio"
              name="method"
              id="master"
              value="master"
              data-testid="master-payment"
              onChange={ this.changeHandler }
            />
            MasterCard
          </label>
          <label htmlFor="elo">
            <input
              type="radio"
              name="method"
              id="elo"
              value="elo"
              data-testid="elo-payment"
              onChange={ this.changeHandler }
            />
            Elo
          </label>
          <button
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
