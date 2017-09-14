import React, {Component} from 'react';
import {Doughnut} from 'react-chartjs-2';
import App from './App.jsx'

class LeftChart extends Component {

  constructor(props){
  	super(props);
  }

  render() {

      return (
          <div className='leftChart'>
            <h1>Left Chart</h1>
            <Doughnut 
              data={this.buildChartData()}              
              width={0}
              height={0}
              options={{
                  maintainAspectRatio: false
              }}
            />
          </div>
      );
  }

  buildChartData = () => {
    let coinIDs = this.props.chartData.map(coin => {
      return coin.name
    });

    let marketCap = this.props.chartData.map(coin => {
      return coin.market_cap_usd / 100 / 1000
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
                      '#33FF39'
                  ],
                  borderColor:[
                      '#f5f5f5', 
                      '#f5f5f5', 
                      '#f5f5f5', 
                      '#f5f5f5', 
                      '#f5f5f5'
                  ]
          }]
        }
      }
  }

export default LeftChart;
