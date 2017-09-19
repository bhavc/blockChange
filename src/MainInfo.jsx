import React, {Component} from 'react';

class MainInfo extends Component {
    render() {
    	const userCoinInfo = this.props.userCoinInfo

    	const coinList = userCoinInfo.map((coin, index) => {
    		return  <tr className='infoTicker' key={index}>
                        <th>{coin.coin}</th>
                        <th>{coin.quantity}</th>
                        <th>CAD ${coin.total}</th>
                    </tr>
    	})
        return (
            <div className='mainInfo'>
                <h3 className='infoName'>Dave's Coins</h3>
                <table>
                <p className='infoTitle'>Coin <span className='divider'>|</span> Amount <span className='divider'>|</span> Total</p>
                {coinList}
                </table>
                <p className='infoTotal'>Total: ${Math.round(this.props.totalCoinValue * 100) / 100}</p>
            </div>
        );
    }
}

export default MainInfo;