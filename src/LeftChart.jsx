import React, {Component} from 'react';
import {Doughnut} from 'react-chartjs-2';

class LeftChart extends Component {

  constructor(props){
  	super(props);
  	this.state = {
  		coins:[],
  		chartData:{
  			labels: [],
  			datasets:[{
  				data:[],
  				backgroundColor:[
  				  '#FF6384',
            '#36A2EB',
            '#FFCE56',
            '#cc65fe',
            '#33FF39'
                  ],
  			}]
  		}
  	}
  }

  componentDidMount() {
    fetch(`https://api.coinmarketcap.com/v1/ticker/?limit=5`)
      .then(result => {
      	return result.json()
      })
      .then(coins => {
      	let coinIDs = coins.map(coin => {
      		return coin.name
      	});
      	let marketCap = coins.map(coin => {
      		return coin.market_cap_usd
      	})

      	let newChartData = this.state.chartData
      	newChartData.labels = coinIDs
        newChartData.datasets[0].data = marketCap
      	this.setState({chartData: newChartData})

      })
      .catch(() => {
      })
    }

    render() {
        return (
            <div className='leftChart'>
              <Doughnut style="maintainAspectRatio: false" data={this.state.chartData} />
            </div>
        );
    }
}

export default LeftChart;
