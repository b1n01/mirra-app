import React from 'react'
import { Link } from "react-router-dom";

import styles from '../styles/Logo.module.scss'

function Logo() {
	return (
		<span className={styles.logo}>
			<Link to='/' className={styles.link}>
				Mirra
			</Link>
		</span>
	)
}

export default Logo;