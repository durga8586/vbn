import {AiFillHome} from 'react-icons/ai'
import {HiFire} from 'react-icons/hi'
import {SiYoutubegaming} from 'react-icons/si'
import {RiMenuAddLine} from 'react-icons/ri'
import {Link} from 'react-router-dom'
import './index.css'

const SideNav = () => (
  <div className="sideNav fc jcsb">
    <ul>
      <Link to="/">
        <li>
          <AiFillHome /> Home
        </li>
      </Link>
      <Link to="/trending">
        <li>
          <HiFire /> Trending
        </li>
      </Link>
      <Link to="/gaming">
        <li>
          <SiYoutubegaming /> Gaming
        </li>
      </Link>
      <Link to="/saved-videos">
        <li>
          <RiMenuAddLine /> Saved videos
        </li>
      </Link>
    </ul>
    <div>
      <p>CONTACT US</p>
      <img
        src="https://assets.ccbp.in/frontend/react-js/nxt-watch-facebook-logo-img.png"
        alt="facebook logo"
      />
      <img
        src="https://assets.ccbp.in/frontend/react-js/nxt-watch-twitter-logo-img.png "
        alt="twitter logo"
      />
      <img
        src="https://assets.ccbp.in/frontend/react-js/nxt-watch-linked-in-logo-img.png"
        alt="linked in logo"
      />
      <p>Enjoy! Now to see your channels and recommendations!</p>
    </div>
  </div>
)

export default SideNav
