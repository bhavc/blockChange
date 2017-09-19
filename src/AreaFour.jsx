import React, {Component} from 'react';
import {Bar} from 'react-chartjs-2';
import App from './App.jsx'
 
class AreaFour extends Component {
 
  constructor(props){
    super(props);
  }
 
  render() {
 
      return (
          <div className='areaFour'>
            <Bar
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
 
    this.props.topCoins.forEach((coin, index) => {
        coinIDs.push(coin.name)
    });
 
    let volume = []
 
    this.props.topCoins.forEach((coin, index) => {
        volume.push(coin['24h_volume_usd'])
    })
 
    return {
          labels: coinIDs,
          datasets:[{
            data: volume,
            label: '24 Hour Volume',
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
 
export default AreaFour;