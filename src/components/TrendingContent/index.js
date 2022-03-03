import {Component} from 'react'
import Loader from 'react-loader-spinner'
import './index.css'
import {formatDistanceToNow} from 'date-fns'
import Cookies from 'js-cookie'
import {Link} from 'react-router-dom'
import Context from '../../Context/Context'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class TrendingContent extends Component {
  state = {
    productsList: [],
    apiStatus: apiStatusConstants.initial,
  }

  componentDidMount() {
    this.getTrendData()
  }

  getTrendData = async () => {
    this.setState({
      apiStatus: apiStatusConstants.inProgress,
    })
    const jwtToken = Cookies.get('jwt_token')
    const apiUrl = 'https://apis.ccbp.in/videos/trending'
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    try {
      const response = await fetch(apiUrl, options)
      const fetchedData = await response.json()
      this.setState({
        productsList: fetchedData.videos,
        apiStatus: apiStatusConstants.success,
      })
    } catch (e) {
      this.setState({
        apiStatus: apiStatusConstants.failure,
      })
    }
  }

  onClickRetry = () => {
    this.getTrendData()
  }

  renderLoadingView = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  renderFailureView = lightTheme => {
    const imgUrl = lightTheme
      ? 'https://assets.ccbp.in/frontend/react-js/nxt-watch-failure-view-light-theme-img.png'
      : 'https://assets.ccbp.in/frontend/react-js/nxt-watch-failure-view-dark-theme-img.png'

    return (
      <div className="product-details-error-view-container">
        <img alt="failure view" src={imgUrl} className="error-view-image" />
        <h1 className="product-not-found-heading">
          Oops! Something Went Wrong
        </h1>
        <p>
          We are having some trouble to complete your request. Please try again.
        </p>
        <button type="button" className="button" onClick={this.onClickRetry}>
          Retry
        </button>
      </div>
    )
  }

  renderProductDetailsView = () => {
    const {productsList} = this.state

    return (
      <div>
        <ul>
          {productsList.map(each => (
            <li key={each.id} className="fr">
              <Link to={`/videos/${each.id}`}>
                <img src={each.thumbnail_url} alt="video thumbnail" />
                <div>
                  <p>{each.title}</p>
                  <p>{each.channel.name}</p>
                  <p>{each.view_count} views</p> <span>.</span>
                  <p>{formatDistanceToNow(new Date(each.published_at))}</p>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    )
  }

  renderProductDetails = lightTheme => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderProductDetailsView()
      case apiStatusConstants.failure:
        return this.renderFailureView(lightTheme)
      case apiStatusConstants.inProgress:
        return this.renderLoadingView()
      default:
        return null
    }
  }

  render() {
    return (
      <Context.Consumer>
        {value => {
          const {lightTheme} = value

          const ContBgColor = lightTheme ? 'contBgLight' : 'contBgDark'

          return (
            <div className={`content ${ContBgColor}`}>
              <h1>Trending Videos</h1>
              {this.renderProductDetails(lightTheme)}
            </div>
          )
        }}
      </Context.Consumer>
    )
  }
}

export default TrendingContent
