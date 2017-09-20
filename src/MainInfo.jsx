import React, {Component} from 'react';

class MainInfo extends Component {
    render() {
    	const userCoinInfo = this.props.userCoinInfo

    	const coinList = userCoinInfo.map((coin, index) => {
    		return  <tr className='infoTicker' key={index}>
                        <th className='tableItem'>{coin.coin}</th>
                        <th className='tableItem'>{coin.quantity}</th>
                        <th className='tableItem'>${coin.total}</th>
                    </tr>
    	})
        return (
            <div className='mainInfo'>
                <h3 className='infoName'>Your Coins: </h3>
                <p className='infoTitle'>Coin <span className='divider'>|</span> Amount <span className='divider'>|</span> Total</p>
                <table className='coinListTable'>
                    <tr>
                        <th>Coin | </th>
                        <th>Total | </th>
                        <th>Amount</th>
                    </tr>
                    {coinList}
                </table>
                <p className='infoTotal'>Total: ${Math.round(this.props.totalCoinValue * 100) / 100}</p>
            </div>
        );
    }
}

export default MainInfo;
