import { useLingui } from '@lingui/react'
import { useGetOrganizations } from 'api/organization/organization'
import { Student } from 'api/types/types'
import { Select } from 'components/Core/DataEntry/Select'
import Field from 'components/Core/Field/Field'
import Section from 'components/Core/Field/Section'
import Column from 'components/Core/Layout/Column/Column'
import { PageQuery } from 'components/Core/PageQuery/PageQuery'
import Paragraph from 'components/Core/Typography/Paragraph'
import React, { useState } from 'react'
import { NameFormatters } from 'utils/formatters/name/Name'

interface Props {
    readOnly?: true
    student: Student
}

export const TaalhuisParticipantMentorFields: React.FunctionComponent<Props> = props => {
    const { readOnly, student } = props
    const { i18n } = useLingui()
    const [selectedTeamId, setSelectedTeamId] = useState<string | undefined>(student.team?.id)

    return (
        <Section title={i18n._('Begeleiding')}>
            <Column spacing={4}>
                <Field readOnly={readOnly} required={true}>
                    {renderTeamField()}
                </Field>
                <Field readOnly={readOnly} required={true}>
                    {renderMemberField()}
                </Field>
            </Column>
        </Section>
    )

    function renderTeamField() {
        if (readOnly) {
            return <Paragraph>{student.team?.name}</Paragraph>
        }

        return (
            <PageQuery
                // eslint-disable-next-line react-hooks/rules-of-hooks
                queryHook={() => useGetOrganizations({ limit: 1000, type: 'team', parentId: student.languageHouse.id })}
            >
                {data => (
                    <Select
                        name="team"
                        options={getOptions(data.results)}
                        defaultValue={student.team ? getOptions([student.team]) : undefined}
                        onChangeValue={option => setSelectedTeamId(option?.value)}
                    />
                )}
            </PageQuery>
        )
    }

    function renderMemberField() {
        if (readOnly) {
            const name = student.mentor ? NameFormatters.formattedFullname(student.mentor.person) : ''

            return <Paragraph>{name}</Paragraph>
        }

        if (!selectedTeamId) {
            return <Select disabled={true} name="mentor" options={[]} />
        }

        // TODO: BISC-317 use correct endpoint
        return (
            <PageQuery
                // eslint-disable-next-line react-hooks/rules-of-hooks
                queryHook={() => useGetOrganizations({ limit: 1000, type: 'team', parentId: selectedTeamId })}
            >
                {data => <Select name="mentor" options={getOptions(data.results)} />}
            </PageQuery>
        )
    }

    function getOptions(results: { id: string; name: string }[]) {
        return results.map(r => ({ label: r.name, value: r.id }))
    }
}
