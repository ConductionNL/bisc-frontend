import { UserContext } from 'components/Providers/UserProvider/context'
import { ParticipationStatusEnum } from 'generated/graphql'
import React, { useContext } from 'react'
import { LearningNeedsItemParticipationType } from '../LearningNeedTableItem'
import { LearningNeedParticipationItemOngoing } from './LearningNeedParticipationItemOngoing'
import { LearningNeedParticipationItemRefered } from './LearningNeedParticipationItemRefered'

interface Props {
    item: LearningNeedsItemParticipationType
}

export const LearningNeedParticipationItem: React.FC<Props> = props => {
    const { item } = props

    // TODO: data should come from LearningNeedsItemType but is not implemented in the backend
    const userContext = useContext(UserContext)

    if (item.status === ParticipationStatusEnum.Referred) {
        return (
            <LearningNeedParticipationItemRefered
                item={item}
                referedFrom={userContext.user?.organizationName ?? undefined}
                referedTo={item.providerName ?? undefined}
            />
        )
    }

    return <LearningNeedParticipationItemOngoing item={item} />
}
