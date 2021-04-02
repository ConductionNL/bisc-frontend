import { i18n } from '@lingui/core'
import { t } from '@lingui/macro'
import SectionTitle from 'components/Core/Text/SectionTitle'
import { LearningNeedParticipationItem } from 'components/Domain/LearningNeeds/LearningNeedParticipationItem'
import { LearningNeedsTable } from 'components/Domain/LearningNeeds/LearningNeedsTable'
import { LearningNeedsItemType, LearningNeedTableItem } from 'components/Domain/LearningNeeds/LearningNeedTableItem'
import { LearningNeedsQuery } from 'generated/graphql'
import { Location } from 'history'
import React from 'react'

interface Props {
    learningItemTo: Location
    queryData: LearningNeedsQuery
}

export const TaalhuisParticipantLearningNeedsList: React.FC<Props> = props => {
    const { queryData, learningItemTo } = props

    return (
        <LearningNeedsTable
            leftHeader={i18n._(t`Leervraag`)}
            rightHeaders={[i18n._(t`Status`), i18n._(t`Aanbod/Verwezen naar`), i18n._(t`Aanbieder/Notitie`)]}
            data={queryData.learningNeeds}
            keyExtractor={(_, index, array) => `${index}-${array.length}`}
            renderItem={renderItem}
        />
    )

    function renderItem(item: LearningNeedsQuery['learningNeeds'][0]) {
        return (
            <LearningNeedTableItem
                learningNeedTo={learningItemTo}
                LeftComponent={<SectionTitle title={item.learningNeedDescription} heading={'H4'} />}
                participations={item.participations}
                renderParticipationItem={renderParticipationItem}
                participationKeyExtractor={(_, index, array) => `${index}-${array.length}`}
            />
        )
    }

    function renderParticipationItem(item: LearningNeedsItemType) {
        return <LearningNeedParticipationItem item={item} />
    }
}
