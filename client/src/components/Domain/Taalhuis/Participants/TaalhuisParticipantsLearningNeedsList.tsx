import { i18n } from '@lingui/core'
import { t } from '@lingui/macro'
import { LearningNeed, Participation } from 'api/types/types'
import SectionTitle from 'components/Core/Text/SectionTitle'
import { LearningNeedParticipationItem } from 'components/Domain/LearningNeeds/LearningNeedParticipationItem/LearningNeedParticipationItem'
import { LearningNeedsTable } from 'components/Domain/LearningNeeds/LearningNeedsTable'
import { LearningNeedTableItem } from 'components/Domain/LearningNeeds/LearningNeedTableItem'
import React from 'react'

interface Props {
    onItemClick: (learningNeed: LearningNeed) => void
    learningNeeds: LearningNeed[]
}

export const TaalhuisParticipantLearningNeedsList: React.FC<Props> = props => {
    const { learningNeeds, onItemClick } = props

    return (
        <LearningNeedsTable
            leftHeader={i18n._(t`Leervraag`)}
            rightHeaders={[i18n._(t`Status`), i18n._(t`Gewenst aanbod/Verwezen naar`), i18n._(t`Aanbieder/Notitie`)]}
            learningNeeds={learningNeeds}
            keyExtractor={(_, index, array) => `${index}-${array.length}`}
            renderItem={renderItem}
        />
    )

    function renderItem(learningNeed: LearningNeed) {
        return (
            <LearningNeedTableItem
                learningNeedOnClick={onItemClick}
                LeftComponent={<SectionTitle title={learningNeed.description} heading={'H4'} />}
                renderParticipationItem={renderParticipationItem}
                learningNeed={learningNeed}
                participationKeyExtractor={(_, index, array) => `${index}-${array.length}`}
            />
        )
    }

    function renderParticipationItem(participation: Participation) {
        return <LearningNeedParticipationItem participation={participation} />
    }
}
