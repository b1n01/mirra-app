import React from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import Loader from './Loader'
import Layout from './Layout'
import Button from './Button'
import friends from '../images/friends.svg'
import styles from '../styles/Share.module.scss'

class Share extends React.Component {
	constructor(props) {
		super(props)

		this.state = {
			key: null,
			isPublic: false,
			isLoading: true,
		}

		this.share = this.share.bind(this)
		this.unshare = this.unshare.bind(this)
		this.getPermalink = this.getPermalink.bind(this)
		this.getPublicToogle = this.getPublicToogle.bind(this)
	}

	componentDidMount() {
		axios.get('http://localhost:1337/user-key').then(res => {
			this.setState({
				key: res.data.key,
				isPublic: res.data.isPublic,
				isLoading: false,
			})
		});
	}

	share() {
		axios.get('http://localhost:1337/share')
			.then(() => this.setState({isPublic: true}));
	}

	unshare() {
		axios.get('http://localhost:1337/unshare')
			.then(() => this.setState({isPublic: false}));
	}

	getPermalink() {
		if(this.state.isPublic) {
			return (
				<p className={styles.permalink}>
					<Link to={'/' + this.state.key}>
						{'mirra.live/' + this.state.key}
					</Link>
				</p>
			)
		} else {
			return (
				<p className={styles.disabledPermalink}>
					{'mirra.live/' + this.state.key}
				</p>
			)
		}
	}

	getPublicToogle() {
		if(this.state.isPublic) {
			return (
				<div className={styles.optionsBox}>
					<h1>Make it private</h1>
					<p>You can turn off sharing to have a private listening session in any time</p>
					<Button onClick={this.unshare} label="Make it private" spin={this.state.isLoadingStatus} soft/>
				</div>
			)
		} else {
			return (
				<div className={styles.optionsBox}>
					<h1>Make it public</h1>
					<p>Start sharing your listening. You can turn off sharing to have a private listening session in any time</p>
					<Button onClick={this.share} label="Go live" spin={this.state.isLoadingStatus} soft/>
				</div>
			)
		}
	}

	render() {
		if (this.state.isLoading) {
			return <Loader />
		}

		return (
			<Layout>
				<div className={styles.permalinkBox}>
					<p>
						This is your Mirra permalink. Whoever has your link can see what you're listening to and play it live
					</p>
					{this.getPermalink()}
				</div>
				<div className={styles.optionsWrapper}>
					{this.getPublicToogle()}
					<div className={styles.optionsBox}>
						<h1>Account</h1>
						<p>You will be able to login again with Spotify in any time</p>
						<Link to='/logout' className={styles.button}>
							<Button label='Logout' soft/>
						</Link>
						<Link to='/delete' className={styles.button}>
							<Button label='Delete account' soft/>
						</Link>
					</div>
					<img src={friends} className={styles.friends} alt='friends logo'/>
				</div>
			</Layout>
		)
	}
}

export default Share;