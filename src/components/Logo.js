import React from 'react'
import { Link } from "react-router-dom"
import svg from '../images/logo.svg'
import styles from '../styles/Logo.module.scss'

function Logo(props) {
	return (
		<Link to='/' className={props.className}>
			<img src={svg} className={styles.logo} alt='logo' />
		</Link>
	)
}

export default Logo;