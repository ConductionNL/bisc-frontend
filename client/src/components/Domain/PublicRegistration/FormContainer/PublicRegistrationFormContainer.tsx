import React from 'react'
import styles from './PublicRegistrationFormContainer.module.scss'

export const PublicRegistrationFormContainer: React.FC = ({ children }) => {
    return <div className={styles.container}>{children}</div>
}
