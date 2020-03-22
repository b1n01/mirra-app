import React from 'react'
import { Redirect } from "react-router-dom";

import Layout from './Layout'
import Logo from './Logo'
import styles from '../styles/Authenticated.module.scss'

class Authenticated extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      isJwtSet: false,
    }
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

  render() {
    return (
        <Layout>
            <Logo />
            <p className={styles.label}>Loading...</p>
            {this.state.isJwtSet ? <Redirect to='/share'/> : null}
        </Layout>
    )
  }
}

export default Authenticated;