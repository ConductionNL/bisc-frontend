import { t } from '@lingui/macro'
import { useLingui } from '@lingui/react'
import { ParticipationProviderOption } from 'api/types/types'
import ConditionalCard from 'components/Core/Containers/ConditionalCard'
import Input from 'components/Core/DataEntry/Input'
import Select, { OptionsType } from 'components/Core/DataEntry/Select'
import TextArea from 'components/Core/DataEntry/TextArea'
import Field from 'components/Core/Field/Field'
import Section from 'components/Core/Field/Section'
import Column from 'components/Core/Layout/Column/Column'
import Paragraph from 'components/Core/Typography/Paragraph'
import React, { useState } from 'react'
// import { GenericValidators } from 'utils/validators/GenericValidators'

interface Props {
    defaultValues?: SupplierInformationFieldsetDefaultValues
    readOnly?: boolean
    supplierOptions?: OptionsType[]
    onSupplierChange?: (selectedOther: boolean, value?: string) => void
}

export interface SupplierInformationFieldsetModel {
    supplierId?: string
    supplierName?: string
    note: string
}

export interface SupplierInformationFieldsetDefaultValues {
    providerName?: string
    providerNote?: string
}

const SupplierInformationFieldset: React.FunctionComponent<Props> = props => {
    const { defaultValues, readOnly, supplierOptions, onSupplierChange } = props
    const { i18n } = useLingui()
    const [supplierSelectValue, setSupplierSelectValue] = useState<string>()

    if (readOnly) {
        return (
            <Section title={i18n._(t`Aanbieder`)}>
                <Column spacing={4}>
                    <Field label={i18n._(t`Aanbieder`)} horizontal={true}>
                        <Paragraph>{defaultValues?.providerName}</Paragraph>
                    </Field>
                </Column>
            </Section>
        )
    }

    const supplierOtherOption: OptionsType = {
        value: ParticipationProviderOption.Other,
        label: i18n._('Anders, namelijk:'),
    }
    const testOption: OptionsType = { value: 'test', label: 'test' } // TODO: delete - for testing only
    const options = supplierOptions ? [...supplierOptions, supplierOtherOption] : [testOption, supplierOtherOption]

    return (
        <Section title={i18n._(t`Aanbieder`)}>
            <Column spacing={4}>
                <Field label={i18n._(t`Aanbieder`)} horizontal={true} required={true}>
                    <Column spacing={2}>
                        <Select
                            list="supplierId"
                            name="supplierId"
                            placeholder={i18n._(t`Selecteer verwijzer`)}
                            options={options}
                            defaultValue={defaultValues?.providerName}
                            // validators={[GenericValidators.required]}
                            // required={true}
                            onChangeValue={value => {
                                setSupplierSelectValue(value)
                                onSupplierChange?.(value === supplierOtherOption.value, value)
                            }}
                        />

                        <ConditionalCard>
                            {supplierSelectValue === supplierOtherOption.value ? renderNameField() : renderNoteField()}
                        </ConditionalCard>
                    </Column>
                </Field>
            </Column>
        </Section>
    )

    function renderNoteField() {
        return (
            <Field label={i18n._(t`Toelichting op verwijzing`)} required={true}>
                <TextArea
                    name="note"
                    placeholder={i18n._(t`Toelichting`)}
                    defaultValue={defaultValues?.providerNote}
                    // validators={[GenericValidators.required]}
                />
            </Field>
        )
    }

    function renderNameField() {
        return (
            <Field label={i18n._(t`Aanbieder`)} required={true}>
                <Input
                    name="supplier"
                    placeholder={i18n._(t`Naam aanbieder`)}
                    // validators={[GenericValidators.required]}
                />
            </Field>
        )
    }
}

export default SupplierInformationFieldset
