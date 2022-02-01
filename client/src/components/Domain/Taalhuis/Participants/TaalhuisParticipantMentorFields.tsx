import { useLingui } from '@lingui/react'
import { useGetOrganizationEmployees } from 'api/employee/employee'
import { useGetOrganizations } from 'api/organization/organization'
import { OrganizationEmployee, Student } from 'api/types/types'
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

export interface TaalhuisParticipantMentorFormFields {
    team?: string
    mentor?: string
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
                        isClearable={false}
                        name="team"
                        options={getTeamOptions(data.results)}
                        defaultValue={student.team ? getTeamOptions([student.team]) : undefined}
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

        return (
            <PageQuery
                key={selectedTeamId}
                // eslint-disable-next-line react-hooks/rules-of-hooks
                queryHook={() => useGetOrganizationEmployees(selectedTeamId, 1000)}
            >
                {data => (
                    <Select
                        name="mentor"
                        isClearable={false}
                        options={getMemberOptions(data.results)}
                        defaultValue={student.mentor ? getMemberOptions([student.mentor]) : undefined}
                    />
                )}
            </PageQuery>
        )
    }

    function getTeamOptions(results: { id: string; name: string }[]) {
        return results.map(r => ({ label: r.name, value: r.id }))
    }

    function getMemberOptions(members: OrganizationEmployee[]) {
        return members.map(employee => ({
            label: NameFormatters.formattedFullname(employee.person),
            value: employee.id,
        }))
    }
}
