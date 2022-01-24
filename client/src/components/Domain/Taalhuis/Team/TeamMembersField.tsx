import React from 'react'
import { OrganizationTypeEnum, TaalhuisEmployeeRole, Team } from 'api/types/types'
import { Table } from 'components/Core/Table/Table'
import { useLingui } from '@lingui/react'
import RoleLabelTag from 'components/Domain/Shared/components/RoleLabelTag/RoleLabelTag'
import Paragraph from 'components/Core/Typography/Paragraph'
import { RemoveTeamMemberButtonContainer } from './RemoveTeamMemberButtonContainer'

interface Props {
    readonly: boolean
    members?: Team['members'] | null // TODO: BISC-314
    onRemove?: () => void
}

export const TeamMembersField: React.FunctionComponent<Props> = props => {
    const { members, onRemove } = props
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

    // TODO: BISC-314
    function renderRow(member: any) {
        return [
            <Paragraph>TODO: Aaa</Paragraph>,
            <Paragraph>TODO: Bsss</Paragraph>,
            <RoleLabelTag organizationType={OrganizationTypeEnum.Taalhuis} role={TaalhuisEmployeeRole.Employee} />,
            <RemoveTeamMemberButtonContainer member={member} onRemove={onRemove} />,
        ]
    }
}
