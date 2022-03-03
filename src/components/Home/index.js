import {Component} from 'react'
import Header from '../Header'

import './index.css'
import SideNav from '../SideNav'
import HomeContent from '../HomeContent'
import Context from '../../Context/Context'
// import Context from '../../Context/Context'

class Home extends Component {
  render() {
    return (
      <Context.Consumer>
        {value => {
          const {lightTheme} = value

          const fontColor = lightTheme ? 'white' : 'black'

          return (
            <div className={`home ${fontColor}`}>
              <Header />
              <div className="fr">
                <SideNav />
                <HomeContent />
              </div>
            </div>
          )
        }}
      </Context.Consumer>
    )
  }
}

export default Home
