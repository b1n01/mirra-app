import React from 'react';
import axios from 'axios'
import Layout from './Layout'
import Button from './Button'
import styles from '../styles/Player.module.scss'

class Player extends React.Component {
	constructor(props) {
		super(props)

		this.state = {
			track: null,
			user: null,
			deviceId: null,
			isWebPlaybackSDKReady: false,
			accessToken: null,
			isMuted: false,
			player: null,
		}

		this.getAccessToken = this.getAccessToken.bind(this)
		this.getDeviceToken = this.getDeviceToken.bind(this)
		this.play = this.play.bind(this)
		this.toogleMute = this.toogleMute.bind(this)
	}

	componentDidMount() {
		window.onSpotifyWebPlaybackSDKReady = () => {
			this.setState({isWebPlaybackSDKReady: true})
			this.getAccessToken()
		}
	}

	getAccessToken() {
		axios.get('http://localhost:1337/access-token').then(res => {
			this.setState({accessToken: res.data.access_token})
			this.getDeviceToken()
		})
	}

	getDeviceToken() {
		const player = new window.Spotify.Player({
			name: 'Mirra Web Player',
			getOAuthToken: cb => cb(this.state.accessToken),
		});

		player.addListener('initialization_error', ({ message }) => console.error(message));
		player.addListener('authentication_error', ({ message }) => console.error(message));
		player.addListener('account_error', ({ message }) => console.error(message));
		player.addListener('playback_error', ({ message }) => console.error(message));
		player.addListener('not_ready', ({ device_id }) => console.error('No ready', device_id));
		
		player.addListener('player_state_changed', state => {
			console.log('player_state_changed', state)
			if(state.paused) {
				this.play();
			}
		});

		player.addListener('ready', ({ device_id }) => {
			this.setState({
				deviceId: device_id,
				player: player,
			});
			this.play()
		});
	
		player.connect();
	}

	play() {
		if(!this.state.isLoading) {
			this.setState({isLoading: true})
			let userKey = this.props.match.params.key
			let deviceId = this.state.deviceId
			let url = `http://localhost:1337/play?user_key=${userKey}&device_id=${deviceId}`;
			axios.get(url).then(res => {
				if(res.data.type === 'USER_NOT_ONLINE') {
					console.log('Target user is offline')
				}

				this.setState({track: res.data.track, user: res.data.user, isLoading: false})
			});
		}
	}

	toogleMute() {
		let volume = this.state.isMuted ? 1 : 0

		this.state.player.setVolume(volume).then(() => {
			this.setState({isMuted: !this.state.isMuted})
		});
	}

	render() {
		let track = this.state.track

		if(!track) {
			return(
				<Layout>
					<p>Loading</p>
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
					<span className={styles.user}>{this.state.user.name} is listening to:</span>
				</div>
				<div className={styles.trackBox}>
					<img className={styles.trackPic} src={this.state.track.image} alt="album cover"/>
					<div className={styles.trackInfo}>
						<span className={styles.track}>{this.state.track.name}</span>
						<span className={styles.album}>{this.state.track.album}</span>
						<span className={styles.artists}>{this.state.track.artists}</span>
						<div className={styles.actions}>
							{
								this.state.isMuted ? 
								<Button label='Unmute' onClick={this.toogleMute}/> :
								<Button label='Mute' onClick={this.toogleMute}/>
							}
							<Button label='Sync' onClick={this.play}/>
						</div>
					</div>
				</div>
			</Layout>
		)
	}
}

export default Player;