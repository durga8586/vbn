import {Component} from 'react'
import {Route, Switch, Redirect} from 'react-router-dom'
import Login from './components/Login'
import Home from './components/Home'
import ProtectedRoute from './components/ProtectedRoute'
import Context from './Context/Context'
import NotFound from './components/NotFound'
import VideoPlayer from './components/VideoPlayer'

import './App.css'
import Trending from './components/Trending'
import Gaming from './components/Gaming'
import SavedVideos from './components/SavedVideos'

class App extends Component {
  state = {lightTheme: true}

  onChangeBgTheme = () => {
    this.setState(prevState => ({lightTheme: !prevState.lightTheme}))
  }

  render() {
    const {lightTheme} = this.state

    const theme = lightTheme ? 'light' : 'dark'

    return (
      <Context.Provider
        value={{
          lightTheme,
          onChangeBgTheme: this.onChangeBgTheme,
        }}
      >
        <div className={`main-container ${theme}`}>
          <Switch>
            <Route exact path="/login" component={Login} />
            <ProtectedRoute exact path="/" component={Home} />
            <ProtectedRoute exact path="/trending" component={Trending} />
            <ProtectedRoute exact path="/gaming" component={Gaming} />
            <ProtectedRoute
              exact
              path="/saved-videos"
              component={SavedVideos}
            />
            <Route exact path="/videos/:id" component={VideoPlayer} />
            <Route path="/not-found" component={NotFound} />
            <Redirect to="not-found" />
          </Switch>
        </div>
      </Context.Provider>
    )
  }
}
export default App
