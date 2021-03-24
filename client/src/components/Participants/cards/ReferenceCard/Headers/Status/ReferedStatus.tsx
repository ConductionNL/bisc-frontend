import classNames from 'classnames'
import React from 'react'
import styles from './ReferedStatus.module.scss'

interface Props {
    title: string
    supplierName: string
}

const ReferedStatus: React.FunctionComponent<Props> = props => {
    const { title, supplierName } = props
    const containerClassNames = classNames(styles.container)

    return (
        <div className={containerClassNames}>
            <p>{title}</p>
            <p>{supplierName}</p>
        </div>
    )
}

export default ReferedStatus
