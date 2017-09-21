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

    let userColours = this.props.chartData.map((coin) => {
      return '#'+(Math.random()*0xFFFFFF<<0).toString(16)
    })

    let userBorder = this.props.chartData.map((coin) => {
      return '#000000'
    })

    return {
          labels: coinIDs,
          datasets:[{
            data: marketCap,
            backgroundColor:[

              '#FF5733',

              '#581845',
              '#900C3F',
              '#FFC300',
              '#C70039',
                '#FF6384',
                  ],



            borderColor: userBorder
          }]
        }
      }
  }

export default AreaTwo;
