import { t } from '@lingui/macro'
import { useLingui } from '@lingui/react'
import ConditionalCard from 'components/Core/Containers/ConditionalCard'
import Select from 'components/Core/DataEntry/Select'
import TextArea from 'components/Core/DataEntry/TextArea'
import Field from 'components/Core/Field/Field'
import Section from 'components/Core/Field/Section'
import Column from 'components/Core/Layout/Column/Column'
import Paragraph from 'components/Core/Typography/Paragraph'
import React from 'react'
import { GenericValidators } from 'utils/validators/GenericValidators'

interface Props {
    defaultValues?: SupplierInformationFieldsetDefaultValues
    readOnly?: boolean
}

export interface SupplierInformationFieldsetModel {
    supplier?: string
    explanation: string
}

export interface SupplierInformationFieldsetDefaultValues {
    supplier: string
    explanation: string
}

const SupplierInformationFieldset: React.FunctionComponent<Props> = props => {
    const { defaultValues, readOnly } = props
    const { i18n } = useLingui()

    if (readOnly) {
        return (
            <Section title={i18n._(t`Aanbieder`)}>
                <Column spacing={4}>
                    <Field label={i18n._(t`Aanbieder`)} horizontal={true}>
                        <Paragraph>{defaultValues?.supplier}</Paragraph>
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
                            list="supplier"
                            name="supplier"
                            placeholder={i18n._(t`Selecteer verwijzer`)}
                            options={['test']}
                            defaultValue={defaultValues?.supplier}
                            validators={[GenericValidators.required]}
                            required={true}
                        />
                        <ConditionalCard>
                            <Field label={i18n._(t`Toelichting op verwijzing`)} required={true}>
                                <TextArea
                                    name="explanation"
                                    placeholder={i18n._(t`Toelichting`)}
                                    defaultValue={defaultValues?.explanation}
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
