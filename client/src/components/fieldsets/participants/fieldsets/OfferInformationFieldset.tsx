import { t } from '@lingui/macro'
import { useLingui } from '@lingui/react'
import ConditionalCard from 'components/Core/Containers/ConditionalCard'
import Input from 'components/Core/DataEntry/Input'
import Select from 'components/Core/DataEntry/Select'
import TextArea from 'components/Core/DataEntry/TextArea'
import Field from 'components/Core/Field/Field'
import Section from 'components/Core/Field/Section'
import Column from 'components/Core/Layout/Column/Column'
import { learningNeedOfferDifferencesTranslations } from 'components/Domain/LearningNeeds/Translations/LearningNeedTranslations'
import { LearningNeedOfferDifferenceEnum } from 'generated/enums'
import React, { useState } from 'react'
import { GenericValidators } from 'utils/validators/GenericValidators'

interface Props {
    defaultValues?: OfferInfortmationDefaultValues
}

export interface OfferInformationFieldsetModel {
    offerDesiredOffer: string
    offerAdvisedOffer: string
    offerDifference: LearningNeedOfferDifferenceEnum
    offerDifferenceOther: string
    offerEngagements: string
}

export interface OfferInfortmationDefaultValues {
    differenceOther?: string
    offerDesiredOffer?: string
    offerAdvisedOffer?: string
    offerDifference?: LearningNeedOfferDifferenceEnum
    offerDifferenceOther?: string
    offerEngagements?: string
}

const OfferInformationInformationFieldset: React.FunctionComponent<Props> = props => {
    const { defaultValues } = props
    const { i18n } = useLingui()
    const [differencesValue, setDifferencesValue] = useState<string>()

    return (
        <Section title={i18n._(t`Aanbod`)}>
            <Column spacing={4}>
                <Field label={i18n._(t`Gewenste aanbod`)} horizontal={true} required={true}>
                    <TextArea
                        name="desiredOffers"
                        placeholder={i18n._(t`Gewenst aanbod`)}
                        defaultValue={defaultValues?.differenceOther}
                        validators={[GenericValidators.required]}
                    />
                </Field>
                <Field label={i18n._(t`Geadviseerd aanbod`)} horizontal={true} required={true}>
                    <TextArea
                        name="advisedOffers"
                        placeholder={i18n._(t`Geadviseerd aanbod`)}
                        defaultValue={defaultValues?.offerAdvisedOffer}
                        validators={[GenericValidators.required]}
                    />
                </Field>
                <Field label={i18n._(t`Is er een verschil tussen wens en advies?`)} horizontal={true} required={true}>
                    <Column spacing={2}>
                        <Select
                            name="differences"
                            list="differences"
                            placeholder={i18n._(t`Selecteer`)}
                            required={true}
                            onChangeValue={value => setDifferencesValue(value)}
                            defaultValue={defaultValues?.offerDifference}
                            options={getOfferDifferences()}
                        />
                        {differencesValue === LearningNeedOfferDifferenceEnum.YesOther && (
                            <ConditionalCard>
                                <Field label={i18n._(t`Ja anders:`)}>
                                    <Input
                                        name="differenceOther"
                                        required={true}
                                        placeholder={i18n._(t`Anders`)}
                                        validators={[GenericValidators.required]}
                                    />
                                </Field>
                            </ConditionalCard>
                        )}
                    </Column>
                </Field>
                <Field label={i18n._(t`Afspraken`)} horizontal={true}>
                    <TextArea
                        name="engagements"
                        placeholder={i18n._(t`Afspraken`)}
                        defaultValue={defaultValues?.offerEngagements}
                    />
                </Field>
            </Column>
        </Section>
    )

    function getOfferDifferences() {
        return Object.values(LearningNeedOfferDifferenceEnum).map(value => ({
            value,
            label: learningNeedOfferDifferencesTranslations[value] ?? 'NOT SUPPORTED',
        }))
    }
}

export default OfferInformationInformationFieldset
