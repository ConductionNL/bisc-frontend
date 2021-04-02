import React from 'react'
import classNames from 'classnames'
import { Location } from 'history'

import styles from './Breadcrumbs.module.scss'
import Breadcrumb from './Breadcrumb'

interface BreadcrumbItem {
    label: string
    to: string | Location
}

interface Props {
    className?: string
    breadcrumbItems: BreadcrumbItem[]
}

export const Breadcrumbs: React.FunctionComponent<Props> = props => {
    const { className, breadcrumbItems } = props
    const containerClassNames = classNames(styles.container, className)

    return (
        <div className={containerClassNames}>
            {breadcrumbItems.map((item, i) => (
                <Breadcrumb key={`breadcrumb-${i}`} text={item.label} to={item.to} />
            ))}
        </div>
    )
}
