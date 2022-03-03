import {Component} from 'react'
import Context from '../../Context/Context'
import Header from '../Header'
import SideNav from '../SideNav'
import VideoPlayerContent from '../VideoPlayerContent'

class VideoPlayer extends Component {
  render() {
    const {match} = this.props
    const {params} = match
    const {id} = params
    return (
      <Context.Consumer>
        {value => {
          const {lightTheme} = value

          const fontColor = lightTheme ? 'white' : 'black'

          return (
            <div className={`home ${fontColor}`} data-testid="videoItemDetails">
              <Header />
              <div className="fr">
                <SideNav />
                <VideoPlayerContent id={id} />
              </div>
            </div>
          )
        }}
      </Context.Consumer>
    )
  }
}

export default VideoPlayer
