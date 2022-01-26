import { useLingui } from '@lingui/react'
import { usePutTeam } from 'api/team/team'
import { Team } from 'api/types/types'
import { NotificationsManager } from 'components/Core/Feedback/Notifications/NotificationsManager'
import Column from 'components/Core/Layout/Column/Column'
import React from 'react'
import { TeamDetailFields } from './TeamDetailFields'

interface Props {
    team: Team
    onEditMembers: () => void
}

export const TeamDetailContainer: React.FunctionComponent<Props> = props => {
    const { team } = props
    const { i18n } = useLingui()
    const { mutate, loading } = usePutTeam(team.id)

    return (
        <Column spacing={10}>
            <TeamDetailFields
                defaultValues={team}
                readOnly={true}
                onAddMembers={handleAdd}
                onRemoveMember={handleRemove}
                memberMutationLoading={loading}
            />
        </Column>
    )

    async function handleAdd(employeeIds: string[], closeModal: () => void) {
        const existingEmployeeIds = team.members?.map(m => m.id) || []

        await handleEdit([...existingEmployeeIds, ...employeeIds], closeModal)
    }

    async function handleRemove(memberId: string, closeModal: () => void) {
        const filteredEmployeeIds = team.members?.filter(m => m.id !== memberId).map(m => m.id) || []

        await handleEdit(filteredEmployeeIds, closeModal)
    }

    async function handleEdit(memberIds: string[], onEdit: () => void) {
        try {
            await mutate({
                id: team.id,
                name: team.name,
                members: memberIds || null,
            })

            NotificationsManager.success(
                i18n._(`Team is bijgewerkt`),
                i18n._(`Je wordt teruggestuurd naar het overzicht`)
            )

            onEdit()
            props.onEditMembers()
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
            if (error.data) {
                NotificationsManager.error(i18n._(`Actie mislukt`), i18n._(`Er is een onverwachte fout opgetreden`))
            }
        }
    }
}
