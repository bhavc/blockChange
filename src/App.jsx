import React, {Component} from 'react';
import MainChart from './MainChart.jsx';
import LeftChart from './LeftChart.jsx';
import RightChart from './RightChart.jsx';
import BottomChart from './BottomChart.jsx';
import SideBar from './SideBar.jsx';

class App extends Component {


  render() {
    return (
      <div className='wrapper'>
        <MainChart />
        <LeftChart />
        <RightChart />
        <BottomChart />
        <SideBar />
      </div>
    );
  }
}
export default App;
