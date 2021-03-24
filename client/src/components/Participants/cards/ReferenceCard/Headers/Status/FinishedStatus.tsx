import { Trans } from '@lingui/macro'
import classNames from 'classnames'
import LabelTag from 'components/Core/DataDisplay/LabelTag/LabelTag'
import { LabelColor } from 'components/Core/DataDisplay/LabelTag/types'
import ReferenceStatusLabel from 'components/Participants/components/ReferenceStatusLabel'
import React from 'react'
import styles from './FinishedStatus.module.scss'

interface Props {
    title: string
    supplierName: string
}

const FinsishedStatus: React.FunctionComponent<Props> = props => {
    const { title, supplierName } = props
    const containerClassNames = classNames(styles.container)

    return (
        <div className={containerClassNames}>
            <h3 className={styles.title}>{title}</h3>
            <p className={styles.participantGroupMeta}>
                <Trans>
                    <span className={styles.participantGroup}>{supplierName}</span>
                </Trans>
            </p>
            <ReferenceStatusLabel className={styles.statusLabel} status={'ONGOING'} />
        </div>
    )
}

export default FinsishedStatus
