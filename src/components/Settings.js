import React from 'react'
import axios from 'axios'
import Layout from './Layout'
import Button from './Button'
import styles from '../styles/Settings.module.scss'

class Settings extends React.Component {
	constructor(props) {
		super(props)

		this.state = {
			isPublic: true,
			isLoading: false,
		}

		this.share = this.share.bind(this)
		this.unshare = this.unshare.bind(this)
	}

	componentDidMount() {
		axios.get('http://localhost:1337/user-key')
			.then(res => this.setState({isPublic: Boolean(res.data.key)}));
	}

	share() {
		this.setState({isLoading: true})
		axios.get('http://localhost:1337/share')
			.then(res => this.setState({isPublic: true, isLoading: false}));
	}

	unshare() {
		this.setState({isLoading: true})
		axios.get('http://localhost:1337/unshare')
			.then(res => this.setState({isPublic: false, isLoading: false}));
	}

	render() {
		return (
			<Layout>
				<p className={styles.description}>
					Mirra permalink is a unique url that you can share with others. Anyone with your link can listen what you are listening live. It requires Spotify Premium.
				</p>
				<p className={styles.label}>
					{this.state.isPublic ? 'You are sharing your listening' : 'Your account is private'}
				</p>
				<Button 
					label={this.state.isPublic ? "Make it private":  "Share!"}
					onClick={this.state.isPublic ? this.unshare : this.share}
					spin={this.state.isLoading}
				/>
				<div>
					<p className={styles.label}>Delete your account</p>
					<Button label="Delete account TODO" />
				</div>
			</Layout>
		)
	}
}

export default Settings;