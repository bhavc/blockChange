import React, {Component} from 'react';
import MainChart from './MainChart.jsx';
import WelcomeMessage from './WelcomeMessage.jsx';
import MainInfo from './MainInfo.jsx';
import LeftChart from './LeftChart.jsx';
import LeftChartMessage from './leftChartMessage.jsx';
import RightChartMessage from './rightChartMessage.jsx';
import RightChart from './RightChart.jsx';
import BottomChart from './BottomChart.jsx';
import SideBar from './SideBar.jsx';
import NavBar from './NavBar.jsx';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'

class App extends Component {

  coinMarketCapApi = () => {

    fetch(`https://api.coinmarketcap.com/v1/ticker/?limit=10`)
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
          tickerObj.percent = coins.DISPLAY[key].CAD.CHANGEPCT24HOUR;
          tickerObj.price = coins.RAW[key].CAD.PRICE;
          currentValues.push(tickerObj)
          tickerObj = {}
        }
        this.setState({liveValues: currentValues})
      })
  }

  setUserCoins = (coins) => {
    let newUserCoins = this.state.currentUser.usercoins.concat(coins)
    this.setState({currentUser: {
      userId: this.state.currentUser.userId,
      username: this.state.currentUser.username,
      useremail: this.state.currentUser.useremail,
      usercoins: newUserCoins
      }
    }, this.postUserCoins)
  }

  postUserCoins = () => {
    fetch('http://localhost:3001/usercoins', {
      method: 'POST',
      body: JSON.stringify(this.state.currentUser),
      headers: {
        'Content-Type': "application/json"
      },
      credentials: 'omit'
      })
      .then((response) => {
        return response.text()
      },
      (error) => {
      error.message
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
        userId: 1,
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
        <NavBar userEmail={this.state.currentUser.useremail} setUserCoins={this.setUserCoins} liveCoinValues={this.state.liveValues}/>
        <WelcomeMessage />
        <MainChart chartData={this.state.currentUser}/>
        <MainInfo userInfo={this.state.currentUser}/>
        <LeftChart chartData={this.state.topCoins}/>
        <LeftChartMessage />
        <RightChart />
        <RightChartMessage /> 
        <BottomChart />
        <SideBar tickerInfo={this.state.liveValues}/>
      </div>
      </MuiThemeProvider>
    );
  }
}

export default App;
