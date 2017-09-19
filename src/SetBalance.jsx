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
    this.setState({
      open: false,
      userCoins: [],
      coin: 'BTC',
      amount: 0
    });
  };

  handleCoinChange = (e) => {
    this.setState({ coin: e.target.value })
  }

  handleAmountChange = (e) => {
    this.setState({ amount: e.target.value })
  }

  handleAdd = () => {
    let userInfo = this.props.userInfo
    let userCoin = {}
    userCoin.userId = userInfo.userId
    userCoin.username = userInfo.username
    userCoin.useremail = userInfo.useremail
    userCoin.coin = this.state.coin
    userCoin.amount = this.state.amount

    let liveCoinValues = this.props.liveCoinValues
    liveCoinValues.forEach((coin) => {
      if (coin.name === userCoin.coin) {
        userCoin.price = coin.price
        userCoin.totalCAD = coin.price * userCoin.amount
      }
    })

    let newUserCoins = this.state.userCoins.concat(userCoin)
    this.setState({userCoins: newUserCoins})
    userCoin = {}
  }

  handleSave = () => {
    let userCoins = this.state.userCoins

    this.props.postUserCoins(userCoins)
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
        label="Save"
        primary={true}
        onClick={this.handleSave}
      />
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
            <div className='setBalance'>
                <h3>Update your balance:</h3>
                <form>
                  <select value={this.state.coin} onChange={this.handleCoinChange}>
                    <option>BTC</option>
                    <option>ETH</option>
                    <option>BCH</option>
                    <option>XRP</option>
                    <option>LTC</option>
                    <option>DASH</option>
                    <option>XEM</option>
                    <option>XER</option>
                    <option>IOT</option>
                    <option>XMR</option>
                    <option>ETC</option>

                  </select>
                  <input type='text' value={this.state.amount} onChange={this.handleAmountChange}></input>
                </form>
                <button className='newButton' onClick={this.handleAdd}>add</button>
                <div className='activeCoins'>
                  <h3>Your wallet:</h3>
                  <ActiveCoinListItem userCoins={this.state.userCoins}/>
                </div>
            </div>
          </div>
        </Dialog>
      </div>
    );
  }
}

export default SetBalance;
