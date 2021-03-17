import { t } from '@lingui/macro'
import { useLingui } from '@lingui/react'
import React from 'react'
import Checkbox from '../../Core/DataEntry/Checkbox'
import Input from '../../Core/DataEntry/Input'
import Select from '../../Core/DataEntry/Select'
import TextArea from '../../Core/DataEntry/TextArea'
import Field from '../../Core/Field/Field'
import Section from '../../Core/Field/Section'
import Column from '../../Core/Layout/Column/Column'
import Row from '../../Core/Layout/Row/Row'

interface Props {
    prefillData?: GeneralInformationFieldsetModel
    readOnly?: true
}

export interface GeneralInformationFieldsetModel {
    countryOfOrigin: string
    nativeLanguage: string
    otherLanguages: string[]
    familyComposition: string[]
    numberOfChildren: string
    dateOfBirthChildren: string[]
}

const GeneralInformationFieldset: React.FunctionComponent<Props> = props => {
    const { prefillData, readOnly } = props
    const { i18n } = useLingui()

    if (readOnly) {
        return (
            <Section title={i18n._(t`Begeleiding`)}>
                <Column spacing={4}>
                    <Field label={i18n._(t`Land van herkomst`)} horizontal={true}>
                        <p>{prefillData?.countryOfOrigin}</p>
                    </Field>

                    <Field label={i18n._(t`Moedertaal`)} horizontal={true}>
                        <p>{prefillData?.nativeLanguage}</p>
                    </Field>

                    <Field label={i18n._(t`Talen naast moedertaal`)} horizontal={true}>
                        <p>{prefillData?.otherLanguages}</p>
                    </Field>

                    <Field label={i18n._(t`Gezinssamenstelling`)} horizontal={true}>
                        <p>{prefillData?.familyComposition}</p>
                    </Field>

                    <Field label={i18n._(t`Aantal kinderen`)} horizontal={true}>
                        <p>{prefillData?.numberOfChildren}</p>
                    </Field>

                    <Field label={i18n._(t`Geboortedatum kinderen`)} horizontal={true}>
                        <p>{prefillData?.dateOfBirthChildren}</p>
                    </Field>
                </Column>
            </Section>
        )
    }

    return (
        <Section title={i18n._(t`Algemeen`)}>
            <Column spacing={4}>
                <Field label={i18n._(t`Land van herkomst`)} horizontal={true}>
                    <Select
                        name="reason"
                        placeholder={i18n._(t`Selecteer land`)}
                        options={['test']}
                        defaultValue={prefillData?.countryOfOrigin}
                    />
                </Field>
                <Field label={i18n._(t`Moedertaal`)} horizontal={true}>
                    <Input
                        name="mother-language"
                        placeholder={i18n._(t`Moedertaal`)}
                        defaultValue={prefillData?.nativeLanguage}
                    />
                </Field>
                <Field label={i18n._(t`Welke talen spreek je nog meer?`)} horizontal={true}>
                    <Input
                        name="other-languages"
                        placeholder={i18n._(t`Talen naast moedertaal`)}
                        defaultValue={prefillData?.otherLanguages}
                    />
                </Field>
                <Field label={i18n._(t`Gezinssamenstelling`)} horizontal={true}>
                    <Column spacing={4}>
                        <Row>
                            <Checkbox name={'familyComposition'} />
                            <p>{i18n._(t`Getrouwd/partner`)}</p>
                        </Row>
                        <Row>
                            <Checkbox name={'familyComposition'} />
                            <p>{i18n._(t`Alleenstaand`)}</p>
                        </Row>
                        <Row>
                            <Checkbox name={'familyComposition'} />
                            <p>{i18n._(t`Gescheiden`)}</p>
                        </Row>
                        <Row>
                            <Checkbox name={'familyComposition'} />
                            <p>{i18n._(t`Weduwe/weduwnaar`)}</p>
                        </Row>
                    </Column>
                </Field>
                <Field label={i18n._(t`Aantal kinderen`)} horizontal={true}>
                    <Input
                        name="number-of-children"
                        placeholder={i18n._(t`Aantal kinderen`)}
                        defaultValue={prefillData?.numberOfChildren}
                    />
                </Field>

                <Field label={i18n._(t`Aantal kinderen`)} horizontal={true}>
                    <Field horizontal={true}>
                        <TextArea
                            name="note"
                            placeholder={i18n._(t`Geboortedatum van kinderen`)}
                            defaultValue={prefillData?.dateOfBirthChildren}
                        />
                    </Field>
                </Field>
            </Column>
        </Section>
    )
}

export default GeneralInformationFieldset
