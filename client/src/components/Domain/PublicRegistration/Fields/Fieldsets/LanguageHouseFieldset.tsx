import React from 'react'
import { t } from '@lingui/macro'
import { useLingui } from '@lingui/react'
import Field from 'components/Core/Field/Field'
import Section from 'components/Core/Field/Section'
import Column from 'components/Core/Layout/Column/Column'
import Spinner from 'components/Core/Feedback/Spinner/Spinner'
import ErrorBlock from 'components/Core/Feedback/Error/ErrorBlock'
import { useGetTaalhuisOrganizations } from 'api/organization/organization'
import { Select } from 'components/Core/DataEntry/Select'

interface Props {}

export interface LanguageHouseFieldsetModel {
    languageHouse: string
}

const LanguageHouseFieldset: React.FunctionComponent<Props> = props => {
    const { i18n } = useLingui()

    // todo: let the dropdown paginate
    const { data, loading, error, loadMore } = useGetTaalhuisOrganizations({ limit: 1000 })
    const languageHouseOptions = getTaalhuisOptions()

    return (
        <Section title={i18n._(t`Taalhuis`)}>
            <Column spacing={4}>
                <Field label={i18n._(t`Taalhuis`)} horizontal={true} required={true}>
                    {loading && <Spinner />}
                    {error && (
                        <ErrorBlock
                            title={i18n._(t`Er ging iets fout`)}
                            message={i18n._(t`De lijst met Taalhuizen kon niet worden opgehaald`)}
                        />
                    )}
                    {!error && !loading && languageHouseOptions && languageHouseOptions.length > 0 && (
                        <Select
                            name={'languageHouse'}
                            placeholder={i18n._(t`Selecteer Taalhuis...`)}
                            options={languageHouseOptions}
                        />
                    )}
                </Field>
            </Column>
        </Section>
    )

    function getTaalhuisOptions() {
        return data?.results.map(result => {
            return {
                label: result.name,
                value: result.id,
            }
        })
    }
}

export default LanguageHouseFieldset
