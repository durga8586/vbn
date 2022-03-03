import {Component} from 'react'
import {AiOutlineClose} from 'react-icons/ai'
import {BiSearch} from 'react-icons/bi'
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

class HomeContent extends Component {
  state = {
    isBanner: true,
    searchValue: '',
    productsList: [],
    apiStatus: apiStatusConstants.initial,
  }

  componentDidMount() {
    this.getProductData()
  }

  getProductData = async () => {
    const {searchValue} = this.state

    this.setState({
      apiStatus: apiStatusConstants.inProgress,
    })

    const jwtToken = Cookies.get('jwt_token')
    const apiUrl = `https://apis.ccbp.in/videos/all?search=${searchValue}`
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

  onClickCloseBanner = () => {
    this.setState(prevState => ({isBanner: !prevState.isBanner}))
  }

  onChangeSearchValue = e => {
    this.setState({searchValue: e.target.value})
  }

  renderLoadingView = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  onClickSearch = () => {
    this.getProductData()
  }

  onClickRetry = () => {
    this.getProductData()
  }

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

    const isData = productsList.length === 0
    return (
      <div>
        {!isData && (
          <ul>
            {productsList.map(each => (
              <li key={each.id}>
                <Link to={`/videos/${each.id}`}>
                  <img src={each.thumbnail_url} alt="video thumbnail" />
                  <div>
                    <img
                      src={each.channel.profile_image_url}
                      alt="channel logo"
                    />
                    <div>
                      <p>{each.title}</p>
                      <p>{each.channel.name}</p>
                      <p>{each.view_count}</p>
                      <p>{formatDistanceToNow(new Date(each.published_at))}</p>
                    </div>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        )}
        {isData && (
          <div className="no-products-view">
            <img
              src="https://assets.ccbp.in/frontend/react-js/nxt-watch-no-search-results-img.png"
              className="no-products-img"
              alt="no videos"
            />
            <h1 className="no-products-heading">No Search results found</h1>
            <p className="no-products-description">
              Try different key words or remove search filter
            </p>
            <button type="button" onClick={this.onClickRetry}>
              Retry
            </button>
          </div>
        )}
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
    const {isBanner, searchValue} = this.state

    return (
      <Context.Consumer>
        {value => {
          const {lightTheme} = value

          const ContBgColor = lightTheme ? 'contBgLight' : 'contBgDark'

          return (
            <div className={`content ${ContBgColor}`}>
              {isBanner && (
                <div className="fr jcsb bannerCont" data-testid="banner">
                  <div>
                    <img
                      src="https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png"
                      alt="nxt watch logo"
                      className="logo-img"
                    />
                    <p>Buy Nxt Watch Premium</p>
                    <button type="button">GET IT NOW </button>
                  </div>
                  <button
                    type="button"
                    onClick={this.onClickCloseBanner}
                    data-testid="close"
                  >
                    <AiOutlineClose />
                  </button>
                </div>
              )}
              <div>
                <input
                  type="search"
                  value={searchValue}
                  onChange={this.onChangeSearchValue}
                />
                <button
                  type="button"
                  data-testid="searchButton"
                  onClick={this.onClickSearch}
                >
                  <BiSearch />
                </button>
              </div>
              {this.renderProductDetails(lightTheme)}
            </div>
          )
        }}
      </Context.Consumer>
    )
  }
}

export default HomeContent
