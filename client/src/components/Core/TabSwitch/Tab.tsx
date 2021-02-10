import React, { useContext } from 'react'
import classNames from 'classnames'
import styles from './Tab.module.scss'
import { TabSwitchContext } from './context'
import { TabProps } from './types'

export interface Props extends TabProps {
    className?: string
}

const Tab: React.FunctionComponent<Props> = props => {
    const context = useContext(TabSwitchContext)
    const { className, label, tabid: key, indicatorCount } = props
    const containerClassNames = classNames(styles.container, className, {
        [styles['is-active']]: context.activeKey === key,
    })

    const handleOnClick = () => {
        context.onChange({
            indicatorCount: indicatorCount,
            label: label,
            tabid: key,
        })
    }
    return (
        <button className={containerClassNames} onClick={handleOnClick}>
            <span className={styles.label}>{label}</span>
            {indicatorCount && <span className={styles.indicator}>{indicatorCount}</span>}
        </button>
    )
}

export default Tab
