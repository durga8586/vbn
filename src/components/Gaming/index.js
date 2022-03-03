import {Component} from 'react'
import Header from '../Header'

import './index.css'
import SideNav from '../SideNav'
import GamingContent from '../GamingContent'
import Context from '../../Context/Context'
// import Context from '../../Context/Context'

class Gaming extends Component {
  render() {
    return (
      <Context.Consumer>
        {value => {
          const {lightTheme} = value

          const fontColor = lightTheme ? 'white' : 'black'

          return (
            <div className={`home ${fontColor}`} data-testid="gaming">
              <Header />
              <div className="fr">
                <SideNav />
                <GamingContent />
              </div>
            </div>
          )
        }}
      </Context.Consumer>
    )
  }
}

export default Gaming
