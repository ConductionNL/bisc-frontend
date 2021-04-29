import { t } from '@lingui/macro'
import { useLingui } from '@lingui/react'
import { Maybe, StudentFamilyCompositionEnum } from 'generated/graphql'
import React, { ChangeEventHandler, useState } from 'react'
import { Forms } from 'utils/forms'
import Checkbox from '../../Core/DataEntry/Checkbox'
import Input from '../../Core/DataEntry/Input'
import TextArea from '../../Core/DataEntry/TextArea'
import Field from '../../Core/Field/Field'
import Section from '../../Core/Field/Section'
import Column from '../../Core/Layout/Column/Column'

import { familyCompositionTranslations } from '../participants/translations/participantsTranslations'

interface Props {
    prefillData?: GeneralInformationFieldsetModel
    readOnly?: boolean
}

export interface GeneralInformationFieldsetModel {
    countryOfOrigin?: Maybe<string>
    nativeLanguage?: Maybe<string>
    otherLanguages?: Maybe<string>
    familyComposition?: Maybe<Array<StudentFamilyCompositionEnum>>
    childrenCount?: Maybe<number>
    childrenDatesOfBirth?: Maybe<string>
}

const GeneralInformationFieldset: React.FunctionComponent<Props> = props => {
    const { prefillData, readOnly } = props
    const { i18n } = useLingui()

    const [familyComposition, setFamilyComposition] = useState<StudentFamilyCompositionEnum[]>(
        prefillData?.familyComposition || []
    )

    const getChangeFamilyCompositionHandler = (
        value: StudentFamilyCompositionEnum
    ): ChangeEventHandler<HTMLInputElement> => {
        return event => {
            const newFamilyComposition = Forms.getUpdatedValuesArrayForChangedCheckbox<StudentFamilyCompositionEnum>(
                familyComposition,
                value,
                event.currentTarget.checked
            )
            setFamilyComposition(newFamilyComposition)
        }
    }

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
                        <p>
                            {prefillData?.familyComposition &&
                                prefillData?.familyComposition
                                    .map(value => {
                                        return familyCompositionTranslations[value]
                                    })
                                    .join(', ')}
                        </p>
                    </Field>

                    <Field label={i18n._(t`Aantal kinderen`)} horizontal={true}>
                        <p>{prefillData?.childrenCount}</p>
                    </Field>

                    <Field label={i18n._(t`Geboortedatum kinderen`)} horizontal={true}>
                        <p>{prefillData?.childrenDatesOfBirth}</p>
                    </Field>
                </Column>
            </Section>
        )
    }

    return (
        <Section title={i18n._(t`Algemeen`)}>
            <Column spacing={4}>
                <Field label={i18n._(t`Land van herkomst`)} horizontal={true}>
                    <Input
                        name={'countryOfOrigin'}
                        placeholder={i18n._(t`Selecteer land`)}
                        defaultValue={prefillData?.countryOfOrigin || ''}
                    />
                </Field>
                <Field label={i18n._(t`Moedertaal`)} horizontal={true}>
                    <Input
                        name={'nativeLanguage'}
                        placeholder={i18n._(t`Moedertaal`)}
                        defaultValue={prefillData?.nativeLanguage || ''}
                    />
                </Field>
                <Field label={i18n._(t`Welke talen spreek je nog meer?`)} horizontal={true}>
                    <Input
                        name={'otherLanguages'}
                        placeholder={i18n._(t`Talen naast moedertaal`)}
                        defaultValue={prefillData?.otherLanguages || ''}
                    />
                </Field>
                <Field label={i18n._(t`Gezinssamenstelling`)} horizontal={true}>
                    <Column spacing={4}>
                        {Object.values(StudentFamilyCompositionEnum).map((value, key, array) => (
                            <Checkbox
                                key={`${key}-${array.length}`}
                                name={'familyComposition'}
                                value={value}
                                checked={familyComposition.includes(value)}
                                label={familyCompositionTranslations[value]}
                                onChange={getChangeFamilyCompositionHandler(value)}
                            />
                        ))}
                    </Column>
                </Field>
                <Field label={i18n._(t`Aantal kinderen`)} horizontal={true}>
                    <Input
                        name={'childrenCount'}
                        placeholder={i18n._(t`Aantal kinderen`)}
                        defaultValue={prefillData?.childrenCount || ''}
                    />
                </Field>

                <Field label={i18n._(t`Geboortedatums kinderen`)} horizontal={true}>
                    <Field horizontal={true}>
                        <TextArea
                            name={'childrenDatesOfBirth'}
                            placeholder={i18n._(t`Geboortedatums van kinderen`)}
                            defaultValue={prefillData?.childrenDatesOfBirth || ''}
                        />
                    </Field>
                </Field>
            </Column>
        </Section>
    )
}

export default GeneralInformationFieldset
