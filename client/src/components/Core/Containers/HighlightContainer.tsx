import classnames from 'classnames'
import React from 'react'
import styles from './HighlightContainer.module.scss'

interface Props {}

export const HighlightContainer: React.FC<Props> = ({ children }) => {
    const containerClassNames = classnames(styles.container)
    return <div className={containerClassNames}>{children}</div>
}
