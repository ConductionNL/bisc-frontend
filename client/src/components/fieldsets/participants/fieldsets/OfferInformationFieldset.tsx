import { t } from '@lingui/macro'
import { useLingui } from '@lingui/react'
import Select from 'components/Core/DataEntry/Select'
import TextArea from 'components/Core/DataEntry/TextArea'
import Field from 'components/Core/Field/Field'
import Section from 'components/Core/Field/Section'
import Column from 'components/Core/Layout/Column/Column'
import React from 'react'
import { GenericValidators } from 'utils/validators/GenericValidators'
import { LearningQuestionMetadata } from 'views/Authorized/Supplier/AanbiederView/mocks'

interface Props {
    defaultValues?: LearningQuestionMetadata
}

export interface OfferInfortmationInformationFieldsetModel {
    readingResults: string
}

const OfferInfortmationInformationFieldset: React.FunctionComponent<Props> = props => {
    const { defaultValues } = props
    const { i18n } = useLingui()

    return (
        <Section title={i18n._(t`Aanbod`)}>
            <Column spacing={4}>
                <Field label={i18n._(t`Gewenste aanbod`)} horizontal={true} required={true}>
                    <TextArea
                        name="desiredOffers"
                        placeholder={i18n._(t`Gewenst aanbod`)}
                        defaultValue={defaultValues?.desiredOffers}
                        validators={[GenericValidators.required]}
                    />
                </Field>
                <Field label={i18n._(t`Geadviseerd aanbod`)} horizontal={true} required={true}>
                    <TextArea
                        name="advisedOffers"
                        placeholder={i18n._(t`Geadviseerd aanbod`)}
                        defaultValue={defaultValues?.advisedOffers}
                        validators={[GenericValidators.required]}
                    />
                </Field>
                <Field label={i18n._(t`Is er een verschil tussen wens en advies?`)} horizontal={true} required={true}>
                    <Select
                        name="topic"
                        placeholder={i18n._(t`Selecteer`)}
                        required={true}
                        options={[
                            'Nee, er is geen verschil',
                            'Ja, want: niet aangeboden binnen bereisbare afstand',
                            'Ja, want: wachtlijst',
                            'Ja, want: anders',
                        ]}
                        validators={[GenericValidators.required]}
                    />
                </Field>
                <Field label={i18n._(t`Afspraken`)} horizontal={true}>
                    <TextArea
                        name="engagements"
                        placeholder={i18n._(t`Afspraken`)}
                        defaultValue={defaultValues?.engagements}
                    />
                </Field>
            </Column>
        </Section>
    )
}

export default OfferInfortmationInformationFieldset
