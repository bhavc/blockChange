import React, {Component} from 'react';

class ActiveAlertListItem extends Component {
    render() {
    	const userNotifications = this.props.userNotifications

    	const notificationList = userNotifications.map((notification, index) => {
    		return <p className='notification' key={index}>{notification.coin} from ${notification.current_value} to ${notification.final_value}</p>
    	})
        return (
            <div>
              {notificationList}
            </div>
        );
    }
}

export default ActiveAlertListItem;