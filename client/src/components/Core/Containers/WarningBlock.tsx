import React from 'react'
import Icon from '../Icon/Icon'
import { IconType } from '../Icon/IconType'
import styles from './WarningBlock.module.scss'

export const WarningBlock: React.FC = ({ children }) => {
    return (
        <div className={styles.container}>
            <div className={styles.warningIconContainer}>
                <Icon className={styles.warningIcon} type={IconType.warning} />
            </div>
            {children}
        </div>
    )
}
