import React from 'react'
import axios from 'axios'

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
			if (res.data.key) {
				this.setState({
					key: res.data.key,
					isPublic: res.data.isPublic,
					isLoading: false
				})
			}
		});
	}

	share() {
		axios.get('http://localhost:1337/share').then(res => {
			this.setState({ key: res.data.key, isPublic: true })
		});
	}

	getShareUrl() {
		return 'http://localhost:3000/' + this.state.key
	}

	getButton() {
		if (this.state.isPublic) {
			return (
				<a href={this.getShareUrl()} className={styles.link} target='_blank' rel="noopener noreferrer">
					<Button label='Open' />
				</a>
			)
		} else {
			return <Button label='Make it public' onClick={this.share} />
		}
	}

	getLoading() {
		return (
			<Layout>
				<p className={styles.loadingLabel}>Loading...</p>
			</Layout>
		)
	}

	getContent() {
		return (
			<Layout>
				<div className={styles.wrapper}>
					<span className={styles.label}>
						{this.getShareUrl()}
					</span>
					{this.getButton()}
				</div>
			</Layout>
		)
	}
	render() {
		if (this.state.isLoading) {
			return this.getLoading()
		} else {
			return this.getContent()
		}
	}
}

export default Share;