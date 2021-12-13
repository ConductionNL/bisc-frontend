import { t } from '@lingui/macro'
import { useLingui } from '@lingui/react'
import { DutchNT2Level, DutchNTType, Maybe } from 'api/types/types'
import { NewSelectV2 } from 'components/Core/DataEntry/NewSelectV2'
import { YearInput } from 'components/Core/DataEntry/YearInput'
import Paragraph from 'components/Core/Typography/Paragraph'
import { studentDutchLastKnownLevelEnumTranslations } from 'components/Domain/Participation/translations/translations'
import React, { useEffect, useState } from 'react'
import ConditionalCard from '../../Core/Containers/ConditionalCard'
import Input from '../../Core/DataEntry/Input'
import RadioButton from '../../Core/DataEntry/RadioButton'
import Field from '../../Core/Field/Field'
import Section from '../../Core/Field/Section'
import Column from '../../Core/Layout/Column/Column'

interface Props {
    prefillData?: DutchNTFieldsetPrefillData
    readOnly?: boolean
}

export interface DutchNTFieldsetModel {
    'intake.dutchNTLevel'?: Maybe<DutchNTType>
    'intake.inNetherlandsSinceYear'?: Maybe<string>
    'intake.languageInDailyLife'?: Maybe<string>
    'intake.knowsLatinAlphabet'?: Maybe<'YES' | 'NO'>
    'intake.lastKnownLevel'?: Maybe<DutchNT2Level>
}

export interface DutchNTFieldsetPrefillData {
    'intake.dutchNTLevel'?: Maybe<DutchNTType>
    'intake.inNetherlandsSinceYear'?: Maybe<number>
    'intake.languageInDailyLife'?: Maybe<string>
    'intake.knowsLatinAlphabet'?: Maybe<boolean>
    'intake.lastKnownLevel'?: Maybe<DutchNT2Level>
}

export const DutchNTFieldset: React.FunctionComponent<Props> = props => {
    const { prefillData, readOnly } = props
    const { i18n } = useLingui()
    const [dutchNTLevel, setDutchNTLevel] = useState<DutchNTType | undefined>(undefined)

    useEffect(() => {
        setDutchNTLevel(prefillData?.['intake.dutchNTLevel'] ?? undefined)
    }, [prefillData])
    const levelOptions = getStudentDutchLastKnownLevelEnumTranslationsOptions()

    if (readOnly) {
        return (
            <Section title={i18n._(t`Nederlands NT`)}>
                <Column spacing={4}>
                    <Field label={i18n._(t`Nederlands NT1 of NT2`)} horizontal={true}>
                        <Column spacing={4}>
                            <Paragraph>{prefillData?.['intake.dutchNTLevel']}</Paragraph>
                            {dutchNTLevel === DutchNTType.Nt2 && (
                                <ConditionalCard>
                                    <Column spacing={5}>
                                        <Field label={i18n._(t`In Nederland sinds`)}>
                                            <Paragraph>{prefillData?.['intake.inNetherlandsSinceYear']}</Paragraph>
                                        </Field>

                                        <Field
                                            label={i18n._(t`Welke taal spreek je het meest in het dagelijks leven?`)}
                                        >
                                            <Paragraph>{prefillData?.['intake.languageInDailyLife']}</Paragraph>
                                        </Field>

                                        <Field label={i18n._(t`Ken je het latijnse alfabet?`)}>
                                            <Paragraph>
                                                {prefillData?.['intake.knowsLatinAlphabet']
                                                    ? i18n._(t`Ja`)
                                                    : i18n._(t`Nee`)}
                                            </Paragraph>
                                        </Field>

                                        <Field label={i18n._(t`Laatst bekende taalniveau`)} horizontal={true}>
                                            <Paragraph>
                                                {
                                                    levelOptions.find(
                                                        levelOption =>
                                                            levelOption.value === prefillData?.['intake.lastKnownLevel']
                                                    )?.label
                                                }
                                            </Paragraph>
                                        </Field>
                                    </Column>
                                </ConditionalCard>
                            )}
                        </Column>
                    </Field>
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
                            name={'intake.dutchNTLevel'}
                            value={DutchNTType.Nt1}
                            label={i18n._(t`NT1`)}
                            onChange={e => setDutchNTLevel(e.target.value as DutchNTType)}
                            checked={dutchNTLevel === DutchNTType.Nt1}
                        />
                        <RadioButton
                            name={'intake.dutchNTLevel'}
                            value={DutchNTType.Nt2}
                            label={i18n._(t`NT2`)}
                            onChange={e => setDutchNTLevel(e.target.value as DutchNTType)}
                            checked={dutchNTLevel === DutchNTType.Nt2}
                        />
                        {dutchNTLevel === DutchNTType.Nt2 && (
                            <ConditionalCard>
                                <Column spacing={5}>
                                    <Field label={i18n._(t`In Nederland sinds`)}>
                                        <YearInput
                                            name="intake.inNetherlandsSinceYear"
                                            placeholder={i18n._(t`JJJJ`)}
                                            defaultValue={prefillData?.['intake.inNetherlandsSinceYear'] ?? undefined}
                                        />
                                    </Field>

                                    <Field label={i18n._(t`Welke taal spreek je het meest in het dagelijks leven?`)}>
                                        <Input
                                            name="intake.languageInDailyLife"
                                            placeholder={i18n._(t`Taal`)}
                                            defaultValue={prefillData?.['intake.languageInDailyLife'] ?? undefined}
                                        />
                                    </Field>

                                    <Field label={i18n._(t`Ken je het latijnse alfabet?`)}>
                                        <Column spacing={3}>
                                            <RadioButton
                                                name={'intake.knowsLatinAlphabet'}
                                                value={'YES'}
                                                label={i18n._(t`Ja`)}
                                                defaultChecked={prefillData?.['intake.knowsLatinAlphabet'] === true}
                                            />
                                            <RadioButton
                                                name={'intake.knowsLatinAlphabet'}
                                                value={'NO'}
                                                label={i18n._(t`Nee`)}
                                                defaultChecked={prefillData?.['intake.knowsLatinAlphabet'] === false}
                                            />
                                        </Column>
                                    </Field>

                                    <Field label={i18n._(t`Laatst bekende taalniveau`)} horizontal={true}>
                                        <NewSelectV2
                                            list="intake.lastKnownLevel"
                                            name="intake.lastKnownLevel"
                                            placeholder={i18n._(t`Selecteer niveau`)}
                                            options={levelOptions}
                                            defaultValue={
                                                prefillData?.['intake.lastKnownLevel']
                                                    ? {
                                                          value: prefillData['intake.lastKnownLevel'],
                                                          label:
                                                              studentDutchLastKnownLevelEnumTranslations[
                                                                  prefillData['intake.lastKnownLevel']
                                                              ],
                                                      }
                                                    : undefined
                                            }
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
        return Object.values(DutchNT2Level).map(value => ({
            label: studentDutchLastKnownLevelEnumTranslations[value] ?? 'TRANSLATION NOT SUPPORTED',
            value: value,
        }))
    }
}
