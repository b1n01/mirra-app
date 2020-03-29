import React  from 'react'
import Logo from './Logo'
import styles from '../styles/Layout.module.scss'

function Layout(props) {
    return (
        <div className={styles.layout}>
            <Logo className={styles.logo}/>
            <div className={props.hero ? styles.hero : ''}>
                {props.children}
            </div>
        </div>
    )
}

export default Layout;