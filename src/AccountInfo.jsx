import React, {Component} from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';

class AccountInfo extends Component {
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
        <i className="material-icons" onClick={this.handleOpen}>account_circle</i>
        <Dialog
          title="Account"
          actions={actions}
          modal={false}
          open={this.state.open}
          onRequestClose={this.handleClose}
        >        
            <div>
                <h3>update account</h3>
                <form>
                  <div>
                    <p>email new address</p>
                    <input type='text'></input>
                  </div>
                  <div>
                    <p>enter new password</p>
                    <input type='text'></input>
                  </div>
                  <div>
                    <p>confirm new passwoerd</p>
                    <input type='text'></input>
                  </div>
                </form>
            </div>
        </Dialog>
      </div>
    );
  }
}

export default AccountInfo;