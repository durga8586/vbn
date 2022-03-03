import './index.css'
import Context from '../../Context/Context'
import Header from '../Header'
import SideNav from '../SideNav'

const NotFound = () => (
  <Context.Consumer>
    {value => {
      const {lightTheme} = value

      const imageUrl = lightTheme
        ? 'https://assets.ccbp.in/frontend/react-js/nxt-watch-not-found-light-theme-img.png'
        : 'https://assets.ccbp.in/frontend/react-js/nxt-watch-not-found-dark-theme-img.png'

      return (
        <div>
          <Header />
          <div className="fr">
            <SideNav />
            <div className="not-found-container">
              <img src={imageUrl} alt="not found" className="not-found-img" />
              <h1>Page Not Found</h1>
              <p>we are sorry, the page you requested could not be found.</p>
            </div>
          </div>
        </div>
      )
    }}
  </Context.Consumer>
)

export default NotFound
