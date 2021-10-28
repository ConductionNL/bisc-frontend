import LabelTag from 'components/Core/DataDisplay/LabelTag/LabelTag'
import { LabelColor } from 'components/Core/DataDisplay/LabelTag/types'
import { IconType } from 'components/Core/Icon/IconType'
import { ParticipationStatusEnum } from 'generated/enums'
import React from 'react'
import { LearningNeedsItemParticipationType } from '../LearningNeedTableItem'
import { ParticipationStatusLabelTag } from '../ParticipationStatusLabelTag'
import styles from './LearningNeedParticipationItem.module.scss'

interface Props {
    item: LearningNeedsItemParticipationType
}

export const LearningNeedParticipationItemOngoing: React.FC<Props> = props => {
    const { item } = props

    return (
        <div className={styles.container}>
            {renderStatus()}
            {renderOffer()}
            {renderSupplier()}
        </div>
    )

    function renderStatus() {
        return <ParticipationStatusLabelTag status={item.status as ParticipationStatusEnum} />
    }

    function renderOffer() {
        if (!item.offerName) {
            return null
        }

        return <LabelTag label={item.offerName} color={LabelColor.white} icon={IconType.offer} />
    }

    function renderSupplier() {
        if (!item.aanbiederName) {
            return <div />
        }

        return <LabelTag label={item.aanbiederName} color={LabelColor.white} icon={IconType.providers} />
    }
}
