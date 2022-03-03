import {Component} from 'react'
import Header from '../Header'

import './index.css'
import SideNav from '../SideNav'
import SavedVideosContent from '../SavedVideosContent'
import Context from '../../Context/Context'
// import Context from '../../Context/Context'

class SavedVideos extends Component {
  render() {
    return (
      <Context.Consumer>
        {value => {
          const {lightTheme} = value

          const fontColor = lightTheme ? 'white' : 'black'

          return (
            <div className={`home ${fontColor}`} data-testid="savedVideos">
              <Header />
              <div className="fr">
                <SideNav />
                <SavedVideosContent />
              </div>
            </div>
          )
        }}
      </Context.Consumer>
    )
  }
}

export default SavedVideos
