import React from 'react'

interface Props {
    participantId: number
    participantGoalId: number
}

// TODO
export const AanbiederParticipantGoalDetailView: React.FunctionComponent<Props> = props => {
    const { participantId, participantGoalId } = props

    return (
        <div>
            <p>{participantId}</p>
            <p>{participantGoalId}</p>
        </div>
    )
}
