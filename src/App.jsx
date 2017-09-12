import React, {Component} from 'react';
import MainChart from './MainChart.jsx';
import LeftChart from './LeftChart.jsx';
import RightChart from './RightChart.jsx';
import BottomChart from './BottomChart.jsx';
import SideBar from './SideBar.jsx';
import NavBar from './NavBar.jsx';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'

class App extends Component {


  render() {
    return (
      <MuiThemeProvider>
      <div className='wrapper'>
        <NavBar />
        <MainChart />
        <LeftChart />
        <RightChart />
        <BottomChart />
        <SideBar />
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
  }
}
export default App;
