import React, {Component} from 'react';

class WelcomeMessage extends Component {
   render() {
   	let totalChange = 0
   	let userChange = this.props.userChange.map(coin => {
   		totalChange += coin.change
   	})
       return (
           <div className='welcomeMessage'>
               <h1>Welcome {this.props.currentUser.name}, here is your personalized portfolio.</h1>
           </div>
       );
   }
}

export default WelcomeMessage;
