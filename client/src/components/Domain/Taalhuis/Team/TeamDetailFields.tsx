import React, { useContext } from 'react'
import { OrganizationEmployee, Team } from 'api/types/types'
import Section from 'components/Core/Field/Section'
import { useLingui } from '@lingui/react'
import Field from 'components/Core/Field/Field'
import Paragraph from 'components/Core/Typography/Paragraph'
import { TaalhuisPostcodeField, TaalhuisPostcodeFieldModel } from '../TaalhuisPostcodeField'
import { TeamMembersTable } from './TeamMembersTable'
import { SectionTitleWithBorder } from 'components/Core/Field/SectionTitleWithBorder'
import HorizontalRule from 'components/Core/HorizontalRule/HorizontalRule'
import Row from 'components/Core/Layout/Row/Row'
import { AddTeamMembersButtonContainer } from './AddTeamMembersButtonContainer'
import Input from 'components/Core/DataEntry/Input'
import { UserContext } from 'components/Providers/UserProvider/context'

interface Props {
    readOnly?: boolean
    defaultValues?: Team
    memberMutationLoading?: boolean
    hideMembersTable?: boolean
    onRemoveMember?: (employeeId: string, closeModal: () => void) => void // if given, renders table action buttons
    onAddMembers?: (employees: OrganizationEmployee[], closeModal: () => void) => void // if given, renders add button
}

export type TeamDetailFormFields = TaalhuisPostcodeFieldModel & { name: string }

export const TeamDetailFields: React.FunctionComponent<Props> = (props: Props) => {
    const { readOnly, defaultValues, onRemoveMember, onAddMembers, memberMutationLoading } = props
    const { i18n } = useLingui()

    const organization = useContext(UserContext).user?.organization
    const postcodeOptions = organization?.languageHouse_postalCodes
        ?.filter(lp => !organization.team_postalCodes?.some(tp => lp.id === tp.id))
        .map(c => ({ label: c.code, value: c.id }))

    return (
        <>
            <Section title={i18n._(`Gegevens`)}>
                <Field label={i18n._(`Teamnaam`)} horizontal={true} required={true} readOnly={readOnly}>
                    {renderNameInput()}
                </Field>
            </Section>
            <HorizontalRule />
            <TaalhuisPostcodeField
                defaultValues={defaultValues?.team_postalCodes}
                readOnly={readOnly}
                options={postcodeOptions}
                errorPath="team_postalCodes(\[[0-9]+\])?(\.code)?"
            />
            {renderMembersSection()}
        </>
    )

    function renderNameInput() {
        if (readOnly) {
            return <Paragraph>{defaultValues?.name}</Paragraph>
        }

        return (
            <Input name="name" errorPath="name" placeholder={i18n._('Naam team')} defaultValue={defaultValues?.name} />
        )
    }

    function renderMembersSection() {
        if (props.hideMembersTable) {
            return
        }

        return (
            <>
                <HorizontalRule />
                <Row justifyContent="space-between">
                    <SectionTitleWithBorder title={i18n._(`Teamleden`)} />
                    {onAddMembers && (
                        <AddTeamMembersButtonContainer
                            existingMembers={defaultValues?.members}
                            onAdd={onAddMembers}
                            loading={memberMutationLoading}
                        />
                    )}
                </Row>
                <TeamMembersTable
                    readonly={!onRemoveMember}
                    members={defaultValues?.members}
                    onRemove={onRemoveMember}
                    removeLoading={memberMutationLoading}
                />
            </>
        )
    }
}
