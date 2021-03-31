import classnames from 'classnames'
import React from 'react'
import Icon from '../Icon/Icon'
import { IconType } from '../Icon/IconType'
import styles from './InfoBlock.module.scss'

interface Props {
    type: 'info' | 'warning'
}

export const InfoBlock: React.FC<Props> = ({ children, type }) => {
    const containerClassNames = classnames(styles.container, {
        [styles.Info]: type === 'info',
        [styles.Warning]: type === 'warning',
    })
    return (
        <div className={containerClassNames}>
            <div className={styles.iconContainer}>
                <Icon className={styles.icon} type={IconType.warning} />
            </div>
            {children}
        </div>
    )
}
