import React from 'react';
import { withRouter } from "react-router";
import axios from 'axios'
import Layout from './Layout'
import Button from './Button'
import Loader from './Loader'
import syncIcon from '../images/sync.svg'
import muteIcon from '../images/mute.svg'
import unmuteIcon from '../images/unmute.svg'
import emptyIcon from '../images/empty.svg'
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
			isPrivate: false,
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
				isPrivate: false,
			})
		}).catch(err => {
			if(err.response.data.type === 'USER_NOT_ONLINE') {
				this.setState({
					isOnline: false,
					isBusy: false,
					isLoading: false,
					isPrivate: false,
				})
				setTimeout(this.play, 60000);
				this.state.player.pause()
			} else if(err.response.data.type === 'PREMIUM_REQUIRED') {
				this.setState({
					premiumRequired: true,
					isBusy: false,
					isLoading: false,
					isPrivate: false,
				})
				this.state.player.disconnect()
			} else if(err.response.data.type === 'USER_IS_PRIVATE') {
				this.setState({
					isPrivate: true,
					isBusy: false,
					isLoading: false
				})
				setTimeout(this.play, 60000);
				this.state.player.pause()
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
		if(this.state.isLoading) {
			return <Loader />
		}

		if(this.state.premiumRequired) {
			return(
				<Layout hero>
					<p className={styles.premiumLabel}>Sorry but you need Spotify Premium</p>
				</Layout>
			)
		}

		if(this.state.isPrivate) {
			return(
				<Layout hero>
					<div className={styles.offlineBox}>
						<img src={emptyIcon} alt='empty icon' className={styles.emptyIcon} />
						<p className={styles.premiumLabel}>This user is in a private listening session</p>
						<Button label='Reload' onClick={this.play}/>
					</div>
				</Layout>
			)
		}


		if(!this.state.isOnline) {
			return(
				<Layout hero>
					<div className={styles.offlineBox}>
						<img src={emptyIcon} alt='empty icon' className={styles.emptyIcon} />
						<p>This user is currently offline</p>
						<Button label='Reload' onClick={this.play}/>
					</div>
				</Layout>
			)
		}

		if(!this.state.track) {
			return(
				<Layout>
					<p className={styles.premiumLabel}>Where is the track?</p>
				</Layout>
			)
		}

		return (
			<Layout>
				<div className={styles.userBox}>
					{
						this.state.user.profilePic ? 
						<img className={styles.userPic} src={this.state.user.profilePic} alt="user pic" /> :
						null
					}
					<span>{this.state.user.isYou ? 'You are' : this.state.user.name + ' is'}  listening</span>
				</div>
				<div className={styles.trackBox}>
					<img className={styles.trackPic} src={this.state.track.image} alt="album cover"/>

					<div className={styles.trackInfo}>
						<div className={styles.trackDetails}>
							<span className={styles.track}>{this.state.track.name}</span>
							<span className={styles.album}>{this.state.track.album} - {this.state.track.artists}</span>
						</div>
						<div className={styles.actions}>
							<img src={this.state.isMuted ? unmuteIcon : muteIcon} onClick={this.toogleMute} alt='mute unmute icon'/>
							<img src={syncIcon} onClick={this.play} alt='sync icon'/>
						</div>
					</div>
				</div>
				
			</Layout>
		)
	}
}

export default withRouter(Player);