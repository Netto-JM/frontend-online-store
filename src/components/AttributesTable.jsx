import React, { Component } from 'react';
import PropTypes from 'prop-types';

import '../styles/AttributesTable.css';

class AttributesTable extends Component {
  render() {
    const { category, attributes } = this.props;
    const tableLines = attributes.map(({ name, value }) => (
      <tr key={ name }>
        <td className="table-td-name">{name}</td>
        <td className="table-td-value">{value}</td>
      </tr>
    ));

    return (
      <div>
        <h3 className="category-name">{category}</h3>
        <table>
          <tbody>
            {tableLines}
          </tbody>
        </table>
      </div>
    );
  }
}

AttributesTable.propTypes = {
  attributes: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
  })).isRequired,
  category: PropTypes.string.isRequired,
};

export default AttributesTable;
