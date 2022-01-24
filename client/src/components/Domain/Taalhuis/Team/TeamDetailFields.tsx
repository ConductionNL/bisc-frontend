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

interface Props {
    readOnly?: boolean
    defaultValues?: Team
    onEditMembers?: () => void
}

export interface TeamDetailFormFields {}

export const TeamDetailFields: React.FunctionComponent<Props> = (props: Props) => {
    const { readOnly, defaultValues, onEditMembers } = props
    const { i18n } = useLingui()

    // only allowed to add/remove team members in view
    const readOnlyMemberFields = !readOnly

    return (
        <>
            <Section title={i18n._(`Gegevens`)}>
                <Field label={i18n._(`Achternaam`)} horizontal={true} required={true} readOnly={readOnly}>
                    {renderNameInput()}
                </Field>
            </Section>
            <HorizontalRule />
            <TaalhuisPostcodeField
                defaultValues={defaultValues?.team_postalCodes}
                readonly={readOnly}
                options={[]} // TODO: BISC-314
                errorPath="" // TODO: BISC-314
                noCreate={true}
            />
            <HorizontalRule />
            <SectionTitleWithBorder title={i18n._(`Teamleden`)} />
            <TeamMembersField
                readonly={readOnlyMemberFields}
                members={defaultValues?.members}
                onRemove={onEditMembers}
            />
        </>
    )

    function renderNameInput() {
        if (readOnly) {
            return <Paragraph>{defaultValues?.name}</Paragraph>
        }

        return // TODO
    }
}
