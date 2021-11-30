import { UserContext } from 'components/Providers/UserProvider/context'
import { ParticipationStatusEnum } from 'generated/enums'
import { Participation } from 'generated/graphql'
import React, { useContext } from 'react'
import { LearningNeedParticipationItemOngoing } from './LearningNeedParticipationItemOngoing'
import { LearningNeedParticipationItemRefered } from './LearningNeedParticipationItemRefered'

interface Props {
    participation: Participation
}

export const LearningNeedParticipationItem: React.FC<Props> = props => {
    const { participation } = props
    const userContext = useContext(UserContext)

    if (participation.status === ParticipationStatusEnum.Referred) {
        return (
            <LearningNeedParticipationItemRefered
                item={participation}
                referedFrom={userContext.user?.organization.name ?? undefined}
                referedTo={participation.aanbiederName || undefined}
            />
        )
    }

    return <LearningNeedParticipationItemOngoing participation={participation} />
}
