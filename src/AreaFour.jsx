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
              '#adebad',
              '#248f24',
              '#70db70',
                      '#33cc33',
                      '#2eb82e',
                      '#0f3d0f',
                      '#ebfaeb',


                      '#0a290a',
                      '#c2f0c2',
                      '#47d147'

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
