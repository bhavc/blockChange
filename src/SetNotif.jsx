import React, {Component} from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import ActiveAlertListItem from './ActiveAlertListItem.jsx';

class SetNotif extends Component {
  state = {

    type: 'time',
    value: '',
    coin: 'BTC',
    interval: '',
    open: false,
    placeHolder: '',
    direction: '',
    useremail: this.props.userEmail

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

  handleTypeChange = (e) => {
    this.setState({ type: e.target.value })
  }

  handleValueChange = (e) => {
    this.setState({ value: e.target.value })
  }

  handleCoinChange = (e) => {
    this.setState({ coin: e.target.value })
  }

  handleIntervalChange = (e) => {
    this.setState({ interval: e.target.value })
  }

  handleDirectionChange = (e) => {
    this.setState({ direction: e.target.value })
  }

  handleSubmit = (e) => {
    fetch('http://localhost:3001/notification', {
      method: 'POST',
      body: JSON.stringify(this.state),
      headers: {
        'Content-Type': "application/json"
      },
      credentials: 'omit'
    })
    .then((response) => {
      return response.text()
    },
    (error) => {
      error.message
    })
    this.handleClose()
  }

  notifyChangeTime = () => {

    switch (this.state.type){
      case 'time':
        return (
              <select value={this.state.interval} onChange={this.handleIntervalChange}>
                <option>seconds</option>
                <option>minutes</option>
                <option>hours</option>
              </select>)
    }
  }

  notifyChangeValue = () => {

    switch (this.state.type){
      case 'percent':
        return (
              <select value={this.state.direction} onChange={this.handleDirectionChange}>
                <option>Up</option>
                <option>Down</option>
              </select>)

      case 'value':
        return (
              <select value={this.state.direction} onChange={this.handleDirectionChange}>
                <option>Up</option>
                <option>Down</option>
              </select>)
    }
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
        <i className="material-icons" onClick={this.handleOpen}>add_alarm</i>
        <Dialog
          title="Alerts"
          actions={actions}
          modal={false}
          open={this.state.open}
          onRequestClose={this.handleClose}
        >
            <div>
                <div className='setNotif'>
                    <h3>add new alert</h3>
                    <form>
                        <select value={this.state.coin} onChange={this.handleCoinChange}>
                            <option>BTC</option>
                            <option>ETH</option>
                        </select>

                        <select value={this.state.type} onChange={this.handleTypeChange}>
                            <option>time</option>
                            <option>percent</option>
                            <option>value</option>
                        </select>
                          {this.notifyChangeValue()}
                          <input type='text' value={this.state.value} placeholder={this.state.placeHolder} onChange={this.handleValueChange}></input>
                          {this.notifyChangeTime()}

                        <br />
                    </form>
                    <div className='activeAlerts'>
                      <h3>my active alerts</h3>
                      <ActiveAlertListItem />
                    </div>
                </div>
            </div>
        </Dialog>
      </div>
    );
  }
}

export default SetNotif;
