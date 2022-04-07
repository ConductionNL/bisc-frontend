import { t } from '@lingui/macro'
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
import { useGetTaalhuisOrganization } from 'api/organization/organization'
import ErrorBlock from 'components/Core/Feedback/Error/ErrorBlock'

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

    const parentOrgId = useContext(UserContext).user?.organization.id!
    const {
        data: parentOrgData,
        loading: parentOrgLoading,
        error: parentOrgError,
    } = useGetTaalhuisOrganization(parentOrgId)

    const postcodeOptions = parentOrgData?.languageHouse_postalCodes
        ?.filter(lp => !lp.team) // get unassigned postalcodes
        ?.concat(defaultValues?.team_postalCodes || []) // get postalcodes assigned to the current team
        .map(c => ({ label: c.code, value: c.id }))

    return (
        <>
            <Section title={i18n._(`Gegevens`)}>
                <Field label={i18n._(`Teamnaam`)} horizontal={true} required={true} readOnly={readOnly}>
                    {renderNameInput()}
                </Field>
            </Section>
            <HorizontalRule />
            {parentOrgError ? (
                <ErrorBlock
                    title={i18n._(t`Er ging iets fout`)}
                    message={i18n._(t`Wij konden de gegevens niet ophalen, probeer het opnieuw`)}
                />
            ) : (
                <TaalhuisPostcodeField
                    defaultValues={defaultValues?.team_postalCodes}
                    readOnly={readOnly}
                    options={postcodeOptions}
                    loading={parentOrgLoading}
                    errorPath="team_postalCodes(\[[0-9]+\])?(\.code)?"
                />
            )}
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
