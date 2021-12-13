import { t } from '@lingui/macro'
import { useLingui } from '@lingui/react'
import { Maybe } from 'generated/graphql'
import React from 'react'
import Input from 'components/Core/DataEntry/Input'
import Field from 'components/Core/Field/Field'
import Section from 'components/Core/Field/Section'
import Column from 'components/Core/Layout/Column/Column'
import { maritalStatusTranslations } from '../participants/translations/participantsTranslations'
import { MaritalStatus } from 'api/types/types'
import RadioButton from 'components/Core/DataEntry/RadioButton'
import { CountrySelect, getCountryLabelByCode } from 'components/Domain/Shared/components/CountrySelect/CountrySelect'

interface Props {
    prefillData?: GeneralInformationFieldsetPrefillData
    readOnly?: boolean
}

export interface GeneralInformationFieldsetPrefillData {
    'person.birthplace'?: Maybe<string>
    'person.primaryLanguage'?: Maybe<string>
    'person.speakingLanguages'?: Maybe<string>
    'person.maritalStatus'?: Maybe<MaritalStatus>
    'person.children'?: Maybe<number>
}

export interface GeneralInformationFieldsetModel {
    'person.birthplace'?: Maybe<string>
    'person.primaryLanguage'?: Maybe<string>
    'person.speakingLanguages'?: Maybe<string>
    'person.maritalStatus'?: Maybe<MaritalStatus>
    'person.children'?: Maybe<string>
}

export const GeneralInformationFieldset: React.FunctionComponent<Props> = props => {
    const { prefillData, readOnly } = props
    const { i18n } = useLingui()

    if (readOnly) {
        return (
            <Section title={i18n._(t`Algemeen`)}>
                <Column spacing={4}>
                    <Field label={i18n._(t`Land van herkomst`)} horizontal={true}>
                        <p>
                            {prefillData?.['person.birthplace'] &&
                                getCountryLabelByCode(prefillData?.['person.birthplace'])}
                        </p>
                    </Field>

                    <Field label={i18n._(t`Moedertaal`)} horizontal={true}>
                        <p>{prefillData?.['person.primaryLanguage']}</p>
                    </Field>

                    <Field label={i18n._(t`Talen naast moedertaal`)} horizontal={true}>
                        <p>{prefillData?.['person.speakingLanguages']}</p>
                    </Field>

                    <Field label={i18n._(t`Gezinssamenstelling`)} horizontal={true}>
                        <p>
                            {prefillData?.['person.maritalStatus'] &&
                                maritalStatusTranslations[prefillData?.['person.maritalStatus']]}
                        </p>
                    </Field>

                    <Field label={i18n._(t`Aantal kinderen`)} horizontal={true}>
                        <p>{prefillData?.['person.children']}</p>
                    </Field>
                </Column>
            </Section>
        )
    }

    return (
        <Section title={i18n._(t`Algemeen`)}>
            <Column spacing={4}>
                <Field label={i18n._(t`Land van herkomst`)} horizontal={true}>
                    <CountrySelect
                        name={'person.birthplace'}
                        placeholder={i18n._(t`Selecteer land`)}
                        defaultValue={prefillData?.['person.birthplace'] ?? undefined}
                    />
                </Field>
                <Field label={i18n._(t`Moedertaal`)} horizontal={true}>
                    <Input
                        name={'person.primaryLanguage'}
                        placeholder={i18n._(t`Moedertaal`)}
                        defaultValue={prefillData?.['person.primaryLanguage'] || ''}
                    />
                </Field>
                <Field label={i18n._(t`Welke talen spreek je nog meer?`)} horizontal={true}>
                    <Input
                        name={'person.speakingLanguages'}
                        placeholder={i18n._(t`Talen naast moedertaal`)}
                        defaultValue={prefillData?.['person.speakingLanguages'] || ''}
                    />
                </Field>
                <Field label={i18n._(t`Gezinssamenstelling`)} horizontal={true}>
                    <Column spacing={4}>
                        {Object.values(MaritalStatus).map((value, key, array) => (
                            <RadioButton
                                key={`${key}-${array.length}`}
                                name={'person.maritalStatus'}
                                value={value}
                                defaultChecked={value === prefillData?.['person.maritalStatus']}
                                label={maritalStatusTranslations[value]}
                            />
                        ))}
                    </Column>
                </Field>
                <Field label={i18n._(t`Aantal kinderen`)} horizontal={true}>
                    <Input
                        type="number"
                        name={'person.children'}
                        placeholder={i18n._(t`Aantal kinderen`)}
                        defaultValue={prefillData?.['person.children'] || ''}
                        min={0}
                    />
                </Field>
            </Column>
        </Section>
    )
}
