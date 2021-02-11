import React from 'react'
import classNames from 'classnames'

import styles from './Breadcrumb.module.scss'
import Icon from '../Icon/Icon'
import { IconType } from '../Icon/IconType'
import { Link } from 'react-router-dom'
import { BreadcrumbItem } from './types'

interface Props extends BreadcrumbItem {
    className?: string
}

const Breadcrumb: React.FunctionComponent<Props> = props => {
    const { className, text, to } = props
    const containerClassNames = classNames(styles.container, className)

    if (!to) {
        return (
            <div className={containerClassNames}>
                <span className={styles.text}>{text}</span>
                <Icon className={styles.icon} type={IconType.breadcrumb} />
            </div>
        )
    }

    return (
        <Link to={to}>
            <div className={containerClassNames}>
                <span className={styles.text}>{text}</span>
                <Icon className={styles.icon} type={IconType.breadcrumb} />
            </div>
        </Link>
    )
}

export default Breadcrumb
