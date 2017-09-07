import React, {Component} from 'react';

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
                <div className='ticker'>
                    <p>BTC | <span id='btcTicker'>0.00</span></p>
                </div>
                <div className='ticker'>
                    <p>ETH | <span id='ethTicker'>0.00</span></p>
                </div>
                <div className='ticker'>
                    <p>BCH | <span id='bchTicker'>0.00</span></p>
                </div>
                <div className='ticker'>
                    <p>XRP | <span id='xrpTicker'>0.00</span></p>
                </div>
                <div className='ticker'>
                    <p>LTC | <span id='ltcTicker'>0.00</span></p>
                </div>
                <div className='ticker'>
                    <p>XEM | <span id='xemTicker'>0.00</span></p>
                </div>
                <div className='ticker'>
                    <p>DASH | <span id='dashTicker'>0.00</span></p>
                </div>
                <div className='ticker'>
                    <p>IOTA | <span id='iotaTicker'>0.00</span></p>
                </div>
                <div className='ticker'>
                    <p>XMR | <span id='xmrTicker'>0.00</span></p>
                </div>
                <div className='ticker'>
                    <p>ETC | <span id='etcTicker'>0.00</span></p>
                </div>
            </div>
        );
    }
}

export default SideBar;