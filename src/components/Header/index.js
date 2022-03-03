import {FaMoon} from 'react-icons/fa'
import Popup from 'reactjs-popup'

import {withRouter, Link} from 'react-router-dom'
import Cookies from 'js-cookie'
import {WiDayLightWind} from 'react-icons/wi'
import Context from '../../Context/Context'

import './index.css'

const Header = props => (
  <Context.Consumer>
    {value => {
      const {lightTheme, onChangeBgTheme} = value

      const onClickTheme = () => {
        onChangeBgTheme()
      }

      const onClickLogout = () => {
        const {history} = props

        Cookies.remove('jwt_token')
        history.replace('/login')
      }

      const popUpBg = lightTheme ? 'popUpLight' : 'popUpBgDark'
      const imgUrl = lightTheme
        ? 'https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png'
        : 'https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-dark-theme-img.png'

      return (
        <div className=" fr aic header">
          <div className="fr jcsb nav">
            <Link to="/">
              <img src={imgUrl} alt="website logo" className="logo-img" />
            </Link>
            <div className="fr aic jcsb profile-theme">
              {lightTheme ? (
                <button
                  type="button"
                  onClick={onClickTheme}
                  data-testid="theme"
                >
                  <FaMoon className="logo-img1" />
                </button>
              ) : (
                <button
                  type="button"
                  onClick={onClickTheme}
                  data-testid="theme"
                >
                  <WiDayLightWind className="logo-img1" color="white" />
                </button>
              )}
              <img
                src="https://assets.ccbp.in/frontend/react-js/nxt-watch-profile-img.png "
                alt="profile"
                className="logo-img1"
              />
              <div className="popup-container">
                <Popup modal trigger={<button type="button">Logout</button>}>
                  {close => (
                    <div className={popUpBg}>
                      <div>
                        <p>Are you sure, you want to logout</p>
                      </div>
                      <button
                        type="button"
                        className="trigger-button"
                        onClick={() => close()}
                      >
                        Cancel
                      </button>
                      <button type="button" onClick={onClickLogout}>
                        Confirm
                      </button>
                    </div>
                  )}
                </Popup>
              </div>
            </div>
          </div>
        </div>
      )
    }}
  </Context.Consumer>
)

export default withRouter(Header)
