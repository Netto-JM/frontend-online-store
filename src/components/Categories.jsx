import React from 'react';
import PropTypes from 'prop-types';

class Categories extends React.Component {
  render() {
    const { categories, clickHandlerCategories } = this.props;
    return (
      <ul>
        {categories.map((category) => (
          <li key={ category.id }>
            <button
              type="button"
              className="category"
              name={ category.id }
              data-testid="category"
              onClick={ () => clickHandlerCategories(category.id) }
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
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
  })).isRequired,
  clickHandlerCategories: PropTypes.func.isRequired,
};

export default Categories;
