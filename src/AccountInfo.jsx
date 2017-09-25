import React, {Component} from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';

class AccountInfo extends Component {
      state = {
        open: false,
        dropDownSelection: 'time',
        placeHolder: 'text',
        name: '',
        email: '',
        phone: ''
      };


  handleOpen = () => {
    this.setState({open: true});
  };

  handleClose = () => {
    this.setState({open: false});
  };
  handleNameChange = (e) => {
    this.setState({ name: e.target.value })
  }

  handleEmailChange = (e) => {
    this.setState({ email: e.target.value })
  }

  handlePhoneChange = (e) => {
    this.setState({ phone: e.target.value })
  }

  handleSave = () => {
    let userInfo = {
      name: this.state.name,
      email: this.state.email,
      phone: this.state.phone
    }

    this.props.postUserInfo(userInfo)
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
        onClick={this.handleSave} 
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
              <div className='accountInfo'>
                <h3>Update account</h3>
                <form>
                  <div>
                    <input value={this.state.name} onChange={this.handleNameChange} placeholder='Your Name' type='text'></input>
                  </div>
                  <div>
                    <input value={this.state.email} onChange={this.handleEmailChange} placeholder='Your Email Address' type='text'></input>
                  </div>
                  <div>
                    <input value={this.state.phone} onChange={this.handlePhoneChange} placeholder='Your Phone Number' type='text'></input>
                  </div>

                </form>
                </div>
            </div>
        </Dialog>
      </div>
    );
  }
}

export default AccountInfo;
