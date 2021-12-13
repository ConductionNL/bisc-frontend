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
    hideSectionTitle?: boolean
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
    const { defaultValues, readOnly, hideSectionTitle } = props
    const { i18n } = useLingui()

    const participationOfferCourseEnumTranslations = {
        [OfferType.Digital]: i18n._(t`Digitale vaardigheden`),
        [OfferType.Language]: i18n._(t`Taal`),
        [OfferType.Math]: i18n._(t`Rekenen`),
        [OfferType.Other]: i18n._(t`Overige`),
    }

    if (hideSectionTitle) {
        return renderFields()
    }

    return <Section title={i18n._(t`Aanbod`)}>{renderFields()}</Section>

    function renderFields() {
        if (readOnly) {
            return (
                <Column spacing={4}>
                    <Field label={i18n._(t`Naam aanbod`)} horizontal={true}>
                        <Paragraph>{defaultValues?.offerName}</Paragraph>
                    </Field>
                    <Field label={i18n._(t`Type cursus`)} horizontal={true}>
                        {defaultValues?.offerType && (
                            <Paragraph>{participationOfferCourseEnumTranslations[defaultValues.offerType]}</Paragraph>
                        )}
                    </Field>
                </Column>
            )
        }

        const participationOptions = Object.values(OfferType).map(option => ({
            value: option,
            label: participationOfferCourseEnumTranslations[option],
        }))

        return (
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
                            options={participationOptions}
                            defaultValue={defaultValues?.offerType ?? undefined}
                        />
                    </Column>
                </Field>
            </Column>
        )
    }
}

export default OfferInformationFieldset
