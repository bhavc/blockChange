import React, {Component} from 'react';
import {Pie} from 'react-chartjs-2';
import App from './App.jsx'

class AreaTwo extends Component {

  constructor(props){
    super(props);
  }

  render() {

      return (
          <div className='areaTwo'>
            <Pie
              data={this.buildChartData()}
              width={0}
              height={0}
              options={{
                  maintainAspectRatio: false,
                  legend: {
                    display: true,
                    position: 'right',
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
      if (index < 5) {
        marketCap.push(coin.market_cap_usd / 100 / 1000)
      }
    })

    return {
          labels: coinIDs,
          datasets:[{
            data: marketCap,
            backgroundColor:[
                '#0044cc',
                      '#e60000',
                      '#FFCE56',
                      '#00e64d',
                      '##00e64d',

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

export default AreaTwo;
