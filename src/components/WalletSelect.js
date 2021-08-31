import React, { Component } from 'react';
import PropTypes from 'prop-types';

class WalletSelect extends Component {
  render() {
    const { labelText, id, ariaLabel, onChange, currencies, value } = this.props;
    return (
      <label htmlFor={ id } className="form-label">
        {labelText}
        <select
          className="form-select"
          onChange={ onChange }
          aria-label={ ariaLabel }
          id={ id }
          value={ value }
        >
          {currencies.map((coin) => <option key={ coin } value={ coin }>{coin}</option>)}
        </select>
      </label>
    );
  }
}

WalletSelect.propTypes = {
  labelText: PropTypes.string,
}.isRequired;

export default WalletSelect;
