import React from 'react'
import { t } from '@lingui/macro'
import { useLingui } from '@lingui/react'
import Select from 'components/Core/DataEntry/Select'
import Field from 'components/Core/Field/Field'
import Section from 'components/Core/Field/Section'
import Column from 'components/Core/Layout/Column/Column'

interface Props {
    queryData?: any
}

export interface LanguageHouseFieldsetModel {
    languageHouse: string
}

const LanguageHouseFieldset: React.FunctionComponent<Props> = props => {
    const { queryData } = props
    const { i18n } = useLingui()

    return (
        <Section title={i18n._(t`Taalhuis`)}>
            <Column spacing={4}>
                <Field label={i18n._(t`Taalhuis`)} horizontal={true} required={true}>
                    <Select
                        list="taalhuis"
                        name={'languageHouse'}
                        placeholder={i18n._(t`Selecteer Taalhuis...`)}
                        options={[]} //getTaalhuisOptions()}
                    />
                </Field>
            </Column>
        </Section>
    )

    function getTaalhuisOptions() {
        // return queryData ? queryData.languageHouses.map(item => ({ label: item.name, value: item.id })) : []
    }
}

export default LanguageHouseFieldset
