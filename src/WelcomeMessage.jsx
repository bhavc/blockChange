import React, {Component} from 'react';

class WelcomeMessage extends Component {
   render() {
       return (
           <div className='welcomeMessage'>
               <h1>Welcome {this.props.currentUser.username}, to your personalized portfiolio</h1>
           </div>
       );
   }
}

export default WelcomeMessage;
