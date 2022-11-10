import React from 'react';
import PropTypes from 'prop-types';

class SearchItem extends React.Component {
  render() {
    const { term, changeHandler, clickHandler } = this.props;
    return (
      <div>
        <label htmlFor="Home">
          <input
            type="text"
            id="Home"
            data-testid="query-input"
            value={ term }
            onChange={ changeHandler }
          />
        </label>
        <button
          data-testid="query-button"
          type="button"
          onClick={ clickHandler }
        >
          Buscar
        </button>
      </div>
    );
  }
}

SearchItem.propTypes = {
  term: PropTypes.string.isRequired,
  changeHandler: PropTypes.func.isRequired,
  clickHandler: PropTypes.func.isRequired,
};

export default SearchItem;
