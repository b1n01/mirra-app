import React from 'react'
import axios from 'axios'

import Layout from './Layout'
import Logo from './Logo'
import Button from './Button'
import styles from '../styles/Share.module.scss'

class Share extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
        key: null,
    }
    this.share = this.share.bind(this)
    this.unshare = this.unshare.bind(this)
  }

  componentDidMount() {
    axios.get('http://localhost:1337/user-key').then(res => {
        this.setState({key: res.data.key})
    });
  }

  share() {
    axios.get('http://localhost:1337/share').then(res => {
        this.setState({key: res.data.key})
    });
  }

  unshare() {
    axios.get('http://localhost:1337/unshare').then(res => {
        this.setState({key: null})
    });
  }

  getShareUrl() {
    return 'http://localhost:3000/listen/' + this.state.key
  }

  getAction() {
    if(this.state.key) {
      return(
        <div className={styles.publicAction}>
          <span className={styles.label + ' ' + styles.makePrivateLabel}>
            You Mirra shareable url:
          </span>
          <span ref={this.urlRef} className={styles.label + ' ' + styles.makePrivateLabel}>
            {this.getShareUrl()}
          </span>
          <div className={styles.buttons}>
            <span className={styles.leftButton}>
              <a 
                href={this.getShareUrl()}
                className={styles.link}
                target='_blank'
                rel="noopener noreferrer"
              >
                <Button label='Open' />
              </a>
            </span>
            <Button label='Make it private' onClick={this.unshare} />
          </div>
        </div>
      )
    } else {
      return(
          <div className={styles.privateAction}>
              <p className={styles.label + ' ' + styles.makePublicLabel}>You can turn off sharing at any time</p>
              <Button label='Make it public' onClick={this.share} />
          </div>
      )
    }
  }

  render() {
    return (
        <Layout>
            <Logo />
            <p className={styles.label}>
                Anyone with your Mirra url can listen the same song you're listening to <br /> It requires Spotify Premium
            </p>
            {this.getAction()}
        </Layout>
    )
  }
}

export default Share;