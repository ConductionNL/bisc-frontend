import LabelTag from 'components/Core/DataDisplay/LabelTag/LabelTag'
import { LabelColor } from 'components/Core/DataDisplay/LabelTag/types'
import { IconType } from 'components/Core/Icon/IconType'
import { ParticipationStatusEnum } from 'generated/enums'
import { Participation } from 'generated/graphql'
import React from 'react'
import { RefererContainer } from '../LearningNeedsRefererContainer'
import { ParticipationStatusLabelTag } from '../ParticipationStatusLabelTag'
import styles from './LearningNeedParticipationItem.module.scss'

interface Props {
    item: Participation
    referedFrom?: string
    referedTo?: string
}

export const LearningNeedParticipationItemRefered: React.FC<Props> = props => {
    const { item, referedFrom, referedTo } = props

    return (
        <div className={styles.container}>
            {renderStatus()}
            {renderReference()}
            {renderNote()}
        </div>
    )

    function renderStatus() {
        return <ParticipationStatusLabelTag status={item.status as ParticipationStatusEnum} />
    }

    function renderReference() {
        const refered = [referedFrom, referedTo]
        const filteredRefered = refered.filter(reference => !!reference) as string[]

        return <RefererContainer labels={filteredRefered} />
    }

    function renderNote() {
        if (!item.aanbiederName) {
            return null
        }

        if (!item.aanbiederNote) {
            return <LabelTag label={item.aanbiederName} color={LabelColor.white} icon={IconType.providers} />
        }

        return <LabelTag label={item.aanbiederNote} color={LabelColor.white} icon={IconType.providers} />
    }
}
