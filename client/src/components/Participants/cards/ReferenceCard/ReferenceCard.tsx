import classNames from 'classnames'
import HorizontalRule from 'components/Core/HorizontalRule/HorizontalRule'
import React from 'react'
import styles from './ReferenceCard.module.scss'

interface Props {
    TopComponent?: JSX.Element
    BottomComponent?: JSX.Element
}

const ReferenceCard: React.FunctionComponent<Props> = props => {
    const { TopComponent, BottomComponent } = props
    const containerClassNames = classNames(styles.container)

    return (
        <div className={containerClassNames}>
            <div className={styles.content}>{TopComponent}</div>
            <HorizontalRule spacingDisabled={true} />
            <div className={styles.bottom}>{BottomComponent}</div>
        </div>
    )
}

export default ReferenceCard
