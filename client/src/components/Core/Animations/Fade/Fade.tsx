import React from 'react'
import styles from './Fade.module.scss'

interface Props {}

export const Fade: React.FC<Props> = ({ children }) => {
    return <div className={styles.fade}>{children}</div>
}
