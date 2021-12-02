import { t } from '@lingui/macro'
import { useLingui } from '@lingui/react'
import { Maybe, OfferType } from 'api/types/types'
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
    offerName?: string
    courseType?: OfferType
}

export interface OfferInformationFieldsetDefaultValues {
    offerName?: Maybe<string>
    offerType?: Maybe<OfferType>
}

const OfferInformationFieldset: React.FunctionComponent<Props> = props => {
    const { defaultValues, readOnly } = props
    const { i18n } = useLingui()

    const ParticipationOfferCourseEnumTranslations = {
        [OfferType.Digital]: i18n._(t`Digitale vaardigheden`),
        [OfferType.Language]: i18n._(t`Taal`),
        [OfferType.Math]: i18n._(t`Rekenen`),
        [OfferType.Other]: i18n._(t`Overige`),
    }

    if (readOnly) {
        return (
            <Section title={i18n._(t`Aanbieder`)}>
                <Column spacing={4}>
                    <Field label={i18n._(t`Naam aanbod`)} horizontal={true}>
                        <Paragraph>{defaultValues?.offerName}</Paragraph>
                    </Field>
                    <Field label={i18n._(t`Type cursus`)} horizontal={true}>
                        <Paragraph>{defaultValues?.offerType}</Paragraph>
                    </Field>
                </Column>
            </Section>
        )
    }

    return (
        <Section title={i18n._(t`Aanbod`)}>
            <Column spacing={4}>
                <Field required={true} label={i18n._(t`Naam aanbod`)} horizontal={true}>
                    <Input
                        name="offerName"
                        placeholder={i18n._(t`Naam aanbod`)}
                        defaultValue={defaultValues?.offerName ?? undefined}
                    />
                </Field>
                <Field required={true} label={i18n._(t`Type cursus`)} horizontal={true}>
                    <Column spacing={2}>
                        <Select
                            list="offerType"
                            name="offerType"
                            placeholder={i18n._(t`Selecteer type`)}
                            options={participationOfferCourseOptions()}
                        />
                    </Column>
                </Field>
            </Column>
        </Section>
    )

    function participationOfferCourseOptions() {
        const values = Object.values(OfferType)

        const options = values.map(option => {
            return {
                value: option,
                label: ParticipationOfferCourseEnumTranslations[option],
            }
        })

        return options
    }
}

export default OfferInformationFieldset
