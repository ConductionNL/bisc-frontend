import { t } from '@lingui/macro'
import { useLingui } from '@lingui/react'
import React from 'react'
import RadioButton from '../../../Core/DataEntry/RadioButton'
import Field from '../../../Core/Field/Field'
import Section from '../../../Core/Field/Section'
import Column from '../../../Core/Layout/Column/Column'
import Row from '../../../Core/Layout/Row/Row'

interface Props {
    prefillData?: LevelInformationFieldsetModel
    readOnly?: boolean
}

export interface LevelInformationFieldsetModel {
    languageLevel: string
}

const LevelInformationFieldset: React.FunctionComponent<Props> = props => {
    const { prefillData, readOnly } = props
    const { i18n } = useLingui()

    const languageLevels = [
        {
            name: 'languageLevels',
            value: 'beginner',
            text: i18n._(t`Beginner`),
        },
        {
            name: 'languageLevels',
            value: 'intermediate',
            text: i18n._(t`Redelijk`),
        },
        {
            name: 'languageLevels',
            value: 'advanced',
            text: i18n._(t`Gevorderd`),
        },
    ]

    if (readOnly) {
        return (
            <Section title={i18n._(t`Niveau`)}>
                <Column spacing={4}>
                    <Field label={i18n._(t`Taalniveau qua spreken`)} horizontal={true}>
                        {renderLanguageLevelRadiobuttons()}
                    </Field>
                </Column>
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
        if (readOnly && prefillData?.languageLevel) {
            return (
                <Row>
                    <p style={{ maxWidth: '279px' }}>{prefillData?.languageLevel}</p>
                </Row>
            )
        }

        return languageLevels.map((level, index) => {
            return (
                <Row key={index}>
                    <RadioButton
                        name={level.name}
                        value={level.value}
                        defaultChecked={prefillData?.languageLevel === level.value}
                    />
                    <p>{level.text}</p>
                </Row>
            )
        })
    }
}

export default LevelInformationFieldset
