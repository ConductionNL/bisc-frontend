import React from 'react'
import classNames from 'classnames'

import styles from './Breadcrumb.module.scss'
import Icon from '../Icon/Icon'
import { IconType } from '../Icon/IconType'
import { Link } from 'react-router-dom'

interface Props {
    className?: string
    text: string
    active?: boolean
    to?: string
}

const Breadcrumb: React.FunctionComponent<Props> = props => {
    const { className, text, to, active } = props
    const containerClassNames = classNames(styles.container, className, {
        [styles['is-active']]: active,
    })

    if (!to) {
        return (
            <div className={containerClassNames}>
                <span className={styles.text}>{text}</span>
                <Icon className={styles.icon} type={IconType.breadcrumb} />
            </div>
        )
    }

    return (
        <Link to={to} className={containerClassNames}>
            <span className={styles.text}>{text}</span>
            <Icon className={styles.icon} type={IconType.breadcrumb} />
        </Link>
    )
}

export default Breadcrumb
