import React from 'react';
import PropTypes from 'prop-types';
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
    const { title, price, shipping, warranty, condition } = productDetail;
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
      condition,
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
      condition,
    } = this.state;

    const { match: { params: { id: productId } } } = this.props;

    const productImage = pictures.map((image) => (
      <img
        data-testid="product-detail-image"
        key={ image }
        src={ image }
        alt="Product"
        className="imagem"
      />
    ));

    const shippingMessage = freeShipping ? 'Entrega grátis' : ' à consultar';

    const newPrice = Number.parseFloat(price).toFixed(2).replace('.', ',');

    const newCondition = condition === 'new' ? 'novo' : 'usado';

    return (
      <div className="container-detail">
        <Header
          totalQuantity={ totalQuantity }
          activeSearch={ false }
          notHome
        />
        <h1 className="title-page-detail">Detalhes do Produto</h1>
        <h2 data-testid="product-detail-name">{title}</h2>
        <div className="container-detail-product">
          <div className="container-product-detail-img">
            {productImage}
          </div>
          <div className="container-detail-price">
            <div data-testid="product-detail-price">{ ` Valor: R$ ${newPrice}` }</div>
            <div className="frete">{`Frete: ${shippingMessage}`}</div>
            { warranty }
            <div>{`Condição: ${newCondition}`}</div>
            <Button
              buttonText="Adicionar ao carrinho"
              testid="product-detail-add-to-cart"
              item={ { ...productDetail } }
              onClick={ addToCart }
              onUpdateShoppingCartItems={ this.onUpdateShoppingCartItems }
            />
          </div>
        </div>
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
