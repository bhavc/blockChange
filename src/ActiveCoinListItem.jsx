import React, {Component} from 'react';

class ActiveCoinListItem extends Component {
    render() {
    	let userCoins = this.props.userCoins
    	let userCoinList = userCoins.map((coin, index) => {

    	  return  <div className='activeCoinListItem' key={index}>
				          <p>{coin.coin}</p>
				          <p>{coin.amount}</p>
				          <p>CAD</p>
                </div>
    	})
      return (
        <div>
          {userCoinList}
        </div>
        );
    }
}

export default ActiveCoinListItem;