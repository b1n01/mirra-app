import React  from 'react'
import { Link } from 'react-router-dom'
import Logo from './Logo'
import settingIcon from '../images/settings-icon.svg' 
import logoutIcon from '../images/logout-icon.svg' 
import styles from '../styles/Layout.module.scss'

function Layout(props) {
    return (
        <div>
            <div className={styles.nav}>
                <Logo />
                <div className={styles.options}>
                    <Link to="settings">
                        <img src={settingIcon} alt="settings icon"/>
                    </Link>
                    <Link to="logout">
                        <img src={logoutIcon} alt="logout icon"/>
                    </Link>
                </div>
            </div>
            <div className={styles.hero}>
                <div className={styles.content}>
                    {props.children}
                </div>
            </div>
        </div>
    )
}

export default Layout;