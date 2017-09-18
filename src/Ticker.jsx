import React, {Component} from 'react';
import Ping from './ping.jsx';
import SideBar from './SideBar.jsx'

class Ticker extends Component {
    render () {
        const tickerChange = this.props.tickerInfo || []
        const tickerList = tickerChange.map((coin, index) => {
            return <TickerItem coin={coin} key={index} />;
        })
        return (
            <div>
                {tickerList}
            </div>
        );
    }
}

class TickerItem extends Component {
    constructor(props) {
        super(props);

        this.state = {
            showPrice: false
        };
    }

    render() {
        let { coin } = this.props;
        let tickerBox 
        if (coin.percent.charAt(0) === "-") {
            tickerBox = <div className='tickerDown'></div>
        } else {
            tickerBox = <div className='tickerUp'></div> 
        }
        return (
            <div className='ticker clearfix' onMouseEnter={this._togglePrice(true)} onMouseLeave={this._togglePrice(false)}>
                {tickerBox}
                <p className='tickerInfo'>
                    {coin.name} &nbsp;
                    <span className='tickerValues'>
                        <span className='coinPercent'>{coin.percent}%</span>
                        <br />    
                        { this._showPrice() }            
                    </span>
                </p>
            </div>
        );
    }

    _showPrice = () => {
        if (this.state.showPrice) {
            let {coin} = this.props;
            return <span className='tickerPrice'>${coin.price.toFixed(2)}</span>;
        } else {
            return null;
        }
    }

    _togglePrice = (toggle) => () => {
        this.setState({showPrice: toggle});
    }
}
export default Ticker;