import React from 'react';
import Loader from './Loader'
import Button from './Button'
import Layout from './Layout'
import flower from '../images/flower.svg'
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
		if(this.state.isLoding) return <Loader />

		let authorizeUrl = process.env.REACT_APP_API_ENDPOINT + '/authorize'
		return (
			<Layout hero>
				<div className={styles.content}>
					<p className={styles.title}>
						Share your own music tastes
					</p>
					<p className={styles.subtitle}>
						Mirra let’s you mirror your Spotify listening live 
					</p>
					<a href={authorizeUrl} className={styles.button} onClick={this.setLoading}>
						<Button label="Login with Spotify" />
					</a>
					<img src={flower} alt='flower pic' className={styles.flower}/>
				</div>
			</Layout>
		)
	}
}

export default Home;