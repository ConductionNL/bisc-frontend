import { Trans } from '@lingui/macro'
import classNames from 'classnames'
import ReferenceStatusLabel, {
    ReferenceStatusLabelStatus,
} from 'components/Participants/components/ReferenceStatusLabel'
import React from 'react'
import styles from './OngoingStatus.module.scss'

interface Props {
    title: string
    supplierName: string
    status: ReferenceStatusLabelStatus | string
    readOnly?: boolean
}

const OngoingStatus: React.FunctionComponent<Props> = props => {
    const { title, supplierName, status, readOnly } = props
    const containerClassNames = classNames(styles.container, { [styles['isReadOnly']]: readOnly })

    return (
        <div className={containerClassNames}>
            <h3 className={styles.title}>{title}</h3>
            <p className={styles.participantGroupMeta}>
                <Trans>
                    <span className={styles.participantGroup}>{supplierName}</span>
                    Deelnamegroep
                </Trans>
            </p>
            <ReferenceStatusLabel className={styles.statusLabel} status={status} />
        </div>
    )
}

export default OngoingStatus
