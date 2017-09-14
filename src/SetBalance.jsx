import React, {Component} from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import ActiveCoinListItem from './ActiveCoinListItem.jsx';

class SetBalance extends Component {
      state = {
        open: false,
        userCoins: [
        {
          
        }
        ]
      };


  handleOpen = () => {
    this.setState({open: true});
  };

  handleClose = () => {
    this.setState({open: false});
  };

  handleSelectionChange = (e) => {
    this.setState({
      dropDownSelection: e.target.value,
    })
  }

  handleCoinChange = (e) => {
    this.setState({ coin: e.target.value })
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
        onClick={this.handleClose}
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
            <div className='setBalance'>
                <h3>add new coin</h3>
                <form>
                  <select value={this.state.coin} onChange={this.handleCoinChange}>
                    <option>BTC</option>
                    <option>ETH</option>
                  </select>
                  <input type='text'></input>
                  <button type='submit'>add</button>
                </form>
                <div className='activeCoins'>
                  <h3>my coins</h3>
                  <ActiveCoinListItem />
                </div>
            </div>
          </div>
        </Dialog>
      </div>
    );
  }
}

export default SetBalance;