import React from 'react'
import styles from './PublicRegistrationActionBar.module.scss'

interface Props {}

export const PublicRegistrationActionBar: React.FC<Props> = ({ children }) => {
    return (
        <div className={styles.container}>
            <div className={styles.contentContainer}>{children}</div>
        </div>
    )
}
