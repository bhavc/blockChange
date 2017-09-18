import React, {Component} from 'react';

class MainInfo extends Component {
    render() {
    	const userCoinInfo = this.props.userCoinInfo

    	const coinList = userCoinInfo.map((coin, index) => {
    		return <p className='tickerInfo' key={index}>{coin.coin}  |  {coin.quantity}  |  CAD ${coin.total}</p>
    	})
        return (
            <div className='mainInfo'>
                <p>{this.props.userInfo.username}'s Coins</p>
                <p>Coin | Amount | Total</p>
                {coinList}
                <p>-----------</p>
                <p>Total: ${this.props.totalCoinValue}</p>
            </div>
        );
    }
}

export default MainInfo;