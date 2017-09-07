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
  				data:[
  				  1000000,
  				  500000,
  				  250000
  				],
  				backgroundColor:[
  				  '#FF6384',
            '#36A2EB',
            '#FFCE56'
  				]
  			}]
  		}
  	}
  }

  componentDidMount() {
    fetch(`https://api.coinmarketcap.com/v1/ticker/?limit=10`) 
      .then(result => {
      	return result.json()
      })
      .then(coins => {
      	console.log('$$$$$$$$$$$$$$', coins)
      	let coinIDs = coins.map(coin => {
      		return coin.id
      	});
      	let newChartData = this.state.chartData
      	newChartData.labels = coinIDs
      	this.setState({chartData: newChartData})
      })
      .catch(() => {
      })
    }

    render() {
        return (
            <div className='leftChart'>
            <div>{this.state.coins.map(item=><li key={coins.id}>{coins.id}</li>)}</div>
              <Doughnut
								data={this.state.chartData}
							/>
            </div>
        );
    }
}

export default LeftChart;