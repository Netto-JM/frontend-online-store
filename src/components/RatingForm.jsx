import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { addComment } from '../services/api';
import '../styles/RatingForm.css';

class RatingForm extends Component {
  state = {
    ratings: [
      { index: 1 },
      { index: 2 },
      { index: 3 },
      { index: 4 },
      { index: 5 },
    ],
    email: '',
    rating: 0,
    text: '',
    isValid: false,
    hasChanges: false,
  };

  validateForm = () => {
    const { email, rating } = this.state;
    const emailRegex = /^[a-z0-9._-]+@[a-z0-9]+\.([a-z]+)?$/i;
    const emailValid = email.match(emailRegex);
    this.setState({
      isValid: !(!emailValid || !rating),
    });
  };

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
      hasChanges: true,
    }, this.validateForm);
  };

  onSubmit = () => {
    const { isValid, email, rating, text } = this.state;
    const { productId, onUpdateComments } = this.props;

    if (!isValid) {
      this.setState({ hasChanges: true });
      return;
    }

    addComment({ productId, email, rating, text });

    onUpdateComments();

    this.setState({
      email: '',
      rating: 1,
      text: '',
      isValid: false,
      hasChanges: false,
    });
  };

  render() {
    const { ratings, rating, text, email, isValid, hasChanges } = this.state;
    return (
      <form className="form-rating">
        <div className="container-input-email-rate">
          <div className="input-group">
            <label
              htmlFor="input-email"
            >
              Email:
              <input
                type="email"
                data-testid="product-detail-email"
                onChange={ this.handleChange }
                id="input-email"
                placeholder="email@email.com"
                name="email"
                value={ email }
              />
            </label>
          </div>
          <div className="input-group">
            <p>Avaliação:</p>
            {ratings.map(({ index }) => (
              <label
                key={ index }
                htmlFor={ `input-rate-${index}` }
              >
                {index}
                <input
                  type="radio"
                  id={ `input-rate-${index}` }
                  data-testid={ `${index}-rating` }
                  value={ index }
                  name="rating"
                  checked={ index === Number(rating) }
                  onChange={ this.handleChange }
                />
              </label>
            ))}
          </div>
        </div>
        <div className="input-group">
          <label
            htmlFor="input-textarea"
          >
            Comentario:
            <textarea
              data-testid="product-detail-evaluation"
              id="input-textarea"
              value={ text }
              name="text"
              rows={ 2 }
              onChange={ this.handleChange }
            />
          </label>
        </div>

        {(!isValid && hasChanges) && (
          <div data-testid="error-msg" className="alert-message">
            Campos inválidos
          </div>
        )}

        <div className="input-group center">
          <button
            type="button"
            data-testid="submit-review-btn"
            onClick={ this.onSubmit }
          >
            Enviar
          </button>
        </div>
      </form>
    );
  }
}

RatingForm.propTypes = {
  productId: PropTypes.string.isRequired,
  onUpdateComments: PropTypes.func.isRequired,
};

export default RatingForm;
