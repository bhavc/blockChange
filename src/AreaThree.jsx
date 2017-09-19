import React, {Component} from 'react';

class AreaThree extends Component {
    render() {
    	const liveValues = this.props.liveValues
    	let liveValuesList = liveValues.map((coin, index) => {
    		return <span className='marketPriceList' key={index}>
    		          <p>----------</p>
				          <p>High: {coin.high}</p>
				          <p>{coin.name} | {coin.open}</p>
				          <p>Low: {coin.low}</p>
				          <p>----------</p>
                </span>
    	})
        return (
                <div className='areaThree'>
                    {liveValuesList}
                </div>
        );
    }
}

export default AreaThree;