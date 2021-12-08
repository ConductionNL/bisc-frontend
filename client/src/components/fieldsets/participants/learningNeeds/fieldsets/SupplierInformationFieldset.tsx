import { t } from '@lingui/macro'
import { useLingui } from '@lingui/react'
import { useGetSuppliers } from 'api/supplier/supplier'
import { Maybe, ParticipationProviderOption, Supplier } from 'api/types/types'
import ConditionalCard from 'components/Core/Containers/ConditionalCard'
import Input from 'components/Core/DataEntry/Input'
import Select, { OptionsType } from 'components/Core/DataEntry/Select'
import TextArea from 'components/Core/DataEntry/TextArea'
import Spinner from 'components/Core/Feedback/Spinner/Spinner'
import Field from 'components/Core/Field/Field'
import Section from 'components/Core/Field/Section'
import Column from 'components/Core/Layout/Column/Column'
import Paragraph from 'components/Core/Typography/Paragraph'
import React, { useState } from 'react'
// import { GenericValidators } from 'utils/validators/GenericValidators'

interface Props {
    defaultValues?: SupplierInformationFieldsetDefaultValues
    readOnly?: boolean
    onSupplierChange?: (selectedOther: boolean, value?: string) => void
}

export interface SupplierInformationFieldsetModel extends SupplierInformationFieldsetDefaultValues {}

export interface SupplierInformationFieldsetDefaultValues {
    provider?: Maybe<string> // this should be the id
    providerOther?: Maybe<string>
    explanation?: Maybe<string>
}

// TECHNICAL-DEBT: select component should allow pagination
const SupplierInformationFieldset: React.FunctionComponent<Props> = props => {
    const { defaultValues, readOnly, onSupplierChange } = props
    const { i18n } = useLingui()
    const [hasSelectedOther, setHasSelectedOther] = useState(!!defaultValues?.providerOther)

    if (readOnly) {
        return (
            <Section title={i18n._(t`Aanbieder`)}>
                <Column spacing={4}>
                    <Field label={i18n._(t`Aanbieder`)} horizontal={true}>
                        <Paragraph>{defaultValues?.provider || defaultValues?.providerOther}</Paragraph>
                    </Field>
                </Column>
            </Section>
        )
    }

    const supplierOtherOption: OptionsType = {
        value: ParticipationProviderOption.Other,
        label: i18n._('Anders, namelijk:'),
    }

    return (
        <Section title={i18n._(t`Aanbieder`)}>
            <Column spacing={4}>
                <Field label={i18n._(t`Aanbieder`)} horizontal={true} required={true}>
                    <Column spacing={2}>
                        {renderSelect()}
                        <ConditionalCard>{hasSelectedOther ? renderNameField() : renderNoteField()}</ConditionalCard>
                    </Column>
                </Field>
            </Column>
        </Section>
    )

    function renderSelect() {
        // TECHNICAL-DEBT: Because this is only rendered when editing, it's queried conditionally.
        // This should be refactored into a separate "SupplierSelect" component.

        // eslint-disable-next-line react-hooks/rules-of-hooks
        const { data, loading, error } = useGetSuppliers(1000)

        if (loading) {
            return <Spinner small={true} />
        }

        const queryResults = !error && data?.results.length ? data.results : []
        const supplierOptions = queryResults.map(r => ({ value: r.id, label: r.name }))
        const options = [...supplierOptions, supplierOtherOption]

        return (
            <Select
                list="provider"
                name="provider"
                placeholder={i18n._(t`Selecteer verwijzer`)}
                options={options}
                defaultValue={getDefaultValue(queryResults)}
                // validators={[GenericValidators.required]}
                // required={true}
                onChangeValue={value => {
                    setHasSelectedOther(value === supplierOtherOption.value)
                    onSupplierChange?.(value === supplierOtherOption.value, value)
                }}
            />
        )
    }

    function renderNoteField() {
        return (
            <Field label={i18n._(t`Toelichting op verwijzing`)} required={true}>
                <TextArea
                    name="explanation"
                    placeholder={i18n._(t`Toelichting`)}
                    defaultValue={defaultValues?.explanation ?? undefined}
                    // validators={[GenericValidators.required]}
                />
            </Field>
        )
    }

    function renderNameField() {
        return (
            <Field label={i18n._(t`Aanbieder`)} required={true}>
                <Input
                    name="providerOther"
                    placeholder={i18n._(t`Naam aanbieder`)}
                    defaultValue={defaultValues?.providerOther || ''}
                    // validators={[GenericValidators.required]}
                />
            </Field>
        )
    }

    function getDefaultValue(providers: Supplier[]) {
        if (defaultValues?.provider) {
            return providers.find(p => p.id === defaultValues.provider)?.id
        }

        if (defaultValues?.providerOther) {
            return supplierOtherOption.value
        }
    }
}

export default SupplierInformationFieldset
