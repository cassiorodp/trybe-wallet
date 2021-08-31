import React, { Component } from 'react';
import PropTypes from 'prop-types';

class WalletInputs extends Component {
  render() {
    const { labelText, id, onChange, value } = this.props;
    return (
      <label htmlFor={ id } className="form-label">
        {labelText}
        <input
          className="form-control"
          value={ value }
          onChange={ onChange }
          id={ id }
          type="text"
        />
      </label>
    );
  }
}

WalletInputs.propTypes = {
  labelText: PropTypes.string,
}.isRequired;

export default WalletInputs;
