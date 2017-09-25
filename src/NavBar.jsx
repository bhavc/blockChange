import React, {Component} from 'react';
import SetNotif from './SetNotif.jsx';
import SetBalance from './SetBalance.jsx';
import AccountInfo from './AccountInfo.jsx';

class NavBar extends Component {
    render() {
        return (
            <div className='navBar'>                
                <SetNotif getNotifications={this.props.getNotifications} userNotifications={this.props.userNotifications} userEmail={this.props.userInfo.useremail}/>
                <SetBalance userInfo={this.props.userInfo} postUserCoins={this.props.postUserCoins} liveCoinValues={this.props.liveCoinValues}/>
                <AccountInfo postUserInfo={this.props.postUserInfo}/>
                <div className='barItem'>
                    <a href='#'><i className="material-icons">exit_to_app</i></a>
                </div>

                <div className='logo'>
                    <p className='logoText'>block<span className='bold'>change</span></p>
                </div>

            </div>
        );
    }
}

export default NavBar;