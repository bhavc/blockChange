import React, {Component} from 'react';

class MainInfo extends Component {
    render() {
    	const userCoinInfo = this.props.userCoinInfo

    	const coinList = userCoinInfo.map((coin, index) => {
    		return <p className='infoTicker' key={index}>{coin.coin}  |  {coin.quantity}  |  CAD ${coin.total}</p>
    	})
        return (
            <div className='mainInfo'>
                <h3 className='infoName'>Dave's Coins</h3>
                <p className='infoTitle'>Coin <span className='divider'>|</span> Amount <span className='divider'>|</span> Total</p>
                {coinList}
                <p className='infoTotal'>Total: ${Math.round(this.props.totalCoinValue * 100) / 100}</p>
            </div>
        );
    }
}

export default MainInfo;