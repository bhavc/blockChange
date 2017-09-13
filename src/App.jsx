import React, {Component} from 'react';
import MainChart from './MainChart.jsx';
import LeftChart from './LeftChart.jsx';
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
    })
  }

  constructor(props) {
    super(props);
    fetch('//localhost:3001/notification', {
      accept: 'application/json',
    })
    .then((res) => {})

  let appState = {

      username: 'bhav',
      useremail: 'bhavdip.dev@gmail.com',
      topCoins: [],

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
        <NavBar userEmail={this.state.useremail}/>
        <MainChart />
        <LeftChart chartData={this.state.topCoins}/>
        <RightChart />
        <BottomChart />
        <SideBar tickerInfo={this.state.topCoins}/>
      </div>
      </MuiThemeProvider>
    );
  }
}

export default App;