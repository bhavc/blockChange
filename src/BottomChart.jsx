import React, {Component} from 'react';

class BottomChart extends Component {
   render() {
        const redditList = this.props.reddit.map((thread, index) => {
           return <div className='reddit clearfix' key={index}>
                    <p className='redditThread'><img src={thread.thumbnail} height='40' width='40' /> {thread.ups} | <a href={'https://www.reddit.com' + thread.permalink} target="_blank">{thread.title}</a></p>
                  </div>
        })
        return (
            <div className='bottomChart'>
                {redditList}
            </div>
        );
   }
}


export default BottomChart;
