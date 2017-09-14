import React, {Component} from 'react';
import MainChart from './MainChart.jsx';
import MainInfo from './MainInfo.jsx';
import LeftChart from './LeftChart.jsx';
import RightChart from './RightChart.jsx';
import BottomChart from './BottomChart.jsx';
import SideBar from './SideBar.jsx';
import NavBar from './NavBar.jsx';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'

class App extends Component {

  componentDidMount() {
      fetch(`https://api.coinmarketcap.com/v1/ticker/?limit=15`)
      .then(result => {
          return result.json()
      })
      .then(coins => {
          let coinObj = {}
          let newCoins = []
          coins.map(coin => {
              coinObj = coin
              newCoins.push(coinObj)
              coinObj = {}
              return newCoins
            })

            let currentTickers = '';
            let activeTickers = [];
            newCoins.forEach(function(coin) {
              let symbol = coin.symbol

              if (symbol === 'MIOTA') {
                symbol = 'IOT';
              }

              activeTickers.push(symbol);
              currentTickers = activeTickers.toString();
            });

            fetch(`https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${currentTickers}&tsyms=CAD`)
            .then(result => {
              return result.json()
            }) 
            .then(coins => {

              let tickerObj = {};
              let currentValues = []

              for (var key in coins.RAW) {
                
                tickerObj.name =  coins.RAW[key].CAD.FROMSYMBOL;
                tickerObj.value = coins.DISPLAY[key].CAD.CHANGEPCT24HOUR;
                currentValues.push(tickerObj)
                tickerObj = {}

              }
            
              this.setState({liveValues: currentValues})
              
            })
          this.setState({topCoins: newCoins})
      })
  }

  render() {
    return (
      <MuiThemeProvider>
      <div className='wrapper'>
        <NavBar userEmail={this.state.useremail}/>
        <MainChart />
        <MainInfo />
        <LeftChart />
        <RightChart />
        <BottomChart />
        <SideBar tickerValue={this.state.liveValues}/>
      </div>
      </MuiThemeProvider>
    );
  }

  constructor() {
      fetch('//localhost:3001/notification', {
        accept: 'application/json',
      })
      .then((res) => {
        console.log(res)

      })
    super();
      this.state = {
        username: 'bhav',
        useremail: 'bhavdip.dev@gmail.com',
        topCoins: []
    }
  }
}
export default App;
