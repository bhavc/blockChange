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
      fetch(`https://api.coinmarketcap.com/v1/ticker/?limit=10`)
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
        <SideBar tickerInfo={this.state.topCoins}/>
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
