import React from 'react'
import spinnerIcon from '../images/spinner.svg'
import styles from '../styles/Button.module.scss'

const getClass = (props) => {
	let classes = [props.className, styles.button]
	if(props.soft) classes.push(styles.soft)
	return classes.join(' ')
}

function Button(props) {
	return (
		<span onClick={props.onClick} className={getClass(props)}>
			<img style={{display: props.spin ? 'inline' : 'none'}} src={spinnerIcon} alt="spinner icon" className={styles.spinner}/>
			<span style={{display: !props.spin ? 'inline' : 'none'}}>
				{props.label}
			</span>
		</span>
	)
}

export default Button;