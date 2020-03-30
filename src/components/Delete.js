import React from 'react'
import axios from 'axios'
import { Link } from "react-router-dom";
import Layout from './Layout'
import Button from './Button'
import styles from '../styles/Delete.module.scss'

class Delete extends React.Component {

	deleteAccount() {
		axios.delete(process.env.REACT_APP_API_ENDPOINT + '/account')
			.then(() => window.location.href = process.env.REACT_APP_APP_ENDPOINT + '/logout')
	}

	render() {
		return (
			<Layout hero>
				<div className={styles.content}>
					<p>You are about to delete your account. You will be able to login again in any time but you permalink may change, are you sure you want to delete you account?</p>
					<Link to='/' className={styles.button}>
						<Button label='No' soft/>
					</Link>
					<Button className={styles.button} label='Yes, delete' onClick={this.deleteAccount} />
				</div>
			</Layout>
		)
	}
}

export default Delete;