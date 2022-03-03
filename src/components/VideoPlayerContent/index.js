import {Component} from 'react'
import ReactPlayer from 'react-player'
import Loader from 'react-loader-spinner'
import './index.css'
import {formatDistanceToNow} from 'date-fns'
import Cookies from 'js-cookie'
import Context from '../../Context/Context'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class VideoPlayerContent extends Component {
  state = {
    isLiked: false,
    isDisLiked: false,
    isSaved: false,
    productsList: {},
    apiStatus: apiStatusConstants.initial,
  }

  componentDidMount() {
    this.getGamData()
  }

  getGamData = async () => {
    const {id} = this.props

    this.setState({
      apiStatus: apiStatusConstants.inProgress,
    })
    const jwtToken = Cookies.get('jwt_token')
    const apiUrl = `https://apis.ccbp.in/videos/${id}`
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
        productsList: fetchedData.video_details,
        apiStatus: apiStatusConstants.success,
      })
    } catch (error) {
      this.setState({
        apiStatus: apiStatusConstants.failure,
      })
    }
  }

  onClickRetry = () => {
    this.getGamData()
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

  onClickSave = () => {
    this.setState(prev => ({isSaved: !prev.isSaved}))
  }

  onClickLike = () => {
    this.setState(prev => ({isDisLiked: false, isLiked: !prev.isLiked}))
  }

  onClickDisLike = () => {
    this.setState(prev => ({isDisLiked: !prev.isDisLiked, isLiked: false}))
  }

  renderProductDetailsView = () => {
    const {productsList, isLiked, isDisLiked, isSaved} = this.state

    const likeColor = isLiked ? 'blue' : 'def'
    const disLikeColor = isDisLiked ? 'blue' : 'def'
    const isSavedTxt = isSaved ? 'Saved' : 'Save'

    return (
      <div>
        <div>
          <div>
            <div className="video-container">
              <div className="responsive-container">
                <ReactPlayer url={productsList.video_url} />
              </div>
            </div>
          </div>
          <p>{productsList.title}</p>
          <div className="fr jcsb">
            <div className="fr">
              <p>{productsList.view_count}</p>
              <span>.</span>
              <p>{formatDistanceToNow(new Date(productsList.published_at))}</p>
            </div>
            <div className="fr">
              <button
                type="button"
                onClick={this.onClickLike}
                className={likeColor}
              >
                Like
              </button>
              <button
                type="button"
                onClick={this.onClickDisLike}
                className={disLikeColor}
              >
                Dislike
              </button>
              <button
                type="button"
                className={isSavedTxt}
                onClick={this.onClickSave}
              >
                {isSavedTxt}
              </button>
            </div>
          </div>
          <hr />
          <div>
            <img
              src={productsList.channel.profile_image_url}
              alt="channel logo"
            />
            <div>
              <p>{productsList.channel.name}</p>
              <p>{productsList.channel.subscriber_count}</p>
              <p>{productsList.description}</p>
            </div>
          </div>
        </div>
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
              {this.renderProductDetails(lightTheme)}
            </div>
          )
        }}
      </Context.Consumer>
    )
  }
}

export default VideoPlayerContent
