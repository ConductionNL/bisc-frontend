import React from 'react'
import classNames from 'classnames'

import styles from './Row.module.scss'

interface Props {
    className?: string
    wrap?: boolean
    justifyContent?: 'flex-end' | 'flex-start' | 'center'
}

const Row: React.FunctionComponent<Props> = props => {
    const { children, className, wrap, justifyContent } = props

    const containerClassName = classNames(styles.container, className, {
        [styles.wrap]: wrap,
        [styles[justifyContent || '']]: !!justifyContent,
    })

    return <div className={containerClassName}>{children}</div>
}

export default Row
