import React from 'react';
import PropTypes from 'prop-types';

class Categories extends React.Component {
  render() {
    const { categories } = this.props;
    return (
      <ul>
        {categories.map((category) => (
          <li key={ category.id }>
            <button
              type="button"
              className="category"
              key={ category.id }
              data-testid="category"
              onClick={ () => this.getProductsFromCategoryAndQuery(category.id) }
            >
              {category.name}
            </button>
          </li>
        ))}
      </ul>
    );
  }
}

Categories.propTypes = {
  categories: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
  })).isRequired,
};

export default Categories;
