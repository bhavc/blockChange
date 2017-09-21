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

    let userColours = this.props.chartData.map((coin) => {
      return '#'+(Math.random()*0xFFFFFF<<0).toString(16)
    })

    let userBorder = this.props.chartData.map((coin) => {
      return '#1B1E24'
    })
    return {
          labels: userCoinIDs,
          datasets:[{
            data: userTotal,
            backgroundColor:[
                  '#a7d6ea',
                  '#67aadf',
                      '#45a889',
                      '#8081b9',
                      '#125b9f',
                  ],
            borderColor: userBorder
          }]
        }
      }
  }

export default MainChart;
