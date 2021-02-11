import React from 'react'
import classNames from 'classnames'

import styles from './Breadcrumb.module.scss'

interface Props {
    className?: string
}

const Breadcrumb: React.FunctionComponent<Props> = props => {
    const { className, children } = props
    const containerClassNames = classNames(styles.container, className)

    return <div className={containerClassNames}>{children}</div>
}

export default Breadcrumb
