import React, {Component} from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';

class SetNotif extends Component {
  state = {
    open: false,
  };

  handleOpen = () => {
    this.setState({open: true});
  };

  handleClose = () => {
    this.setState({open: false});
  };

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
        <a href='#'><i className="material-icons" onClick={this.handleOpen}>add_alarm</i></a>
        <Dialog
          title="Set alert"
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
                        <select>
                            <option>time</option>
                            <option>percent</option>
                            <option>value</option>
                        </select>
                            <input type='text'></input>
                        <select>
                            <option>seconds</option>
                            <option>minutes</option>
                            <option>hours</option>
                        </select>
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