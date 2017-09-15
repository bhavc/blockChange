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
                    <p className='tickerInfo'>{coin.name} | {coin.percent}%</p>
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