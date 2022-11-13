import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { FaShoppingCart } from 'react-icons/fa';
import SearchItem from './SearchItem';

import '../styles/Header.css';

class Header extends Component {
  render() {
    const { changeHandler, clickHandler, term, activeSearch, totalQuantity } = this.props;
    return (
      <div className="container-header">
        {activeSearch && (<SearchItem
          term={ term }
          onChange={ changeHandler }
          onClick={ clickHandler }
        />)}
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
      </div>
    );
  }
}

Header.defaultProps = {
  term: '',
  activeSearch: false,
};

Header.propTypes = {
  clickHandler: PropTypes.func.isRequired,
  changeHandler: PropTypes.func.isRequired,
  term: PropTypes.string,
  activeSearch: PropTypes.bool,
  totalQuantity: PropTypes.number.isRequired,
};

export default Header;
