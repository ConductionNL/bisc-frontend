import { useLingui } from '@lingui/react'
import { ParticipationStatus } from 'api/types/types'
import classNames from 'classnames'
import Column from 'components/Core/Layout/Column/Column'
import Row from 'components/Core/Layout/Row/Row'
import ReferenceStatusLabel from 'components/Participants/components/ReferenceStatusLabel'
import React from 'react'
import styles from './OngoingStatus.module.scss'

interface Props {
    title: string
    supplierName?: string
    status: ParticipationStatus
    noBackgroudColor?: boolean
}

const OngoingStatus: React.FunctionComponent<Props> = props => {
    const { i18n } = useLingui()
    const { title, supplierName, status, noBackgroudColor } = props
    const containerClassNames = classNames(styles.container, {
        [styles.noBackgroundColor]: noBackgroudColor,
    })

    return (
        <Column className={containerClassNames}>
            <p className={styles.title}>{title}</p>
            <Row className={styles.participantGroupMeta} spacing={2}>
                <span className={styles.participantGroup}>{supplierName}</span>
                <p>{i18n._('deelname')}</p>
            </Row>
            <ReferenceStatusLabel className={styles.statusLabel} status={status} />
        </Column>
    )
}

export default OngoingStatus
