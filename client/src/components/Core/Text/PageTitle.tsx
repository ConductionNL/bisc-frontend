import React from 'react'
import classNames from 'classnames'

import styles from './PageTitle.module.scss'

interface Props {
    className?: string
    title: string
}

const PageTitle: React.FunctionComponent<Props> = props => {
    const { className, title } = props

    return <h1 className={classNames(styles.title, className)}>{title}</h1>
}

export default PageTitle
