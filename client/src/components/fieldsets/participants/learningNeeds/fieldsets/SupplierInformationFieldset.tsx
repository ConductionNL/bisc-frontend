import { t } from '@lingui/macro'
import { useLingui } from '@lingui/react'
import ConditionalCard from 'components/Core/Containers/ConditionalCard'
import Input from 'components/Core/DataEntry/Input'
import Select from 'components/Core/DataEntry/Select'
import TextArea from 'components/Core/DataEntry/TextArea'
import Field from 'components/Core/Field/Field'
import Section from 'components/Core/Field/Section'
import Column from 'components/Core/Layout/Column/Column'
import Paragraph from 'components/Core/Typography/Paragraph'
import React, { useState } from 'react'
import { GenericValidators } from 'utils/validators/GenericValidators'

interface Props {
    defaultValues?: SupplierInformationFieldsetDefaultValues
    readOnly?: boolean
}

export interface SupplierInformationFieldsetModel {
    supplierId?: string
    supplierName?: string
    note: string
}

export interface SupplierInformationFieldsetDefaultValues {
    aanbiederName?: string
    aanbiederNote?: string
}

const SupplierInformationFieldset: React.FunctionComponent<Props> = props => {
    const { defaultValues, readOnly } = props
    const { i18n } = useLingui()
    const [supplierSelectValue, setSupplierSelectValue] = useState<string>()

    if (readOnly) {
        return (
            <Section title={i18n._(t`Aanbieder`)}>
                <Column spacing={4}>
                    <Field label={i18n._(t`Aanbieder`)} horizontal={true}>
                        <Paragraph>{defaultValues?.aanbiederName}</Paragraph>
                    </Field>
                </Column>
            </Section>
        )
    }

    return (
        <Section title={i18n._(t`Aanbieder`)}>
            <Column spacing={4}>
                <Field label={i18n._(t`Aanbieder`)} horizontal={true} required={true}>
                    <Column spacing={2}>
                        <Select
                            list="supplierId"
                            name="supplierId"
                            placeholder={i18n._(t`Selecteer verwijzer`)}
                            options={['test']}
                            defaultValue={defaultValues?.aanbiederName}
                            validators={[GenericValidators.required]}
                            onChangeValue={value => setSupplierSelectValue(value)}
                            required={true}
                        />

                        {supplierSelectValue === 'ANDERS' && (
                            <ConditionalCard>
                                <Field label={i18n._(t`Aanbieder`)} required={true}>
                                    <Input
                                        name="supplier"
                                        placeholder={i18n._(t`Naam aanbieder`)}
                                        validators={[GenericValidators.required]}
                                    />
                                </Field>
                            </ConditionalCard>
                        )}

                        <ConditionalCard>
                            <Field label={i18n._(t`Toelichting op verwijzing`)} required={true}>
                                <TextArea
                                    name="note"
                                    placeholder={i18n._(t`Toelichting`)}
                                    defaultValue={defaultValues?.aanbiederNote}
                                    validators={[GenericValidators.required]}
                                />
                            </Field>
                        </ConditionalCard>
                    </Column>
                </Field>
            </Column>
        </Section>
    )
}

export default SupplierInformationFieldset
