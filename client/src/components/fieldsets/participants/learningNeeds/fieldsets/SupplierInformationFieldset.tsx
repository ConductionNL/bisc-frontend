import { t } from '@lingui/macro'
import { useLingui } from '@lingui/react'
import { useGetSuppliers } from 'api/supplier/supplier'
import { Maybe, ParticipationProviderOption } from 'api/types/types'
import ConditionalCard from 'components/Core/Containers/ConditionalCard'
import Input from 'components/Core/DataEntry/Input'
import { DefaultSelectOption, Select } from 'components/Core/DataEntry/Select'
import TextArea from 'components/Core/DataEntry/TextArea'
import ErrorBlock from 'components/Core/Feedback/Error/ErrorBlock'
import Spinner from 'components/Core/Feedback/Spinner/Spinner'
import Field from 'components/Core/Field/Field'
import Section from 'components/Core/Field/Section'
import Column from 'components/Core/Layout/Column/Column'
import Paragraph from 'components/Core/Typography/Paragraph'
import React, { useState } from 'react'

interface Props {
    defaultValues?: SupplierInformationFieldsetDefaultValues
    readOnly?: boolean
    onSupplierChange?: (selectedOther: boolean, value?: string | number) => void
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

    const supplierOtherOption: DefaultSelectOption = {
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

        if (error) {
            return (
                <ErrorBlock
                    title={i18n._(t`Er ging iets fout`)}
                    message={i18n._(t`De lijst met Aanbieders kon niet worden opgehaald`)}
                />
            )
        }

        if (loading || !data) {
            return <Spinner small={true} />
        }

        const queryResults = data?.results || []
        const supplierOptions = queryResults.map(r => ({ value: r.id, label: r.name }))
        const options = [...supplierOptions, supplierOtherOption]
        const defaultOption = getDefaultValue(supplierOptions)

        return (
            <Select
                list="provider"
                name="provider"
                placeholder={i18n._(t`Selecteer verwijzer`)}
                options={options}
                defaultValue={defaultOption}
                onChangeValue={option => {
                    setHasSelectedOther(option ? option.value === supplierOtherOption.value : false)
                    onSupplierChange?.(
                        option ? option.value === supplierOtherOption.value : false,
                        option ? option.value : undefined
                    )
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

    function getDefaultValue(options: DefaultSelectOption[]): DefaultSelectOption | undefined {
        if (defaultValues?.provider) {
            const option = options.find(p => p.value === defaultValues.provider)
            return option ? option : undefined
        }

        if (defaultValues?.providerOther) {
            return supplierOtherOption
        }
    }
}

export default SupplierInformationFieldset
