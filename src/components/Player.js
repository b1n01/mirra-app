import React from 'react';
import Logo from './Logo'
import Layout from './Layout'
import styles from '../styles/Player.module.scss'

class Player extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {
    return (
      <Layout>
          <Logo />
          <p>You want to listen {this.props.match.params.key}</p>
      </Layout>
    )
  }
}

export default Player;