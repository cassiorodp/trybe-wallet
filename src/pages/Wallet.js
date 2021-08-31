import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { addSpent, getCoins } from '../actions';
import WalletTable from '../components/WalletTable';
import AddForm from '../components/AddForm';
import EditForm from '../components/EditForm';
import '../styles/wallet.css';
import bitcoinImage from '../images/bitcoin.gif';

class Wallet extends React.Component {
  constructor(props) {
    super(props);

    this.renderHeader = this.renderHeader.bind(this);
    this.getCoinsOptions = this.getCoinsOptions.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleExpenses = this.handleExpenses.bind(this);
    this.totalExpenses = this.totalExpenses.bind(this);
  }

  componentDidMount() {
    this.getCoinsOptions();
  }

  componentDidUpdate() {
    this.totalExpenses();
  }

  getCoinsOptions() {
    const { fetchCoins } = this.props;
    fetchCoins();
  }

  handleExpenses() {
    const { dispatchSpent } = this.props;
    const { expenses } = this.state;

    const inicialState = {
      value: '',
      description: '',
      currency: 'USD',
      method: 'dinheiro',
      tag: 'Alimentação',
    };

    dispatchSpent(expenses);
    this.setState({ expenses: inicialState });
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

  totalExpenses() {
    const { expenses } = this.props;
    return expenses.reduce((itemAcc, item) => {
      const convertedValue = item.exchangeRates[item.currency].ask;
      itemAcc += item.value * convertedValue;
      return itemAcc;
    }, 0).toFixed(2);
  }

  renderHeader() {
    const { email } = this.props;
    return (
      <header className="header-container">
        <img src={ bitcoinImage } alt="bitcoin gif" />
        <span
          data-testid="email-field"
        >
          {email}
        </span>
        <div>
          <span
            data-testid="total-field"
          >
            {`Despesa Total: ${this.totalExpenses()}`}
          </span>
          <span
            data-testid="header-currency-field"
          >
            BRL
          </span>
        </div>
      </header>
    );
  }

  render() {
    const { editItem } = this.props;
    return (
      <>
        {this.renderHeader()}
        {editItem ? <EditForm /> : <AddForm />}
        <WalletTable />
      </>);
  }
}

const mapStateToProps = ({ user, wallet }) => ({
  email: user.email,
  currencies: wallet.currencies,
  expenses: wallet.expenses,
  editItem: wallet.editItem,
});

const mapDispatchToProps = (dispatch) => ({
  fetchCoins: () => dispatch(getCoins()),
  dispatchSpent: (payload) => dispatch(addSpent(payload)),
});

Wallet.propTypes = {
  email: PropTypes.string,
  fetchCoins: PropTypes.func,
}.isRequired;

export default connect(mapStateToProps, mapDispatchToProps)(Wallet);
