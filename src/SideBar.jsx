import React, {Component} from 'react';
import Ticker from './Ticker.jsx';

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
            </div>
        );
    }
}

export default SideBar;