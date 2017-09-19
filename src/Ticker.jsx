import React, {Component} from 'react';
import Ping from './ping.jsx';
import SideBar from './SideBar.jsx'

class Ticker extends Component {

    // componentDidMount() {
        
    //         $(this.ticker).hover(function () {
    //             $(this.tickerPrice).slideToggle("fast");
    //         });
        
    // }


    render () {
        const tickerChange = this.props.tickerInfo || []
        const tickerList = tickerChange.map((coin, index) => {
           let tickerBox 
           if (coin.percent.charAt(0) === "-") {
                tickerBox = <div className='tickerDown'></div>
            } else {
                tickerBox = <div className='tickerUp'></div> 
            }
           return <div className='ticker clearfix' ref={(div) => { this.ticker = div } } key={index}>
                    {tickerBox}
                    <p className='tickerInfo'>{coin.name} &nbsp;<span className='tickerValues'><span className='coinPercent'>{coin.percent}%</span><br /><span className='tickerPrice' ref={(tickerPrice) => {this.tickerPrice = tickerPrice }}> ${coin.price.toFixed(2)}</span></span></p>
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