import React from 'react';
import { withRouter } from "react-router";
import axios from 'axios'
import Layout from './Layout'
import Button from './Button'
import styles from '../styles/Player.module.scss'

class Player extends React.Component {
	constructor(props) {
		super(props)

		this.state = {
			isLoading: true,
			isOnline: false,
			premiumRequired: false,
			isBusy: false,
			track: null,
			user: null,
			deviceId: null,
			accessToken: null,
			isMuted: false,
			player: null,
		}

		this.getAccessToken = this.getAccessToken.bind(this)
		this.createDevice = this.createDevice.bind(this)
		this.play = this.play.bind(this)
		this.toogleMute = this.toogleMute.bind(this)
	}

	componentDidMount() {
		// Liste to route change and stop player
		const unlisten = this.props.history.listen(() => {
			if(this.state.player) this.state.player.disconnect()
			unlisten()
		})

		// If SpotifySDK was already initialized (on another page)
		if(window.Spotify) this.getAccessToken()
		
		// If SpotifySDK is not already initialized
		window.onSpotifyWebPlaybackSDKReady = this.getAccessToken
	}

	getAccessToken() {
		axios.get('http://localhost:1337/access-token').then(res => {
			this.setState(
				{accessToken: res.data.access_token},
				this.createDevice()
			)
		})
	}

	createDevice() {
		const player = new window.Spotify.Player({
			name: 'Mirra Web Player',
			getOAuthToken: cb => cb(this.state.accessToken),
		});

		player.addListener('initialization_error', ({ message }) => console.error('initialization_error', message))
		player.addListener('authentication_error', ({ message }) => console.error('authentication_error', message))
		player.addListener('account_error', ({ message }) => console.error('account_error', message))
		player.addListener('playback_error', ({ message }) => console.error('playback_error', message))
		player.addListener('not_ready', ({ device_id }) => console.error('not_ready', device_id))
		
		player.addListener('player_state_changed', state => {
			if(this.state.paused) {
				this.play()
			}
		});

		player.addListener('ready', ({ device_id }) => {
			this.setState(
				{deviceId: device_id},
				this.play
			)
		});
	
		player.connect();
		this.setState({player: player});
	}

	play() {
		if(this.state.isBusy) return

		this.setState({isBusy: true})
		let userKey = this.props.match.params.key
		let deviceId = this.state.deviceId
		let url = `http://localhost:1337/play?user_key=${userKey}&device_id=${deviceId}`;

		axios.get(url).then(res => {
			this.setState({
				track: res.data.track,
				user: res.data.user,
				isOnline: true,
				isBusy: false,
				isLoading: false,
			})
		}).catch(err => {
			if(err.response.data.type === 'USER_NOT_ONLINE') {
				this.setState({
					isOnline: false,
					isBusy: false,
					isLoading: false
				})
				setTimeout(this.play, 60000);
			} else if(err.response.data.type === 'PREMIUM_REQUIRED') {
				this.setState({
					premiumRequired: true,
					isBusy: false,
					isLoading: false
				})
			}
		});
	}

	toogleMute() {
		let volume = this.state.isMuted ? 1 : 0
		this.state.player.setVolume(volume).then(() => {
			this.setState({isMuted: !this.state.isMuted})
		});
	}

	render() {
		if(this.state.premiumRequired) {
			return(
				<Layout>
					<p className={styles.loadingLabel}>Sorry but you need Spotify Premium</p>
				</Layout>
			)
		}

		if(this.state.isLoading) {
			return(
				<Layout>
					<p className={styles.loadingLabel}>Loading...</p>
				</Layout>
			)
		}


		if(!this.state.isOnline) {
			return(
				<Layout>
					<p className={styles.loadingLabel}>User is currently offline</p>
					<div className={styles.actions}>
						<Button label='Reload' onClick={this.play} spin={this.state.isBusy}/>
					</div>
				</Layout>
			)
		}

		let track = this.state.track
		if(!track) {
			return(
				<Layout>
					<p className={styles.loadingLabel}>Where is the track?</p>
				</Layout>
			)
		}

		return (
			<Layout>
				<div className={styles.userBox}>
					{
						this.state.user.profile_pic_url ? 
						<img className={styles.userPic} src={this.state.user.profile_pic_url} alt="user pic" /> :
						null
					}
					<span className={styles.user}>{this.state.user.name} is listening</span>
				</div>
				<div className={styles.trackBox}>
					<img className={styles.trackPic} src={this.state.track.image} alt="album cover"/>
					<div className={styles.trackInfo}>
						<span className={styles.track}>{this.state.track.name}</span>
						<span className={styles.album}>{this.state.track.album}</span>
						<span className={styles.artists}>{this.state.track.artists}</span>
					</div>
				</div>
				<div className={styles.actions}>
					<Button label={this.state.isMuted ? 'Unmute' : 'Mute'} onClick={this.toogleMute}/>
					<Button label='Sync' onClick={this.play}/>
				</div>
			</Layout>
		)
	}
}

export default withRouter(Player);