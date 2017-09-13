import React, {Component} from 'react';
import Ping from './ping.jsx';
import SideBar from './SideBar.jsx'

class Ticker extends Component {

    render () {
        const currentTicker = this.props.tickerInfo
        const tickerList = currentTicker.map((coin, index) => {
           let tickerBox 
           if (coin.percent_change_24h.charAt(0) === "-") {
                tickerBox = <div className='tickerDown'></div>
            } else {
                tickerBox = <div className='tickerUp'></div> 
            }
           return <div className='ticker clearfix' key={index}>
                    {tickerBox}
                    <p className='tickerInfo'>{coin.symbol} | {coin.percent_change_24h}%</p>
                  </div>
        })
        return (
            <div>
                
                {tickerList}
            </div>
        );
    }
}

export default Ticker;