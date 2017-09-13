import React, {Component} from 'react';
import Ping from './ping.jsx';

class Ticker extends Component {

    constructor(props){
        super(props);
        this.state = {
            ticker:[]
        }
    }
    
    componentDidMount() {
        fetch(`https://api.coinmarketcap.com/v1/ticker/?limit=25`)
        .then(result => {
            return result.json()
        })
        .then(coins => {
            let tickerObj = {}
            let newTicker = []
            coins.map(coin => {
                tickerObj.symbol = coin.symbol
                tickerObj.change = coin.percent_change_24h
                newTicker.push(tickerObj)
                tickerObj = {}
                return newTicker
            })
            this.setState({ticker: newTicker})

        })
    }

    render () {
        const currentTicker = this.state.ticker
        const tickerList = currentTicker.map((coin, index) => {
           let tickerBox 
           if (coin.change.charAt(0) === "-") {
                tickerBox = <div className='tickerDown'></div>
            } else {
                tickerBox = <div className='tickerUp'></div> 
            }
           return <div className='ticker clearfix' key={index}>
                    {tickerBox}
                    <p className='tickerInfo'>{coin.symbol} | {coin.change}%</p>
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