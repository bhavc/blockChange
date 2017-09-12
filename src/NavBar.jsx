import React, {Component} from 'react';
import SetNotif from './SetNotif.jsx';
import SetBalance from './SetBalance.jsx';
import AccountInfo from './AccountInfo.jsx';

class NavBar extends Component {
    render() {
        return (
            <div className='navBar'>                
                <SetNotif />
                <SetBalance />
                <AccountInfo />
                <div className='barItem'>
                    <a href='#'><i className="material-icons">exit_to_app</i></a>
                </div>
            </div>
        );
    }
}

export default NavBar;