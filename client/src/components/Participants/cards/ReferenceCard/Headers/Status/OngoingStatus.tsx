import classNames from 'classnames'
import React from 'react'
import styles from './OngoingStatus.module.scss'

interface Props {
    MoreInformationComponent?: JSX.Element
    title: string
    supplierName: string
}

const OnGoingStatus: React.FunctionComponent<Props> = props => {
    const { title, supplierName } = props
    const containerClassNames = classNames(styles.container)

    return (
        <div className={containerClassNames}>
            <p>{title}</p>
            <p>{supplierName}</p>
        </div>
    )
}

export default OnGoingStatus
