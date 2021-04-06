import { t } from '@lingui/macro'
import { useLingui } from '@lingui/react'
import Input from 'components/Core/DataEntry/Input'
import Select from 'components/Core/DataEntry/Select'
import Field from 'components/Core/Field/Field'
import Section from 'components/Core/Field/Section'
import Column from 'components/Core/Layout/Column/Column'
import Paragraph from 'components/Core/Typography/Paragraph'
import React from 'react'

interface Props {
    defaultValues?: OfferInformationFieldsetDefaultValues
    readOnly?: boolean
}

export interface OfferInformationFieldsetModel {
    Offer?: string
    cursusType: string
}

export interface OfferInformationFieldsetDefaultValues {
    nameOffer: string
    cursusType: string
}

const OfferInformationFieldset: React.FunctionComponent<Props> = props => {
    const { defaultValues, readOnly } = props
    const { i18n } = useLingui()

    if (readOnly) {
        return (
            <Section title={i18n._(t`Aanbieder`)}>
                <Column spacing={4}>
                    <Field label={i18n._(t`Naam aanbod`)} horizontal={true}>
                        <Paragraph>{defaultValues?.nameOffer}</Paragraph>
                    </Field>
                    <Field label={i18n._(t`Type cursus`)} horizontal={true}>
                        <Paragraph>{defaultValues?.cursusType}</Paragraph>
                    </Field>
                </Column>
            </Section>
        )
    }

    return (
        <Section title={i18n._(t`Aanbod`)}>
            <Column spacing={4}>
                <Field label={i18n._(t`Naam aanbod`)} horizontal={true}>
                    <Input
                        name="offerName"
                        placeholder={i18n._(t`Naam aanbod`)}
                        defaultValue={defaultValues?.nameOffer}
                    />
                </Field>
                <Field label={i18n._(t`Type cursus`)} horizontal={true}>
                    <Column spacing={2}>
                        <Select
                            list="cursusType"
                            name="cursusType"
                            placeholder={i18n._(t`Selecteer type`)}
                            options={[
                                {
                                    value: 'test',
                                    label: 'test',
                                },
                                {
                                    value: 'test',
                                    label: 'test',
                                },
                                {
                                    value: 'test',
                                    label: 'test',
                                },
                                {
                                    value: 'test',
                                    label: 'test',
                                },
                            ]}
                        />
                    </Column>
                </Field>
            </Column>
        </Section>
    )
}

export default OfferInformationFieldset
