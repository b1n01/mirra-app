import React from 'react'
import styles from '../styles/Button.module.scss'

function Button(props) {
	return (
		<span onClick={props.onClick} className={styles.button}>{props.label}</span>
	)
}

export default Button;