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

  redditApi = () => {

    fetch(`https://www.reddit.com/r/CryptoCurrency/hot.json?sort=hot&limit=10`)
      .then(result => {
          return result.json()
      })
      .then(threads => {
        let parsedThreads = []
        threads.data.children.forEach((thread) => {
          parsedThreads.push(thread.data)
        })
        this.setState({reddit: parsedThreads})
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
        this.setState({liveValues: currentValues}, this.getUserCoins)
      })

  }

  setUserCoins = (coins) => {
    this.postUserCoins(coins)
  }

  postUserCoins = (coins) => {

    coins.map((coin) => {
      fetch('http://localhost:3001/usercoins', {
        method: 'POST',
        body: JSON.stringify(coin),
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
        .then(this.getUserCoins)
    })
  }

  getUserCoins = () => {

    fetch('http://localhost:3001/usercoins')
    .then(result => {
      return result.json()
    })
    .then((coins) => {
      let liveValues = this.state.liveValues
      let newUserCoins = []
      let newCoinValue = 0
      let userCoin = {}
      coins.forEach((coin) => {
        liveValues.forEach((value) => {
          if (coin.coin === value.name) {
            userCoin.coin = coin.coin
            userCoin.quantity = coin.quantity
            userCoin.price = value.price
            userCoin.total = Math.round((coin.quantity * value.price) * 100) / 100
            newCoinValue += userCoin.total
            newUserCoins.push(userCoin)
            userCoin = {}
          }
        })
      })
      this.setState({userCoins: newUserCoins, totalCoinValue: newCoinValue})
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
      },
      userCoins: [],
      totalCoinValue: 0,
      topCoins: [],
      liveValues: [],
      reddit: []

  }

  this.state = appState

  }

  componentDidMount() {

    this.coinMarketCapApi()
    this.redditApi()
    this.getUserCoins()

  }


  render() {
    return (
      <MuiThemeProvider>
      <div className='wrapper'>
        <NavBar userInfo={this.state.currentUser} postUserCoins={this.postUserCoins} liveCoinValues={this.state.liveValues}/>
        <WelcomeMessage />
        <MainChart chartData={this.state.userCoins}/>
        <MainInfo userCoinInfo={this.state.userCoins} userInfo={this.state.currentUser} totalCoinValue={this.state.totalCoinValue}/>
        <LeftChart chartData={this.state.topCoins}/>
        <LeftChartMessage />
        <RightChart />
        <RightChartMessage />
        <BottomChart reddit={this.state.reddit}/>
        <SideBar tickerInfo={this.state.liveValues}/>
      </div>
      </MuiThemeProvider>
    );
  }
}

export default App;
