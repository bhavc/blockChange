import React, {Component} from 'react';

class AreaThree extends Component {
    render() {
    	const liveValues = this.props.liveValues

    	let rowNames = liveValues.map((coin, index) => {
    		return <th key={index} >{coin.name}</th>
    	})
    	let rowHighs = liveValues.map((coin, index) => {
    		return <th key={index} >${Math.round(coin.high * 100) / 100}</th>
    	})
    	let rowOpens = liveValues.map((coin, index) => {
    		return <th key={index} >${Math.round(coin.open * 100) / 100}</th>
    	})
    	let rowLows = liveValues.map((coin, index) => {
    		return <th key={index} >${Math.round(coin.low * 100) / 100}</th>
    	})
        return (
                <div className='areaThree'>
                  <table>
                    <tr>
                      <th>
                        Coin
                      </th>
                      {rowNames}
                    </tr>
                    <tr>
                      <th>
                        High
                      </th>
                      {rowHighs}
                    </tr>
                    <tr>
                      <th>
                        Open
                      </th>
                      {rowOpens}
                    </tr>
                    <tr>
                      <th>
                        Low
                      </th>
                      {rowLows}
                    </tr>
                  </table>
                </div>
        );
    }
}

export default AreaThree;