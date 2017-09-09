import React, {Component} from 'react';
import {Line} from 'react-chartjs-2';

class RightChart extends Component {

	  constructor(props){
  	super(props);
  	this.state = {
  		chartData:{
  			labels: [],
  			datasets:[{
  				data:[],
  				backgroundColor:[
  				  '#FF6384',
  				],
  				label: 'Bitcoin'
  			}]
  		}
  	}
  }

  componentDidMount() {
    fetch(`http://www.coincap.io/history/365day/BTC`) 
      .then(result => {
      	return result.json()
      })
      .then(coins => {
      	let dayValues = coins.price.map(coin => {
          return coin[1]
      	})
      	let dayIndex = coins.price.map((coin, index) => {
          return index + 1
        })
        let newChartData = this.state.chartData

      	newChartData.labels = dayIndex
        newChartData.datasets[0].data = dayValues
      	this.setState({chartData: newChartData})
      })
    }

    render() {
        return (
            <div className='rightChart'>
              <Line
								data={this.state.chartData}
							/>
            </div>
        );
    }
}

export default RightChart;