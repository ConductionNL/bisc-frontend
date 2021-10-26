import { t } from '@lingui/macro'
import { useLingui } from '@lingui/react'
import { studentSpeakingLevelEnumEnumTranslations } from 'components/Domain/Participation/translations/translations'
import { StudentSpeakingLevelEnum } from 'generated/enums'
import { Maybe } from 'generated/graphql'
import React from 'react'
import RadioButton from 'components/Core/DataEntry/RadioButton'
import Field from 'components/Core/Field/Field'
import Section from 'components/Core/Field/Section'
import Column from 'components/Core/Layout/Column/Column'
import Row from 'components/Core/Layout/Row/Row'

interface Props {
    prefillData?: LevelInformationFieldsetPrefillData
    readOnly?: boolean
}

export interface LevelInformationFieldsetModel {
    speakingLevel: StudentSpeakingLevelEnum
}
export interface LevelInformationFieldsetPrefillData {
    speakingLevel?: Maybe<StudentSpeakingLevelEnum>
}

const LevelInformationFieldset: React.FunctionComponent<Props> = props => {
    const { prefillData, readOnly } = props
    const { i18n } = useLingui()

    const languageLevels = getLanguageLevelOptions()
    if (readOnly) {
        return (
            <Section title={i18n._(t`Niveau`)}>
                {/* <Column spacing={4}>
                    <Field label={i18n._(t`Taalniveau qua spreken`)} horizontal={true}>
                        {renderLanguageLevelRadiobuttons()}
                    </Field>
                </Column> */}
            </Section>
        )
    }

    return (
        <Section title={i18n._(t`Niveau`)}>
            <Column spacing={4}>
                <Field label={i18n._(t`Biedt de opleiding een certificaat?`)} description={'Indruk'} horizontal={true}>
                    <Column spacing={4}>{renderLanguageLevelRadiobuttons()}</Column>
                </Field>
            </Column>
        </Section>
    )

    function renderLanguageLevelRadiobuttons() {
        if (readOnly && prefillData?.speakingLevel) {
            return (
                <Row>
                    <p style={{ maxWidth: '279px' }}>
                        {languageLevels.find(languageLevel => languageLevel.value === prefillData.speakingLevel)?.label}
                    </p>
                </Row>
            )
        }

        return languageLevels.map((level, index) => {
            return (
                <RadioButton
                    key={index}
                    name={'speakingLevel'}
                    value={level.value}
                    label={level.label}
                    defaultChecked={prefillData?.speakingLevel === level.value}
                />
            )
        })
    }

    function getLanguageLevelOptions() {
        return Object.values(StudentSpeakingLevelEnum).map(value => ({
            label: studentSpeakingLevelEnumEnumTranslations[value],
            value,
        }))
    }
}

export default LevelInformationFieldset
