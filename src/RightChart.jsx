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
  				backgroundColor:['#00BFFF'],
                label: 'Bitcoin',  
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
          let fullDate = new Date(coin[0])
          let date = fullDate.toString().substring(4, 10)

          return date
        })
        
        let newChartData = this.state.chartData
        newChartData.datasets[0].data = dayValues
        newChartData.labels = dayIndex
      	this.setState({chartData: newChartData})
      })
    }

    render() {
        return (
            <div className='rightChart'>
              <Line 
                data={this.state.chartData} 
                width={100}
                height={100}
                options={{
                    maintainAspectRatio: false,
                    scales: {
                        xAxes: [{
                                    gridLines: {
                                        color: "rgba(0, 0, 0, 0)",
                                    }
                                }],
                        yAxes: [{
                                    gridLines: {
                                        color: "rgba(0, 0, 0, 0)",
                                    }   
                                }]
                        }
                }}  
            />
            </div>
        );
    }
}

export default RightChart;