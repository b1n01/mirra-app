import React from 'react'
import Layout from './Layout'
import Button from './Button'
import styles from '../styles/Settings.module.scss'

class Settings extends React.Component {
	constructor(props) {
		super(props)

		this.state = {
		}
	}

	render() {
		return (
			<Layout>
				<p>Info info info infoinfoinfo info info info infoinfoinfo info info info infoinfoinfo info info info infoinfoinfo info info info infoinfoinfo info info info info infoinfoinfo info info info infoinfoinfo  info info info infoinfoinfo info info info infoinfoinfo </p>
				
				<div>
					<p>Stop sharing your listening</p>
					<Button label="Make it private" />
				</div>
				<div>
					<p>Delete your account</p>
					<Button label="Delete account" />
				</div>
			</Layout>
		)
	}
}

export default Settings;