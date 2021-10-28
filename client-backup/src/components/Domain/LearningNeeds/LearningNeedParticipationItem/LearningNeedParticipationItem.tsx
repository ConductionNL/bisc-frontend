import { UserContext } from 'components/Providers/UserProvider/context'
import { ParticipationStatusEnum } from 'generated/enums'
import React, { useContext } from 'react'
import { LearningNeedsItemParticipationType } from '../LearningNeedTableItem'
import { LearningNeedParticipationItemOngoing } from './LearningNeedParticipationItemOngoing'
import { LearningNeedParticipationItemRefered } from './LearningNeedParticipationItemRefered'

interface Props {
    item: LearningNeedsItemParticipationType
}

export const LearningNeedParticipationItem: React.FC<Props> = props => {
    const { item } = props
    const userContext = useContext(UserContext)

    if (item.status === ParticipationStatusEnum.Referred) {
        return (
            <LearningNeedParticipationItemRefered
                item={item}
                referedFrom={userContext.user?.organizationName ?? undefined}
                referedTo={item.aanbiederName || undefined}
            />
        )
    }

    return <LearningNeedParticipationItemOngoing item={item} />
}
