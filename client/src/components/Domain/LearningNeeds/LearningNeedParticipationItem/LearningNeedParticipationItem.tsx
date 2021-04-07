import { UserContext } from 'components/Providers/UserProvider/context'
import { ParticipationStatusEnum } from 'generated/graphql'
import React, { useContext } from 'react'
import { LearningNeedsItemType } from '../LearningNeedTableItem'
import { LearningNeedParticipationItemOngoing } from './LearningNeedParticipationItemOngoing'
import { LearningNeedParticipationItemRefered } from './LearningNeedParticipationItemRefered'

interface Props {
    item: LearningNeedsItemType
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
                referedTo={item.aanbiederName ?? undefined}
            />
        )
    }

    return <LearningNeedParticipationItemOngoing item={item} />
}
