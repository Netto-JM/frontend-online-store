import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { getProductById } from '../services/api';

class ProductsDetail extends React.Component {
  state = {
    pictures: [],
    title: '',
    price: 0,
    freeShipping: false,
    warranty: '',
  };

  async componentDidMount() {
    const { match } = this.props;
    const { params: { id } } = match;
    const productDetail = await getProductById(id);
    const { title, price, shipping, warranty } = productDetail;
    const { free_shipping: freeShipping } = shipping;
    const pictures = productDetail.pictures.map((image) => (
      image.url
    ));
    this.setState({ pictures, title, price, freeShipping, warranty });
  }

  render() {
    const { pictures, title, price, freeShipping, warranty } = this.state;
    const productImage = pictures.map((image) => (
      <img
        data-testid="product-detail-image"
        src={ image }
        alt="Product"
        key={ image }
      />
    ));

    const shippingMessage = freeShipping ? 'Entrega grátis' : 'Vai ter que pagar amigão';

    return (
      <div>
        <h2 data-testid="product-detail-name">{title}</h2>
        {productImage}
        <p data-testid="product-detail-price">{ price }</p>
        <Link
          to="/shoppingcart"
          data-testid="shopping-cart-button"
        >
          <button
            type="button"
          >
            Carrinho de Compras
          </button>
        </Link>
        <p>{shippingMessage}</p>
        <p>{warranty}</p>
      </div>
    );
  }
}

ProductsDetail.propTypes = {
  match: PropTypes.shape({
    isExact: PropTypes.bool.isRequired,
    path: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};

export default ProductsDetail;
