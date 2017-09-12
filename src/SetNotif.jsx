import React, {Component} from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';

class SetNotif extends Component {
      state = {
        open: false,
        dropDownSelection: 'time',
        placeHolder: 'text'
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
      placeHolder: e.target.value
    })
  }

  notifyForm = () => {

    let placeholder = this.state.placeHolder

    switch (this.state.dropDownSelection){
      case 'time':
        return (
              <select>
                <option>seconds</option>
                <option>minutes</option>
                <option>hours</option>
              </select>)
      case 'percent':
          return (
            <span>%</span>
          )
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
        onClick={this.handleClose}
      />,
    ];

    return (
      <div className='barItem'>
        <i className="material-icons" onClick={this.handleOpen}>add_alarm</i>
        <Dialog
          title="My Alerts"
          actions={actions}
          modal={false}
          open={this.state.open}
          onRequestClose={this.handleClose}
        >        
            <div>
                <div className='setNotif'>
                    <form>
                        <select>
                            <option>BTC</option>
                            <option>ETH</option>
                        </select>
                        <select value={this.state.dropDownSelection} onChange={this.handleSelectionChange}>
                            <option>time</option>
                            <option>percent</option>
                            <option>value</option>
                        </select>
                          <input type='text' placeholder={this.state.placeHolder}></input>
                          {this.notifyForm()}
                        <br />
                        <button>Submit</button>
                    </form>
                </div>
            </div>
        </Dialog>
      </div>
    );
  }
}

export default SetNotif;