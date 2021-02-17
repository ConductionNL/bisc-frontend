import classNames from 'classnames'
import React from 'react'
import styles from './HorizontalRule.module.scss'

interface Props {
    className?: string
}

const HorizontalRule: React.FunctionComponent<Props> = props => {
    const { className } = props
    const hrClassName = classNames(styles.hr, className)

    return <hr className={hrClassName} />
}

export default HorizontalRule
