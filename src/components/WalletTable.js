import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { deleteRow, editItem } from '../actions';
import '../styles/walletTable.css';

class WalletTable extends Component {
  renderTableHead() {
    return (
      <thead className="table-head">
        <tr>
          <th>Descrição</th>
          <th>Tag</th>
          <th>Método de pagamento</th>
          <th>Valor</th>
          <th>Moeda</th>
          <th>Câmbio utilizado</th>
          <th>Valor convertido</th>
          <th>Moeda de conversão</th>
          <th>Editar/Excluir</th>
        </tr>
      </thead>
    );
  }

  render() {
    const { expenses, editExpenses, deleteExpenses } = this.props;
    return (
      <table className="table-container">
        {this.renderTableHead()}
        <tbody>
          {expenses.map((item) => (
            <tr key={ item.id } style={ { textAlign: 'center' } }>
              <td>{item.description}</td>
              <td>{item.tag}</td>
              <td>{item.method}</td>
              <td>{`${item.currency} ${parseInt(item.value, 10).toFixed(2)}`}</td>
              <td>{item.exchangeRates[item.currency].name.split('/')[0]}</td>
              <td>
                {`R$ ${parseFloat(item
                  .exchangeRates[item.currency].ask).toFixed(2)}`}
              </td>
              <td>
                {`R$ ${(item
                  .exchangeRates[item.currency].ask * item.value).toFixed(2)}`}
              </td>
              <td>{item.exchangeRates[item.currency].name.split('/')[1]}</td>
              <td>
                <button
                  onClick={ () => editExpenses(item.id) }
                  type="button"
                  className="btn btn-warning edit-button"
                >
                  <i className="fas fa-edit" />
                </button>
                <button
                  onClick={ () => deleteExpenses(item.id) }
                  data-testid="delete-btn"
                  type="button"
                  className="btn btn-danger delete-button"
                >
                  <i className="fas fa-trash" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  }
}

WalletTable.propTypes = {
  expenses: PropTypes.array,
}.isRequired;

const mapStateToProps = ({ wallet }) => ({
  expenses: wallet.expenses,
});

const mapDispatchToProps = (dispatch) => ({
  editExpenses: (payload) => dispatch(editItem(payload)),
  deleteExpenses: (payload) => dispatch(deleteRow(payload)),
});

export default connect(mapStateToProps, mapDispatchToProps)(WalletTable);
