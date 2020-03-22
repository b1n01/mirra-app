import React from 'react'
import { Redirect } from "react-router-dom";

import Layout from './Layout'
import styles from '../styles/Auth.module.scss'

class Auth extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      isJwtSet: false,
    }

    this.redirect = this.redirect.bind(this)
  }

  componentDidMount() {
    let jwt = this.popCookie('jwt')
    window.localStorage.setItem('jwt', jwt)
    this.setState({isJwtSet: true})
  }

  popCookie(search) {
    let result = document.cookie.match('(^|[^;]+)\\s*' + search + '\\s*=\\s*([^;]+)')
    document.cookie = 'jwt='
    return result ? result.pop() : null;
  }

  redirect() {
    return this.state.isJwtSet ? <Redirect to='/'/> : null
  }

  render() {
    return (
        <Layout>
            <p className={styles.label}>Loading...</p>
            {this.redirect()}
        </Layout>
    )
  }
}

export default Auth;