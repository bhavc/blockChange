import React, {Component} from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import ActiveCoinListItem from './ActiveCoinListItem.jsx';

class SetBalance extends Component {
      state = {
        open: false,
        userCoins: [],
        coin: 'BTC',
        amount: 0
      };


  handleOpen = () => {
    this.setState({open: true});
  };

  handleClose = () => {
    this.setState({open: false});
  };

  handleCoinChange = (e) => {
    this.setState({ coin: e.target.value })
  }

  handleAmountChange = (e) => {
    this.setState({ amount: e.target.value })
  }

  handleSubmit = () => {
    let userCoin = {}
    let userCoins = this.state.userCoins
    userCoin.coin = this.state.coin
    userCoin.amount = this.state.amount
    userCoins.push(userCoin)
    userCoin = {}
    this.props.setUserCoins(userCoins)
    this.handleClose()
  }

  render() {

    const actions = [
      <FlatButton
        label="Cancel"
        primary={true}
        onClick={this.handleClose}
      />,
      <FlatButton
        label="Submit"
        primary={true}
        onClick={this.handleSubmit}
      />,
    ];

    return (
      <div className='barItem'>
        <i className="material-icons" onClick={this.handleOpen}>attach_money</i>
        <Dialog
          title="Balance"
          actions={actions}
          modal={false}
          open={this.state.open}
          onRequestClose={this.handleClose}
        >        
            <div>
                <h3>add new coin</h3>
                <form>
                  <select value={this.state.coin} onChange={this.handleCoinChange}>
                    <option>BTC</option>
                    <option>ETH</option>
                  </select>
                  <input type='text' value={this.state.amount} onChange={this.handleAmountChange}></input>
                </form>
                <div className='activeCoins'>
                  <h3>my coins</h3>
                  <ActiveCoinListItem />
                </div>
            </div>
        </Dialog>
      </div>
    );
  }
}

export default SetBalance;