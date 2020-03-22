import React from 'react';
import Logo from './Logo'
import Button from './Button'
import styles from '../styles/Login.module.scss'

class Home extends React.Component {
	constructor(props) {
		super(props)

		this.state = {
			isLoding: false,
		}

		this.setLoading = this.setLoading.bind(this)
	}

	setLoading() {
		this.setState({isLoding: true})
	}

	render() {
		let authorizeUrl = process.env.REACT_APP_API_ENDPOINT + '/authorize'
		return (
			<div className={styles.hero}>
				<div className={styles.content}>
					<Logo />
					<div className={styles.action}>
						<p className={styles.label}>
							Share what you are listening
						</p>
						<a href={authorizeUrl} className={styles.link} onClick={this.setLoading}>
							<Button label="Login with Spotify" spin={this.state.isLoding} />
						</a>
					</div>
				</div>
			</div>
		)
	}
}

export default Home;