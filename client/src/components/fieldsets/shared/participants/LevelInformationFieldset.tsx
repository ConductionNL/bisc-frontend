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
    readOnly?: true
}

export interface LevelInformationFieldsetModel {
    languageLevel: string
}

const LevelInformationFieldset: React.FunctionComponent<Props> = props => {
    const { prefillData, readOnly } = props
    const { i18n } = useLingui()

    if (readOnly) {
        return (
            <Section title={i18n._(t`Niveau`)}>
                <Column spacing={4}>
                    <Field label={i18n._(t`Taalniveau qua spreken`)} horizontal={true}>
                        <p style={{ maxWidth: '279px' }}>{prefillData?.languageLevel}</p>
                    </Field>
                </Column>
            </Section>
        )
    }

    return (
        <Section title={i18n._(t`Niveau`)}>
            <Column spacing={4}>
                <Field label={i18n._(t`Biedt de opleiding een certificaat?`)} description={'Indruk'} horizontal={true}>
                    <Column spacing={4}>
                        <Row>
                            <RadioButton name={'language-level'} value="beginner" />
                            <p>{i18n._(t`Beginner`)}</p>
                        </Row>
                        <Row>
                            <RadioButton name={'language-level'} value="intermediate" />
                            <p>{i18n._(t`Redelijk`)}</p>
                        </Row>
                        <Row>
                            <RadioButton name={'language-level'} value="advanced" />
                            <p>{i18n._(t`Gevorderd`)}</p>
                        </Row>
                    </Column>
                </Field>
            </Column>
        </Section>
    )
}

export default LevelInformationFieldset
