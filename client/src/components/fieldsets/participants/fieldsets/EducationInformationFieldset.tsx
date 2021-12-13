import { t } from '@lingui/macro'
import { useLingui } from '@lingui/react'
import React, { ChangeEventHandler, useState } from 'react'
import ConditionalCard from 'components/Core/Containers/ConditionalCard'
import DateInput from 'components/Core/DataEntry/DateInput'
import Input from 'components/Core/DataEntry/Input'
import RadioButton from 'components/Core/DataEntry/RadioButton'
import Field from 'components/Core/Field/Field'
import Section from 'components/Core/Field/Section'
import Column from 'components/Core/Layout/Column/Column'
import { EducationLevel, Maybe } from 'api/types/types'
import Paragraph from 'components/Core/Typography/Paragraph'
import { DateFormatters } from 'utils/formatters/Date/Date'
import { Select } from 'components/Core/DataEntry/Select'

interface Props {
    prefillData?: EducationInformationFieldsetPrefillData
    readOnly?: boolean
}

export interface EducationInformationFieldsetModel {
    // last followed education
    'educations[0].level'?: Maybe<EducationLevel>
    'educations[0].degreeGranted'?: Maybe<'YES' | 'NO'>
    'educations[0].endDate'?: Maybe<string>

    // current education
    'educations[1].startDate'?: Maybe<string>
    'educations[1].endDate'?: Maybe<string>
    'educations[1].level'?: Maybe<EducationLevel>
    'educations[1].institution'?: Maybe<string>
    'educations[1].degree'?: Maybe<'YES' | 'NO'>
}

export interface EducationInformationFieldsetPrefillData {
    // last followed education
    'educations[0].level'?: Maybe<EducationLevel>
    'educations[0].degreeGranted'?: Maybe<boolean>
    'educations[0].endDate'?: Maybe<string>

    // current education
    'educations[1].startDate'?: Maybe<string>
    'educations[1].endDate'?: Maybe<string>
    'educations[1].level'?: Maybe<EducationLevel>
    'educations[1].institution'?: Maybe<string>
    'educations[1].degree'?: Maybe<boolean>
}

export const EducationInformationFieldset: React.FunctionComponent<Props> = props => {
    const { prefillData, readOnly } = props
    const { i18n } = useLingui()
    const educationLevelOptions = getEducationLevelOptions()

    const defaultHasCurrentEducation =
        prefillData &&
        (prefillData['educations[1].startDate'] ||
            prefillData['educations[1].endDate'] ||
            prefillData['educations[1].level'] ||
            prefillData['educations[1].institution'] ||
            typeof prefillData['educations[1].degree'] === 'boolean')

    const [hasCurrentEducation, setHasCurrentEducation] = useState<boolean>(!!defaultHasCurrentEducation)

    const onChangeHasCurrentEducation: ChangeEventHandler<HTMLInputElement> = event => {
        setHasCurrentEducation(event.currentTarget.value === 'YES')
    }

    if (readOnly) {
        return (
            <Section title={i18n._(t`Opleiding`)}>
                <Column spacing={4}>
                    <Field label={i18n._(t`Laatst gevolgde opleiding`)} horizontal={true}>
                        <Paragraph>
                            {prefillData?.['educations[0].level'] &&
                                educationLevelOptions.find(o => o.value === prefillData?.['educations[0].level'])
                                    ?.label}
                        </Paragraph>
                    </Field>

                    <Field label={i18n._(t`Gevolgd tot`)} horizontal={true}>
                        <Paragraph>
                            {prefillData?.['educations[0].endDate'] &&
                                DateFormatters.formattedDate(prefillData['educations[0].endDate'])}
                        </Paragraph>
                    </Field>

                    <Field label={i18n._(t`Diploma behaald`)} horizontal={true}>
                        <Column spacing={4}>
                            <Paragraph>
                                {prefillData?.['educations[0].degreeGranted'] === true && i18n._(t`Ja`)}
                                {prefillData?.['educations[0].degreeGranted'] === false && i18n._(t`Nee`)}
                            </Paragraph>
                        </Column>
                    </Field>

                    <Field label={i18n._(t`Volg je op dit moment een opleiding?`)} horizontal={true}>
                        <Column spacing={4}>
                            <Paragraph>
                                {hasCurrentEducation && i18n._(t`Ja`)}
                                {!hasCurrentEducation && i18n._(t`Nee`)}
                            </Paragraph>
                            {hasCurrentEducation && (
                                <Column spacing={4}>
                                    <ConditionalCard>
                                        <Column spacing={4}>
                                            <Field label={i18n._(t`Begindatum`)}>
                                                <Paragraph>
                                                    {prefillData?.['educations[1].startDate'] &&
                                                        DateFormatters.formattedDate(
                                                            prefillData?.['educations[1].startDate']
                                                        )}
                                                </Paragraph>
                                            </Field>

                                            <Field label={i18n._(t`Einddatum`)}>
                                                <Paragraph>
                                                    {prefillData?.['educations[1].endDate'] &&
                                                        DateFormatters.formattedDate(
                                                            prefillData?.['educations[1].endDate']
                                                        )}
                                                </Paragraph>
                                            </Field>

                                            <Field label={i18n._(t`Opleidingsniveau`)}>
                                                <Paragraph>
                                                    {prefillData?.['educations[1].level'] &&
                                                        educationLevelOptions.find(
                                                            o => o.value === prefillData?.['educations[1].level']
                                                        )?.label}
                                                </Paragraph>
                                            </Field>

                                            <Field label={i18n._(t`Waar volg je de opleiding?`)}>
                                                <Paragraph>{prefillData?.['educations[1].institution']}</Paragraph>
                                            </Field>

                                            <Field label={i18n._(t`Biedt de opleiding een diploma of certificaat?`)}>
                                                <Paragraph>
                                                    {prefillData?.['educations[1].degree'] === true && i18n._(t`Ja`)}
                                                    {prefillData?.['educations[1].degree'] === false && i18n._(t`Nee`)}
                                                </Paragraph>
                                            </Field>
                                        </Column>
                                    </ConditionalCard>
                                </Column>
                            )}
                        </Column>
                    </Field>
                </Column>
            </Section>
        )
    }

    return (
        <Section title={i18n._(t`Opleiding`)}>
            <Column spacing={4}>
                <Field label={i18n._(t`Laatst gevolgde opleiding`)} horizontal={true}>
                    <Select
                        list={`educations[0].level`}
                        name={`educations[0].level`}
                        placeholder={i18n._(t`Selecteer niveau`)}
                        options={educationLevelOptions}
                        defaultValue={
                            prefillData?.['educations[0].level']
                                ? {
                                      value: prefillData['educations[0].level'],
                                      label: prefillData['educations[0].level'],
                                  }
                                : undefined
                        }
                    />
                </Field>

                <Field label={i18n._(t`Gevolgd tot`)} horizontal={true}>
                    <DateInput
                        name={`educations[0].endDate`}
                        placeholder={i18n._(t`01/01/2020`)}
                        defaultValue={prefillData?.['educations[0].endDate'] ?? undefined}
                    />
                </Field>

                <Field label={i18n._(t`Diploma behaald`)} horizontal={true}>
                    <Column spacing={4}>
                        <RadioButton
                            label={i18n._(t`Ja`)}
                            name={`educations[0].degreeGranted`}
                            value={'YES'}
                            defaultChecked={prefillData?.['educations[0].degreeGranted'] === true}
                        />
                        <RadioButton
                            label={i18n._(t`Nee`)}
                            name={`educations[0].degreeGranted`}
                            value={'NO'}
                            defaultChecked={prefillData?.['educations[0].degreeGranted'] === false}
                        />
                    </Column>
                </Field>

                <Field label={i18n._(t`Volg je op dit moment een opleiding?`)} horizontal={true}>
                    <Column spacing={4}>
                        <RadioButton
                            label={i18n._(t`Ja`)}
                            name={'hasCurrentEducation'}
                            value={'YES'}
                            defaultChecked={!!hasCurrentEducation}
                            onChange={onChangeHasCurrentEducation}
                        />
                        {hasCurrentEducation && (
                            <ConditionalCard>
                                <Column spacing={4}>
                                    <Field label={i18n._(t`Begindatum`)}>
                                        <DateInput
                                            name={`educations[1].startDate`}
                                            placeholder={i18n._(t`01/01/2020`)}
                                            defaultValue={prefillData?.['educations[1].startDate'] ?? undefined}
                                        />
                                    </Field>

                                    <Field label={i18n._(t`Einddatum`)}>
                                        <DateInput
                                            name={`educations[1].endDate`}
                                            placeholder={i18n._(t`01/01/2020`)}
                                            defaultValue={prefillData?.['educations[1].endDate'] ?? undefined}
                                        />
                                    </Field>

                                    <Field label={i18n._(t`Opleidingsniveau`)}>
                                        <Select
                                            list={`educations[1].level`}
                                            name={`educations[1].level`}
                                            placeholder={i18n._(t`Selecteer niveau`)}
                                            options={educationLevelOptions}
                                            defaultValue={
                                                prefillData?.['educations[1].level']
                                                    ? {
                                                          value: prefillData['educations[1].level'],
                                                          label: prefillData['educations[1].level'],
                                                      }
                                                    : undefined
                                            }
                                        />
                                    </Field>

                                    <Field label={i18n._(t`Waar volg je de opleiding?`)}>
                                        <Input
                                            name={`educations[1].institution`}
                                            placeholder={i18n._(t`Instituut`)}
                                            defaultValue={prefillData?.['educations[1].institution'] ?? undefined}
                                        />
                                    </Field>

                                    <Field label={i18n._(t`Biedt de opleiding een diploma of certificaat?`)}>
                                        <Column spacing={4}>
                                            <RadioButton
                                                label={i18n._(t`Ja`)}
                                                name={`educations[1].degree`}
                                                value={'YES'}
                                                defaultChecked={prefillData?.['educations[1].degree'] === true}
                                            />
                                            <RadioButton
                                                label={i18n._(t`Nee`)}
                                                name={`educations[1].degree`}
                                                value={'NO'}
                                                defaultChecked={prefillData?.['educations[1].degree'] === false}
                                            />
                                        </Column>
                                    </Field>
                                </Column>
                            </ConditionalCard>
                        )}

                        <RadioButton
                            label={i18n._(t`Nee`)}
                            name={'hasCurrentEducation'}
                            value={'NO'}
                            defaultChecked={!hasCurrentEducation}
                            onChange={onChangeHasCurrentEducation}
                        />
                    </Column>
                </Field>
            </Column>
        </Section>
    )

    function getEducationLevelOptions() {
        return Object.values(EducationLevel).map(value => ({
            label: value,
            value,
        }))
    }
}
