import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Button from '../components/Button';
import RatingForm from '../components/RatingForm';
import ProductComments from '../components/ProductComments';
import { addToCart, getProductById, getComment, getTotalQuantity } from '../services/api';
import Header from '../components/Header';
import '../styles/ProductDetail.css';

class ProductsDetail extends React.Component {
  state = {
    pictures: [],
    title: '',
    price: 0,
    freeShipping: false,
    warranty: '',
    productDetail: null,
    comments: [],
    totalQuantity: 0,
  };

  async componentDidMount() {
    const { match: { params: { id } } } = this.props;
    const productDetail = await getProductById(id);
    const totalQuantity = getTotalQuantity();
    const { title, price, shipping, warranty } = productDetail;
    const { free_shipping: freeShipping } = shipping;
    const pictures = productDetail.pictures.map((image) => (
      image.url
    ));
    this.setState({
      productDetail,
      pictures,
      title,
      price,
      freeShipping,
      warranty,
      totalQuantity,
    });
    this.onUpdateComments();
  }

  onUpdateComments = () => {
    const { match: { params: { id } } } = this.props;
    const comments = getComment(id);
    this.setState({ comments });
  };

  onUpdateShoppingCartItems = () => {
    const totalQuantity = getTotalQuantity();
    this.setState({ totalQuantity });
  };

  render() {
    const { productDetail } = this.state;

    if (!productDetail) {
      return (<div>Carregando</div>);
    }
    const {
      pictures,
      title,
      price,
      freeShipping,
      warranty,
      comments,
      totalQuantity,
    } = this.state;
    const { match: { params: { id: productId } } } = this.props;
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
      <div className="container-detail">
        <Header
          totalQuantity={ totalQuantity }
          activeSearch={ false }
        />
        <h2 data-testid="product-detail-name">{title}</h2>
        {productImage}
        <p data-testid="product-detail-price">{ price }</p>
        <p>{shippingMessage}</p>
        <p>{warranty}</p>
        <Button
          buttonText="Adicionar ao carrinho"
          testid="product-detail-add-to-cart"
          item={ { ...productDetail } }
          onClick={ addToCart }
          onUpdateShoppingCartItems={ this.onUpdateShoppingCartItems }
        />
        <RatingForm productId={ productId } onUpdateComments={ this.onUpdateComments } />
        <ProductComments comments={ comments } />
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
