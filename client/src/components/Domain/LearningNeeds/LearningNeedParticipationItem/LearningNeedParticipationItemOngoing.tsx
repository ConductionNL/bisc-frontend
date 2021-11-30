import LabelTag from 'components/Core/DataDisplay/LabelTag/LabelTag'
import { LabelColor } from 'components/Core/DataDisplay/LabelTag/types'
import { IconType } from 'components/Core/Icon/IconType'
import { ParticipationStatusEnum } from 'generated/enums'
import { Participation } from 'generated/graphql'
import React from 'react'
import { ParticipationStatusLabelTag } from '../ParticipationStatusLabelTag'
import styles from './LearningNeedParticipationItem.module.scss'

interface Props {
    participation: Participation
}

export const LearningNeedParticipationItemOngoing: React.FC<Props> = props => {
    const { participation } = props

    return (
        <div className={styles.container}>
            {renderStatus()}
            {renderOffer()}
            {renderSupplier()}
        </div>
    )

    function renderStatus() {
        return <ParticipationStatusLabelTag status={participation.status as ParticipationStatusEnum} />
    }

    function renderOffer() {
        if (!participation.offerName) {
            return null
        }

        return <LabelTag label={participation.offerName} color={LabelColor.white} icon={IconType.offer} />
    }

    function renderSupplier() {
        if (!participation.aanbiederName) {
            return <div />
        }

        return <LabelTag label={participation.aanbiederName} color={LabelColor.white} icon={IconType.providers} />
    }
}
