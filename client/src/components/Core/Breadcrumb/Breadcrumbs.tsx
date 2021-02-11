import React from 'react'
import classNames from 'classnames'

import styles from './Breadcrumb.module.scss'
import Icon from '../Icon/Icon'
import { IconType } from '../Icon/IconType'
import { BreadcrumbItem } from './types'

interface Props {
    className?: string
    breadcrumbs: BreadcrumbItem[]
}

const Breadcrumb: React.FunctionComponent<Props> = props => {
    const { className, text } = props
    const containerClassNames = classNames(styles.title, className)

    return (
        <div className={containerClassNames}>
            <span className={styles.text}>{text}</span>
            <Icon type={IconType.arrowRight} />
        </div>
    )
}

export default Breadcrumb
