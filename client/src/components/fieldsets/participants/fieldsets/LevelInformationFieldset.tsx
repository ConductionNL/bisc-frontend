import { t } from '@lingui/macro'
import { useLingui } from '@lingui/react'
import { studentSpeakingLevelEnumEnumTranslations } from 'components/Domain/Participation/translations/translations'
import { Maybe } from 'generated/graphql'
import React from 'react'
import RadioButton from 'components/Core/DataEntry/RadioButton'
import Field from 'components/Core/Field/Field'
import Section from 'components/Core/Field/Section'
import Column from 'components/Core/Layout/Column/Column'
import { SpeakingLevel } from 'api/types/types'

interface Props {
    prefillData?: LevelInformationFieldsetPrefillData
    readOnly?: boolean
}

export interface LevelInformationFieldsetModel {
    'intake.speakingLevel'?: Maybe<SpeakingLevel>
}
export interface LevelInformationFieldsetPrefillData {
    'intake.speakingLevel'?: Maybe<SpeakingLevel>
}

export const LevelInformationFieldset: React.FunctionComponent<Props> = props => {
    const { prefillData, readOnly } = props
    const { i18n } = useLingui()

    const languageLevels = getLanguageLevelOptions()

    if (readOnly) {
        return (
            <Section title={i18n._(t`Niveau`)}>
                <Column spacing={4}>
                    <Field label={i18n._(t`Taalniveau qua spreken`)} description={i18n._(t`Indruk`)} horizontal={true}>
                        {prefillData?.['intake.speakingLevel'] &&
                            languageLevels.find(o => o.value === prefillData['intake.speakingLevel'])?.label}
                    </Field>
                </Column>
            </Section>
        )
    }

    return (
        <Section title={i18n._(t`Niveau`)}>
            <Column spacing={4}>
                <Field label={i18n._(t`Taalniveau qua spreken`)} description={i18n._(t`Indruk`)} horizontal={true}>
                    <Column spacing={4}>
                        {Object.values(SpeakingLevel).map((value, key, array) => (
                            <RadioButton
                                key={`${key}-${array.length}`}
                                name={'intake.speakingLevel'}
                                value={value}
                                defaultChecked={prefillData?.['intake.speakingLevel'] === value}
                                label={languageLevels.find(o => o.value === value)?.label}
                            />
                        ))}
                    </Column>
                </Field>
            </Column>
        </Section>
    )

    function getLanguageLevelOptions() {
        return Object.values(SpeakingLevel).map(value => ({
            label: studentSpeakingLevelEnumEnumTranslations[value],
            value,
        }))
    }
}
