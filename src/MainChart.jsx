import React, {Component} from 'react';
import {Doughnut} from 'react-chartjs-2';
import App from './App.jsx'

class MainChart extends Component {

  constructor(props){
  	super(props);
  }

  render() {

      return (
          <div className='mainChart'>
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
    let userCoinIDs = this.props.chartData.map(coin => {
      return coin.coin
    });

    let userTotal = this.props.chartData.map(coin => {
      return coin.total
    })

    return {
          labels: userCoinIDs,
          datasets:[{
            data: userTotal,
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

export default MainChart;