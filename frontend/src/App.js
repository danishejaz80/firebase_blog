import React from 'react'
import { connect } from 'react-redux'

import Helmet from 'react-helmet'

import Routes from './routes/Routes'
import './App.css'

function App({ theme }) {
  return (
    <React.Fragment>
      <Helmet titleTemplate="%s | Blog" defaultTitle="Blog" />
      <Routes />
    </React.Fragment>
  )
}

export default connect((store) => ({ theme: store.themeReducer }))(App)
