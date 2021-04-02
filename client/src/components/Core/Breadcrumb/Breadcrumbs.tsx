import React from 'react'
import classNames from 'classnames'

import styles from './Breadcrumbs.module.scss'
import Breadcrumb from './Breadcrumb'

interface BreadCrumbItem {
    label: string
    to: string
}

interface Props {
    className?: string
    breadcrumbItems: BreadCrumbItem[]
    children: undefined // this is to enforce the component to be self-closing
}

const Breadcrumbs: React.FunctionComponent<Props> = props => {
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

export default Breadcrumbs
