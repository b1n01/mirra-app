import React from 'react';
import Logo from './Logo'
import Layout from './Layout'
import Button from './Button'
import styles from '../styles/Home.module.scss'

class Home extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  login() {
    window.location.href = 'http://localhost:1337/authorize'
  }

  render() {
    return (
      <Layout>
          <Logo />
          <div className={styles.action}>
            <p className={styles.label}>Share what you are listening</p>
            <Button label="Login with Spotify Premium" onClick={this.login}/>
          </div>
      </Layout>
    )
  }
}

export default Home;