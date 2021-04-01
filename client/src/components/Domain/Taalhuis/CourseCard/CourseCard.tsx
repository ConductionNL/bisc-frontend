import React from 'react'
import classNames from 'classnames'
import styles from './CourseCard.module.scss'

interface Props {
    className?: string
}

const CourseCard: React.FunctionComponent<Props> = props => {
    const { className, children } = props
    const containerClassName = classNames(styles.container, className)

    return <div className={containerClassName}>{children}</div>
}

export default CourseCard
