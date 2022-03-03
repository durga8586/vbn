import {Component} from 'react'
import Header from '../Header'

import './index.css'
import SideNav from '../SideNav'
import TrendingContent from '../TrendingContent'
import Context from '../../Context/Context'
// import Context from '../../Context/Context'

class Trending extends Component {
  render() {
    return (
      <Context.Consumer>
        {value => {
          const {lightTheme} = value

          const fontColor = lightTheme ? 'white' : 'black'

          return (
            <div className={`home ${fontColor}`} data-testid="trending">
              <Header />
              <div className="fr">
                <SideNav />
                <TrendingContent />
              </div>
            </div>
          )
        }}
      </Context.Consumer>
    )
  }
}

export default Trending
