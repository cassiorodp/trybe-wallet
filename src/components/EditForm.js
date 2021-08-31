import React, { Component } from 'react';
import { connect } from 'react-redux';
import { replaceItem } from '../actions';
import WalletInputs from './WalletInput';
import WalletSelect from './WalletSelect';

class EditForm extends Component {
  constructor(props) {
    super(props);
    const {selectedItem} = this.props

    this.state = {
      expenses: {
        value: selectedItem.value,
        description: selectedItem.description,
        currency: selectedItem.currency,
        method: selectedItem.method,
        tag: selectedItem.tag,
        exchangeRates: selectedItem.exchangeRates,
      },
      addButton: true,
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
    this.checkInputs = this.checkInputs.bind(this);
  }

  handleEdit() {
    const { dispatchEdit, selectedItem } = this.props;
    const { expenses } = this.state;

    dispatchEdit(selectedItem.id, expenses);
  }

  handleChange({ target }) {
    const { expenses } = this.state;
    const { id, value } = target;
    this.setState({ expenses: {
      ...expenses,
      [id]: value,
    } });
    this.checkInputs();
  }

  checkInputs() {
    const { expenses: { value, description } } = this.state;
    return value && description
      ? this.setState({ addButton: false }) : this.setState({ addButton: true });
  }

  render() {
    const { currencies } = this.props;
    const { expenses, addButton } = this.state;
    return (
      <form>
        <WalletInputs
          value={ expenses.value }
          labelText="Valor:"
          id="value"
          onChange={ this.handleChange }
        />
        <WalletInputs
          value={ expenses.description }
          labelText="Descrição:"
          id="description"
          onChange={ this.handleChange }
        />
        <WalletSelect
          labelText="Moeda:"
          id="currency"
          ariaLabel="moeda"
          onChange={ this.handleChange }
          currencies={ currencies }
        />
        <label htmlFor="method">
          Método de pagamento:
          <select
            onChange={ this.handleChange }
            aria-label="método de pagamento"
            id="method"
          >
            <option value="Dinheiro">Dinheiro</option>
            <option value="Cartão de crédito">Cartão de crédito</option>
            <option value="Cartão de débito">Cartão de débito</option>
          </select>
        </label>
        <label htmlFor="tag">
          Tag:
          <select onChange={ this.handleChange } name="tag" id="tag">
            <option value="Alimentação">Alimentação</option>
            <option value="Lazer">Lazer</option>
            <option value="Trabalho">Trabalho</option>
            <option value="Transporte">Transporte</option>
            <option value="Saúde">Saúde</option>
          </select>
        </label>
        <button
          onClick={ this.handleEdit }
          type="button"
          disabled={ addButton }
        >
          Editar despesa
        </button>
      </form>
    );
  }
}

const mapStateToProps = ({ wallet }) => ({
  currencies: wallet.currencies,
  selectedItem: wallet.selectedItem,
});

const mapDispatchToProps = (dispatch) => ({
  dispatchEdit: (...payload) => dispatch(replaceItem(...payload)),
});

export default connect(mapStateToProps, mapDispatchToProps)(EditForm);
