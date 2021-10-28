import { t } from '@lingui/macro'
import { useLingui } from '@lingui/react'
import { YearInput } from 'components/Core/DataEntry/YearInput'
import Paragraph from 'components/Core/Typography/Paragraph'
import { studentDutchLastKnownLevelEnumTranslations } from 'components/Domain/Participation/translations/translations'
import { StudentDutchLastKnownLevelEnum, StudentDutchNtLevelEnum } from 'generated/enums'
import { Maybe, Scalars } from 'generated/graphql'
import React, { useEffect, useState } from 'react'
import ConditionalCard from '../../Core/Containers/ConditionalCard'
import Input from '../../Core/DataEntry/Input'
import RadioButton from '../../Core/DataEntry/RadioButton'
import Select from '../../Core/DataEntry/Select'
import Field from '../../Core/Field/Field'
import Section from '../../Core/Field/Section'
import Column from '../../Core/Layout/Column/Column'

interface Props {
    prefillData?: DutchNTFieldsetPrefillData
    readOnly?: boolean
}

export interface DutchNTFieldsetModel {
    dutchNTLevel: StudentDutchNtLevelEnum
    inNetherlandsSinceYear: string
    languageInDailyLife: string
    knowsLatinAlphabet: DutchNTFieldsetKnowsLatinAlphabetEnum
    lastKnownLevel: StudentDutchLastKnownLevelEnum
}

export interface DutchNTFieldsetPrefillData {
    dutchNTLevel?: Maybe<StudentDutchNtLevelEnum>
    inNetherlandsSinceYear?: Maybe<Scalars['Float']>
    languageInDailyLife?: Maybe<Scalars['String']>
    knowsLatinAlphabet?: Maybe<Scalars['Boolean']>
    lastKnownLevel?: Maybe<StudentDutchLastKnownLevelEnum>
}
export enum DutchNTFieldsetKnowsLatinAlphabetEnum {
    yes = 'yes',
    no = 'no',
}

const DutchNTFieldset: React.FunctionComponent<Props> = props => {
    const { prefillData, readOnly } = props
    const { i18n } = useLingui()
    const [dutchNTLevel, setDutchNTLevel] = useState<StudentDutchNtLevelEnum | undefined>(undefined)

    useEffect(() => {
        setDutchNTLevel(prefillData?.dutchNTLevel ?? undefined)
    }, [prefillData])
    const levelOptions = getStudentDutchLastKnownLevelEnumTranslationsOptions()

    if (readOnly) {
        return (
            <Section title={i18n._(t`Nederlands NT`)}>
                <Column spacing={4}>
                    <Field label={i18n._(t`Nederlands NT1 of NT2`)} horizontal={true}>
                        <Paragraph>{prefillData?.dutchNTLevel}</Paragraph>
                    </Field>
                    {dutchNTLevel === StudentDutchNtLevelEnum.Nt2 && (
                        <ConditionalCard>
                            <Column spacing={5}>
                                <Field label={i18n._(t`In Nederland sinds`)}>
                                    <Paragraph>{prefillData?.inNetherlandsSinceYear}</Paragraph>
                                </Field>

                                <Field label={i18n._(t`Welke taal spreek je het meest in het dagelijks leven?`)}>
                                    <Paragraph>{prefillData?.languageInDailyLife}</Paragraph>
                                </Field>

                                <Field label={i18n._(t`Ken je het latijnse alfabet?`)}>
                                    <Paragraph>
                                        {prefillData?.knowsLatinAlphabet ? i18n._(t`Ja`) : i18n._(t`Nee`)}
                                    </Paragraph>
                                </Field>

                                <Field label={i18n._(t`Laatst bekende taalniveau`)} horizontal={true}>
                                    <Paragraph>
                                        {
                                            levelOptions.find(
                                                levelOption => levelOption.value === prefillData?.lastKnownLevel
                                            )?.label
                                        }
                                    </Paragraph>
                                </Field>
                            </Column>
                        </ConditionalCard>
                    )}
                </Column>
            </Section>
        )
    }

    return (
        <Section title={i18n._(t`Nederlands NT`)}>
            <Column spacing={4}>
                <Field label={i18n._(t`Ervaring met de doelgroep`)} horizontal={true}>
                    <Column spacing={4}>
                        <RadioButton
                            name={'dutchNTLevel'}
                            value={StudentDutchNtLevelEnum.Nt1}
                            label={i18n._(t`NT1`)}
                            onChange={e => setDutchNTLevel(e.target.value as StudentDutchNtLevelEnum)}
                        />
                        <RadioButton
                            name={'dutchNTLevel'}
                            value={StudentDutchNtLevelEnum.Nt2}
                            label={i18n._(t`NT2`)}
                            onChange={e => setDutchNTLevel(e.target.value as StudentDutchNtLevelEnum)}
                        />
                        {dutchNTLevel === StudentDutchNtLevelEnum.Nt2 && (
                            <ConditionalCard>
                                <Column spacing={5}>
                                    <Field label={i18n._(t`In Nederland sinds`)}>
                                        <YearInput
                                            name="inNetherlandsSinceYear"
                                            placeholder={i18n._(t`JJJJ`)}
                                            defaultValue={prefillData?.inNetherlandsSinceYear ?? undefined}
                                        />
                                    </Field>

                                    <Field label={i18n._(t`Welke taal spreek je het meest in het dagelijks leven?`)}>
                                        <Input
                                            name="languageInDailyLife"
                                            placeholder={i18n._(t`Taal`)}
                                            defaultValue={prefillData?.languageInDailyLife ?? undefined}
                                        />
                                    </Field>

                                    <Field label={i18n._(t`Ken je het latijnse alfabet?`)}>
                                        <Column spacing={3}>
                                            <RadioButton
                                                name={'knowsLatinAlphabet'}
                                                value={DutchNTFieldsetKnowsLatinAlphabetEnum.yes}
                                                label={i18n._(t`Ja`)}
                                            />
                                            <RadioButton
                                                name={'knowsLatinAlphabet'}
                                                value={DutchNTFieldsetKnowsLatinAlphabetEnum.no}
                                                label={i18n._(t`Nee`)}
                                            />
                                        </Column>
                                    </Field>

                                    <Field label={i18n._(t`Laatst bekende taalniveau`)} horizontal={true}>
                                        <Select
                                            list="reason"
                                            name="reason"
                                            placeholder={i18n._(t`Selecteer niveau`)}
                                            options={levelOptions}
                                        />
                                    </Field>
                                </Column>
                            </ConditionalCard>
                        )}
                    </Column>
                </Field>
            </Column>
        </Section>
    )

    function getStudentDutchLastKnownLevelEnumTranslationsOptions() {
        return Object.values(StudentDutchLastKnownLevelEnum).map(value => ({
            label: studentDutchLastKnownLevelEnumTranslations[value] ?? 'TRANSLATION NOT SUPPORTED',
            value: value,
        }))
    }
}

export default DutchNTFieldset
