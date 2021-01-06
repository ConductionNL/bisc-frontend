import React from 'react'
import classNames from 'classnames'

import styles from './Row.module.scss'

interface Props {
    className?: string
    wrap?: boolean
}

const Row: React.FunctionComponent<Props> = props => {
    const { children, className, wrap } = props

    const containerClassName = classNames(styles.container, className, {
        [styles.wrap]: wrap,
    })

    return <div className={containerClassName}>{children}</div>
}

export default Row
