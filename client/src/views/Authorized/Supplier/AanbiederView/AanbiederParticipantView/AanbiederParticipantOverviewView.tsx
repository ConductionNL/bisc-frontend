import React from 'react'

interface Props {
    participantId: number
}

// TODO
export const AanbiederParticipantOverviewView: React.FunctionComponent<Props> = ({ participantId }) => {
    return (
        <div>
            <p>id: {participantId}</p>
        </div>
    )
}
