import { i18n } from '@lingui/core'
import { t } from '@lingui/macro'
import SectionTitle from 'components/Core/Text/SectionTitle'
import { LearningNeedParticipationItem } from 'components/Domain/LearningNeeds/LearningNeedParticipationItem/LearningNeedParticipationItem'
import { LearningNeedsTable } from 'components/Domain/LearningNeeds/LearningNeedsTable'
import {
    LearningNeedsItemParticipationType,
    LearningNeedsItemType,
    LearningNeedTableItem,
} from 'components/Domain/LearningNeeds/LearningNeedTableItem'
import { LearningNeed, LearningNeedsQuery } from 'generated/graphql'
import React from 'react'

interface Props {
    onItemClick: (item: LearningNeedsItemType) => void
    queryData: LearningNeedsQuery
}

export const TaalhuisParticipantLearningNeedsList: React.FC<Props> = props => {
    const { queryData, onItemClick } = props

    const learningNeeds: LearningNeed[] = []
    if (queryData.learningNeeds?.edges?.length) {
        for (const edge of queryData.learningNeeds?.edges) {
            if (edge?.node) {
                learningNeeds.push(edge.node)
            }
        }
    }

    return (
        <LearningNeedsTable
            leftHeader={i18n._(t`Leervraag`)}
            rightHeaders={[i18n._(t`Status`), i18n._(t`Aanbod/Verwezen naar`), i18n._(t`Aanbieder/Notitie`)]}
            data={learningNeeds}
            keyExtractor={(_, index, array) => `${index}-${array.length}`}
            renderItem={renderItem}
        />
    )

    function renderItem(item: LearningNeed) {
        return (
            <LearningNeedTableItem
                learningNeedOnClick={onItemClick}
                LeftComponent={<SectionTitle title={item.learningNeedDescription} heading={'H4'} />}
                renderParticipationItem={renderParticipationItem}
                item={item}
                participationKeyExtractor={(_, index, array) => `${index}-${array.length}`}
            />
        )
    }

    function renderParticipationItem(item: LearningNeedsItemParticipationType) {
        return <LearningNeedParticipationItem item={item} />
    }
}
