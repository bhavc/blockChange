import React, {Component} from 'react';
import Ticker from './Ticker.jsx';
import NotifForm from './notifform.jsx'

class SideBar extends Component {

    disableScroll = (e) => {
        document.body.style.overflow = 'hidden'
    }
    enableScroll = (e) => {
        document.body.style.overflow='auto'
    }
    render() {
        return (
            <div className='sideBar' onMouseOver={this.disableScroll} onMouseOut={this.enableScroll}>
                <Ticker />
                {/* <NotifForm /> */}
            </div>
        );
    }
}

export default SideBar;