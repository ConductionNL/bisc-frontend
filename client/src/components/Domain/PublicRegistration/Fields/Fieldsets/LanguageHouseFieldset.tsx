import { useState } from 'react'
import { t } from '@lingui/macro'
import { useLingui } from '@lingui/react'
import Field from 'components/Core/Field/Field'
import Section from 'components/Core/Field/Section'
import Column from 'components/Core/Layout/Column/Column'
import { GetOrganizationField, useGetOrganizations } from 'api/organization/organization'
import { Select } from 'components/Core/DataEntry/Select'
import { PageQuery } from 'components/Core/PageQuery/PageQuery'

export interface LanguageHouseFieldsetModel {
    languageHouse?: string
    team?: string
}

const LanguageHouseFieldset = () => {
    const { i18n } = useLingui()
    const [selectedLanguageHouseId, setSelectedLanguageHouseId] = useState<string>('')

    return (
        <Section title={i18n._(t`Taalhuis`)} description={i18n._('Bij welk Taalhuis wilt u de deelnemer aanmelden?')}>
            <Column spacing={4}>
                <Field label={i18n._(t`Taalhuis`)} horizontal={true} required={true}>
                    {renderLanguageHouseSelect()}
                </Field>
                <Field label={i18n._('Vestiging')} required={true} horizontal={true}>
                    {renderTeamSelect()}
                </Field>
            </Column>
        </Section>
    )

    function renderLanguageHouseSelect() {
        return (
            // TODO: BISC-316 reduce limit and use with infinite scroll after api is fixed
            // eslint-disable-next-line react-hooks/rules-of-hooks
            <PageQuery
                queryHook={() =>
                    useGetOrganizations({ limit: 1000, type: 'taalhuis', fields: [GetOrganizationField.Name] })
                }
            >
                {data => (
                    <Select
                        name={'languageHouse'}
                        placeholder={i18n._(t`Selecteer Taalhuis...`)}
                        options={getOptions(data.results)}
                        onChangeValue={option => setSelectedLanguageHouseId(option?.value ?? '')}
                    />
                )}
            </PageQuery>
        )
    }

    function renderTeamSelect() {
        if (!selectedLanguageHouseId) {
            return <Select disabled={true} name="team" options={[]} placeholder={i18n._('Selecteer vestiging...')} />
        }

        return (
            <PageQuery
                key={selectedLanguageHouseId}
                // eslint-disable-next-line react-hooks/rules-of-hooks
                queryHook={() =>
                    useGetOrganizations({
                        limit: 1000,
                        type: 'team',
                        parentId: selectedLanguageHouseId,
                        fields: [GetOrganizationField.Name],
                    })
                }
            >
                {data => (
                    <Select
                        name="team"
                        options={getOptions(data.results)}
                        placeholder={i18n._('Selecteer vestiging...')}
                    />
                )}
            </PageQuery>
        )
    }

    function getOptions(results: { id: string; name: string }[]) {
        return results.map(r => ({ label: r.name, value: r.id }))
    }
}

export default LanguageHouseFieldset
