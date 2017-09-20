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
              '#ff0000',
                '#002080',
                '#ffff1a',
                      '#009933',
                      '#FFCE56',
                      '#cc65fe'
                  ],
                  borderColor:[
                      '#FFFFFF',
                      '#FFFFFF',
                      '#FFFFFF',
                      '#FFFFFF',
                      '#FFFFFF',
                      '#FFFFFF',
                      
                  ]
          }]
        }
      }
  }

export default MainChart;
