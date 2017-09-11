import React, {Component} from 'react';
import Ping from './ping.jsx';
import NewNotif from './newnotif.jsx';

class Ticker extends Component {

    constructor(props){
        super(props);
        this.state = {
            ticker:[]
        }
    }
    
    componentDidMount() {
        fetch(`https://api.coinmarketcap.com/v1/ticker/?limit=10`)
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
           return <div className='ticker' key={index}><p className='tickerHeader'><NewNotif />{coin.symbol} | {coin.change}%</p><Ping /></div>
        })
        return (
            <div>
                {tickerList}
            </div>
        );
    }
}

export default Ticker;