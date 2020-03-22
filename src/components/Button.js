import React from 'react'
import spinnerIcon from '../images/spinner-icon.svg'
import styles from '../styles/Button.module.scss'

function Button(props) {
	return (
		<span 
			onClick={props.onClick}
			className={styles.button}
		>
			{
				props.spin ?
				<img src={spinnerIcon} alt="spinner icon" className={styles.spinner}/> :
				props.label
			}
		</span>
	)
}

export default Button;