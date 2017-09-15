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

  coinMarketCapApi = () => {

    fetch(`https://api.coinmarketcap.com/v1/ticker/?limit=25`)
    .then(result => {
        return result.json()
    })
    .then(coins => {
        let newCoins = coins
        this.setState({topCoins: newCoins})
        this.liveTicker()
    })
  }

  liveTicker = () => {
    
    let currentTickers = ''
    let activeTickers = []
    this.state.topCoins.forEach((coin) => {
      let symbol = coin.symbol

      if (symbol === 'MIOTA') {
        symbol = 'IOT'
      }

      activeTickers.push(symbol);
      currentTickers = activeTickers.toString()
    })

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
  }

  setUserCoins = (coins) => {
    this.setState({currentUser: {
      username: this.state.currentUser.username,
      useremail: this.state.currentUser.useremail,
      usercoins: coins
      }
    })
  }

  constructor(props) {
    super(props);
    fetch('//localhost:3001/notification', {
      accept: 'application/json',
    })
    .then((res) => {})

  let appState = {

      currentUser: {
        username: 'bhav',
        useremail: 'bhavdip.dev@gmail.com',
        usercoins: []
      },
      topCoins: [],
      liveValues: []

  }

  this.state = appState

  }

  componentDidMount() {  

    this.coinMarketCapApi()

  }

  render() {
    return (
      <MuiThemeProvider>
      <div className='wrapper'>
        <NavBar userEmail={this.state.currentUser.useremail} setUserCoins={this.setUserCoins}/>
        <MainChart />
        <MainInfo />
        <LeftChart chartData={this.state.topCoins}/>
        <RightChart />
        <BottomChart />
        <SideBar tickerInfo={this.state.liveValues}/>
      </div>
      </MuiThemeProvider>
    );
  }
}

export default App;