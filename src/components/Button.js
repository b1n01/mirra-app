import React from 'react'
import spinnerIcon from '../images/spinner-icon.svg'
import styles from '../styles/Button.module.scss'

function Button(props) {
	return (
		<span 
			onClick={props.onClick}
			className={styles.button}
		>
			<img style={{display: props.spin ? 'inline' : 'none'}} src={spinnerIcon} alt="spinner icon" className={styles.spinner}/>
			<span style={{display: !props.spin ? 'inline' : 'none'}}>{props.label}</span>
		</span>
	)
}

export default Button;