import React from 'react';
import PropTypes from 'prop-types';

class SearchItem extends React.Component {
  render() {
    const { term, onChange, onClick } = this.props;
    return (
      <div>
        <label htmlFor="Home">
          <input
            type="text"
            id="Home"
            data-testid="query-input"
            value={ term }
            onChange={ onChange }
          />
        </label>
        <button
          data-testid="query-button"
          type="button"
          onClick={ onClick }
        >
          Buscar
        </button>
      </div>
    );
  }
}

SearchItem.propTypes = {
  term: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default SearchItem;
