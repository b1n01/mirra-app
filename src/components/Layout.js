import React  from 'react'
import styles from '../styles/Layout.module.scss'

function Layout(props) {
    return (
        <div className={styles.hero}>
            <div className={styles.content}>
                {props.children}
            </div>
        </div>
    )
}

export default Layout;