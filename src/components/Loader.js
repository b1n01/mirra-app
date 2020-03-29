import React from 'react'
import Layout from './Layout'
import styles from '../styles/Loader.module.scss'

function Loader () {
	return (
		<Layout hero>
			<div className={styles.spinner}>
				<div className={styles.bounce1}></div>
				<div className={styles.bounce2}></div>
				<div className={styles.bounce3}></div>
			</div>
		</Layout>
	)
}

export default Loader;