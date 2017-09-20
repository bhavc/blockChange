import React, {Component} from 'react';
import Ping from './ping.jsx';
import SideBar from './SideBar.jsx'

class Ticker extends Component {


    render () {
        const tickerChange = this.props.tickerInfo || []
        const tickerList = tickerChange.map((coin, index) => {
           let tickerBox 
           if (coin.percent.charAt(0) === "-") {
                tickerBox = <div className='tickerDown'></div>
            } else {
                tickerBox = <div className='tickerUp'></div> 
            }
           return <div className='ticker clearfix' key={index}>
                    {tickerBox}
                    <p className='tickerInfo'>{coin.name} &nbsp;<span className='divider'>|</span><span className='tickerValues'><span className='coinPercent'>{coin.percent}%</span>
                    
                    
                    
                    <div className='news'>
                        <ul>
                            <li><span className='tickerPrice'><span className='tickerText'>PRICE </span>${coin.price.toFixed(2)}</span></li>
                            <li><span className='tickerPrice'><span className='tickerText'>CHANGE </span>${coin.change.toFixed(2)}</span></li>
                            <li><span className='tickerPrice'><span className='tickerText'>HIGH </span>${coin.high.toFixed(2)}</span></li>
                            <li><span className='tickerPrice'><span className='tickerText'>LOW </span>${coin.low.toFixed(2)}</span></li>
                        </ul>
                    </div>

                    </span></p>
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