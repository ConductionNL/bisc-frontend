import classNames from 'classnames'
import HorizontalRule from 'components/Core/HorizontalRule/HorizontalRule'
import React from 'react'
import styles from './ReferenceCard.module.scss'

interface Props {
    TopComponent?: JSX.Element
    BottomComponent?: JSX.Element
    readOnly?: boolean
}

// TODO: Section component should be refactored for this component, the fieldsets ar enot perfectly aligned right now
const ReferenceCard: React.FunctionComponent<Props> = props => {
    const { TopComponent, BottomComponent, readOnly } = props
    const containerClassNames = classNames(styles.container, { [styles['isReadOnly']]: readOnly })

    return (
        <div className={containerClassNames}>
            {TopComponent && <div className={styles.content}>{TopComponent}</div>}
            {BottomComponent && <HorizontalRule spacingDisabled={true} />}
            {BottomComponent && <div className={styles.bottom}>{BottomComponent}</div>}
        </div>
    )
}

export default ReferenceCard
