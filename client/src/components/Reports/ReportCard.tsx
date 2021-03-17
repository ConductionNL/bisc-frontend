import classNames from 'classnames'
import React from 'react'
import styles from './ReportCard.module.scss'

interface Props {
    className?: string
    title: string
    description: string
    ActionButton?: JSX.Element
}
const ReportCard: React.FunctionComponent<Props> = props => {
    const { className, ActionButton, title, description } = props
    const containerClassNames = classNames(styles.container, className)

    return (
        <div className={containerClassNames}>
            <h3 className={styles.title}>{title}</h3>
            <p className={styles.description}>{description}</p>
            <div className={styles.actionContainer}>{ActionButton}</div>
        </div>
    )
}

export default ReportCard
