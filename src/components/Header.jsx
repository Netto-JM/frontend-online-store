import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import SearchItem from './SearchItem';

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
          <button
            type="button"
          >
            Carrinho de Compras
          </button>
          <span data-testid="shopping-cart-size">{totalQuantity}</span>
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
