import React, {Component} from 'react';

class MainInfo extends Component {
    render() {
    	const userCoinInfo = this.props.userCoinInfo
    	let coinListTotal = 0

    	const coinList = userCoinInfo.map((coin, index) => {
        coinListTotal += coin.totalCAD
    		return <p className='tickerInfo' key={index}>{coin.coin}  |  {coin.amount}  |  CAD ${coin.totalCAD}</p>
    	})
        return (
            <div className='mainInfo'>
                <p>{this.props.userInfo.username}'s Coins</p>
                <p>Coin | Amount | Total</p>
                {coinList}
                <p>-----------</p>
                <p>Total: ${coinListTotal}</p>
            </div>
        );
    }
}

export default MainInfo;