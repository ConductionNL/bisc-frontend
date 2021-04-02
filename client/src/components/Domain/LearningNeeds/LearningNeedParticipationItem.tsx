import LabelTag from 'components/Core/DataDisplay/LabelTag/LabelTag'
import { LabelColor } from 'components/Core/DataDisplay/LabelTag/types'
import { IconType } from 'components/Core/Icon/IconType'
import React from 'react'
import { RefererContainer } from './LearningNeedsRefererContainer'
import { LearningNeedsItemType } from './LearningNeedTableItem'
import { ParticipationStatusLabelTag } from './ParticipationStatusLabelTag'

interface Props {
    item: LearningNeedsItemType
}

export const LearningNeedParticipationItem: React.FC<Props> = props => {
    const { item } = props

    return (
        <div>
            <ParticipationStatusLabelTag status={item.status} />

            <LabelTag label={item.offerName ?? ''} color={LabelColor.white} icon={IconType.offer} />

            <RefererContainer labels={[item.detailsEngagements ?? '']} />

            {item.aanbiederName && (
                <LabelTag label={item.aanbiederName} color={LabelColor.white} icon={IconType.providers} />
            )}

            {item.aanbiederNote && (
                <LabelTag label={item.aanbiederNote} color={LabelColor.white} icon={IconType.providers} />
            )}
        </div>
    )
}
