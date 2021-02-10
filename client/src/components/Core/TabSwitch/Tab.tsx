import React from 'react'
import classNames from 'classnames'

import styles from './Tab.module.scss'

interface Props {
    className?: string
    indicatorCount?: number
    label: string
    active?: boolean
}

const Tab: React.FunctionComponent<Props> = props => {
    const { className, label, active, indicatorCount } = props
    const containerClassNames = classNames(styles.container, className, {
        [styles['is-active']]: active,
    })

    return (
        <button className={containerClassNames}>
            <span className={styles.label}>{label}</span>
            {indicatorCount && <span className={styles.indicator}>{indicatorCount}</span>}
        </button>
    )
}

export default Tab
