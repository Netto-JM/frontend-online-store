import React from 'react';
import PropTypes from 'prop-types';
import Button from '../components/Button';
import RatingForm from '../components/RatingForm';
import ProductComments from '../components/ProductComments';
import { addToCart, getProductById, getComment, getTotalQuantity } from '../services/api';
import Header from '../components/Header';
import '../styles/ProductDetail.css';
import AttributesTable from '../components/AttributesTable';

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
    attributes: [],
  };

  async componentDidMount() {
    const { match: { params: { id } } } = this.props;
    const productDetail = await getProductById(id);

    const totalQuantity = getTotalQuantity();
    const { title, price, shipping, warranty, attributes } = productDetail;
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
      attributes,
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
      attributes,
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

    const attributesByGroup = attributes
      .reduce((acc, {
        attribute_group_name: group,
        name,
        value_name: value,
      }) => {
        if (!acc[group]) {
          acc[group] = [];
        }

        acc[group].push({ name, value });
        return acc;
      }, {});

    const attributeDetails = Object.entries(attributesByGroup)
      .map(([category, attrs]) => (
        <AttributesTable
          key={ category }
          category={ category }
          attributes={ attrs }
        />
      ));

    const shippingMessage = freeShipping ? 'Entrega grátis' : ' à consultar';

    const priceFloat = parseFloat(price);

    const newPrice = !priceFloat ? 'indisponível'
      : priceFloat.toFixed(2);

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
            <div>
              Valor: R$
              <span data-testid="product-detail-price">{newPrice}</span>
            </div>
            <div className="frete">{`Frete: ${shippingMessage}`}</div>
            { warranty }
            <Button
              buttonText="Adicionar ao carrinho"
              testid="product-detail-add-to-cart"
              item={ { ...productDetail } }
              onClick={ addToCart }
              onUpdateShoppingCartItems={ this.onUpdateShoppingCartItems }
            />
          </div>
        </div>
        <div className="container-table">
          {attributeDetails}
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
