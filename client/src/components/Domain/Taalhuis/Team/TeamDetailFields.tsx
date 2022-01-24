import React from 'react'
import { Team } from 'api/types/types'
import Section from 'components/Core/Field/Section'
import { useLingui } from '@lingui/react'
import Field from 'components/Core/Field/Field'
import Paragraph from 'components/Core/Typography/Paragraph'
import { TaalhuisPostcodeField } from '../TaalhuisPostcodeField'
import { TeamMembersField } from './TeamMembersField'
import { SectionTitleWithBorder } from 'components/Core/Field/SectionTitleWithBorder'
import HorizontalRule from 'components/Core/HorizontalRule/HorizontalRule'
import Row from 'components/Core/Layout/Row/Row'
import { AddTeamMembersButtonContainer } from './AddTeamMembersButtonContainer'
import Input from 'components/Core/DataEntry/Input'

interface Props {
    readOnly?: boolean
    defaultValues?: Team
    onRemoveMember?: (memberId: string, closeModal: () => void) => void
    onAddMembers?: (memberIds: string[], closeModal: () => void) => void
}

export interface TeamDetailFormFields {}

export const TeamDetailFields: React.FunctionComponent<Props> = (props: Props) => {
    const { readOnly, defaultValues, onRemoveMember, onAddMembers } = props
    const { i18n } = useLingui()

    // only allowed to add/remove team members in view
    const readOnlyMemberFields = !readOnly

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
                readonly={readOnly}
                // optionsQueryHook={useGetPostalCodes} // TODO: BISC-314
                errorPath="" // TODO: BISC-314
                noCreate={true}
            />
            <HorizontalRule />
            <Row justifyContent="space-between">
                <SectionTitleWithBorder title={i18n._(`Teamleden`)} />
                {!readOnlyMemberFields && onAddMembers && (
                    <AddTeamMembersButtonContainer existingMembers={defaultValues?.members} onAdd={onAddMembers} />
                )}
            </Row>
            <TeamMembersField
                readonly={readOnlyMemberFields}
                members={defaultValues?.members}
                onRemove={onRemoveMember}
            />
        </>
    )

    function renderNameInput() {
        if (readOnly) {
            return <Paragraph>{defaultValues?.name}</Paragraph>
        }

        // TODO: BISC-314 verify
        return (
            <Input name="name" errorPath="name" placeholder={i18n._('Naam team')} defaultValue={defaultValues?.name} />
        )
    }
}
