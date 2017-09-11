import React, {Component} from 'react';
import SetNotif from './SetNotif.jsx';

class NavBar extends Component {
    render() {
        return (
            <div className='navBar'>                
                <SetNotif />
                <div className='barItem'>
                    <a href='#'><i className="material-icons">attach_money</i></a>
                </div>
                <div className='barItem'>
                    <a href='#'><i className="material-icons">account_circle</i></a>
                </div>
                <div className='barItem'>
                    <a href='#'><i className="material-icons">exit_to_app</i></a>
                </div>
            </div>
        );
    }
}

export default NavBar;