import React from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import Layout from './Layout'
import Button from './Button'
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
	}

	componentDidMount() {
		axios.get('http://localhost:1337/user-key').then(res => {
			this.setState({
				key: res.data.key,
				isPublic: Boolean(res.data.key),
				isLoading: false,
			})
		});
	}

	share() {
		axios.get('http://localhost:1337/share').then(res => {
			this.setState({ key: res.data.key, isPublic: true })
		});
	}

	render() {
		if (this.state.isLoading) {
			return (
				<Layout>
					<p className={styles.label}>
						Loading...
					</p>
				</Layout>
			)
		} else if(!this.state.isPublic) {
			return (
				<Layout>
					<span className={styles.label}>
						Your account is private
					</span>
					<Button label='Make it public' onClick={this.share} />
				</Layout>
			)
		} else {
			return (
				<Layout>
					<span className={styles.label}>
						Share your permalink
					</span>
					<Link to={this.state.key} className={styles.link}>
						<Button label={'localhost:3000/' + this.state.key} />
					</Link>
				</Layout>
			)
		}
	}
}

export default Share;