import React, {Component} from 'react';
import {Pie} from 'react-chartjs-2';
import App from './App.jsx'

class LeftChart extends Component {

  constructor(props){
  	super(props);
  }

  render() {

      return (
          <div className='leftChart'>
            <Pie
              data={this.buildChartData()}
              width={0}
              height={0}
              options={{
                  maintainAspectRatio: false,
                  legend: {
              			labels: {
                  		fontColor: "white",
              			}
          				}
              }}
            />
          </div>
      );
  }

  buildChartData = () => {


    let coinIDs = []

    this.props.chartData.forEach((coin, index) => {
      if (index < 5) {
        coinIDs.push(coin.name)
      }
    });

    let marketCap = []

    this.props.chartData.forEach((coin, index) => {
      if (index < 4) {
        marketCap.push(coin.market_cap_usd / 100 / 1000)
      }
    })

    return {
          labels: coinIDs,
          datasets:[{
            data: marketCap,
            backgroundColor:[
                '#FF6384',
                      '#36A2EB',
                      '#FFCE56',
                      '#cc65fe',
                      '#33FF39',
                      '#36A2EB',
                      '#FFCE56',
                      '#cc65fe',
                      '#33FF39',
                      '#cc65fe'
                  ],
                  borderColor:[
                      '#252830',
                      '#252830',
                      '#252830',
                      '#252830',
                      '#252830',
                      '#252830',
                      '#252830',
                      '#252830',
                      '#252830',
                      '#252830'
                  ]
          }]
        }
      }
  }

export default LeftChart;
