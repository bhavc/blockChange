import React, {Component} from 'react';

class AreaFive extends Component {
    disableScroll = (e) => {
        document.body.style.overflow = 'hidden'
    }
    enableScroll = (e) => {
        document.body.style.overflow='auto'
    }
    render() {
        const redditList = this.props.reddit.map((thread, index) => {
           return <a href={'https://www.reddit.com' + thread.permalink} target="_blank"><div className='reddit clearfix' key={index}>
                    <p className='redditThread'><span className='redditVotes'> {thread.ups}</span><span className='divider'> | </span><a href={'https://www.reddit.com' + thread.permalink} target="_blank">{thread.title}</a></p>
                  </div></a>
        })
        return (
            <div className='areaFive' onMouseOver={this.disableScroll} onMouseOut={this.enableScroll}>
                {redditList}
            </div>
        );
   }
}

export default AreaFive;