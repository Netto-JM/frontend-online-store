import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { FaShoppingCart } from 'react-icons/fa';
import SearchItem from './SearchItem';

import '../styles/Header.css';

class Header extends Component {
  render() {
    const {
      changeHandler,
      clickHandler,
      term,
      activeSearch,
      totalQuantity,
      notHome,
    } = this.props;

    return (
      <div className="container-header">
        {activeSearch && (
          <>
            <SearchItem
              term={ term }
              onChange={ changeHandler }
              onClick={ clickHandler }
            />
            <h1>FrontEnd Online Store</h1>
          </>
        )}
        <Link
          to="/shoppingcart"
          data-testid="shopping-cart-button"
        >
          <FaShoppingCart className="cart-items-icon" color="darkgreen" />
          <span
            className="cart-item-icon-count"
            data-testid="shopping-cart-size"
          >
            {totalQuantity}
          </span>
        </Link>
        { notHome && (
          <>
            <h1>FrontEnd Online Store</h1>
            <Link
              to="/"
            >
              <button
                type="button"
              >
                Voltar à Home
              </button>
            </Link>
          </>
        )}
      </div>
    );
  }
}

Header.defaultProps = {
  term: '',
  activeSearch: false,
  notHome: false,
};

Header.propTypes = {
  clickHandler: PropTypes.func.isRequired,
  changeHandler: PropTypes.func.isRequired,
  term: PropTypes.string,
  activeSearch: PropTypes.bool,
  totalQuantity: PropTypes.number.isRequired,
  notHome: PropTypes.bool,
};

export default Header;
