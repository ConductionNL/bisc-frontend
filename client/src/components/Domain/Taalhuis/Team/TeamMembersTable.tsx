import React from 'react'
import { OrganizationEmployee, OrganizationTypeEnum } from 'api/types/types'
import { Table } from 'components/Core/Table/Table'
import { useLingui } from '@lingui/react'
import RoleLabelTag from 'components/Domain/Shared/components/RoleLabelTag/RoleLabelTag'
import Paragraph from 'components/Core/Typography/Paragraph'
import { RemoveTeamMemberButtonContainer } from './RemoveTeamMemberButtonContainer'

interface Props {
    readonly: boolean
    members?: OrganizationEmployee[] | null
    onRemove?: (memberId: string, closeModal: () => void) => void
    removeLoading?: boolean
}

export const TeamMembersTable: React.FunctionComponent<Props> = props => {
    const { members, onRemove, readonly, removeLoading } = props
    const { i18n } = useLingui()

    if (!members?.length) {
        return null
    }

    return (
        <>
            <Table
                flex={1}
                lastItemIsIcon={true}
                headers={[i18n._('ACHTERNAAM'), i18n._('ROEPNAAM'), i18n._('ROL'), '']}
                rows={members.map(renderRow)}
            />
        </>
    )

    function renderRow(member: OrganizationEmployee) {
        return [
            <Paragraph>{member.person.givenName}</Paragraph>,
            <Paragraph>{member.person.familyName}</Paragraph>,
            <RoleLabelTag organizationType={OrganizationTypeEnum.Taalhuis} role={member.role} />,
            readonly ? (
                <></>
            ) : (
                <RemoveTeamMemberButtonContainer
                    member={member}
                    onRemove={closeModal => onRemove?.(member.id, closeModal)}
                    loading={removeLoading}
                />
            ),
        ]
    }
}
