import { Team } from 'api/types/types'
import Column from 'components/Core/Layout/Column/Column'
import React from 'react'
import { TeamDetailFields } from './TeamDetailFields'

interface Props {
    team: Team
}

export const TeamDetailContainer: React.FunctionComponent<Props> = ({ team }) => {
    // TODO: BISC-314 add mutation

    return (
        <Column spacing={10}>
            <TeamDetailFields
                defaultValues={team}
                readOnly={true}
                onAddMembers={handleAdd}
                onRemoveMember={handleRemove}
            />
        </Column>
    )

    // TODO: BISC-314
    function handleAdd(memberIds: string[], closeModal: () => void) {
        return
    }

    // TODO: BISC-314
    function handleRemove(memberId: string, closeModal: () => void) {
        return
    }
}
