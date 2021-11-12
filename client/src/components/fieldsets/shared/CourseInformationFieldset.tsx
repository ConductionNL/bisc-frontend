import { t } from '@lingui/macro'
import { useLingui } from '@lingui/react'
import React, { ChangeEventHandler, useState } from 'react'
import ConditionalCard from 'components/Core/Containers/ConditionalCard'
import Input from 'components/Core/DataEntry/Input'
import RadioButton from 'components/Core/DataEntry/RadioButton'
import Field from 'components/Core/Field/Field'
import Section from 'components/Core/Field/Section'
import Column from 'components/Core/Layout/Column/Column'
import { EducationGroupType, EducationTeacherType, Maybe } from 'api/types/types'
import {
    educationGroupTypeEnumTranslations,
    educationTeacherTypeEnumTranslations,
} from 'components/Domain/Participation/translations/translations'
import Paragraph from 'components/Core/Typography/Paragraph'

interface Props {
    prefillData?: CourseInformationFieldsetPrefillData
    readOnly?: boolean
}

export interface CourseInformationFieldsetModel {
    'educations[2].institution'?: Maybe<string>
    'educations[2].teachertype'?: Maybe<EducationTeacherType>
    'educations[2].group'?: Maybe<EducationGroupType>
    'educations[2].hours'?: Maybe<number>
    'educations[2].degree'?: Maybe<'YES' | 'NO'>
}

export interface CourseInformationFieldsetPrefillData {
    'educations[2].institution'?: Maybe<string>
    'educations[2].teachertype'?: Maybe<EducationTeacherType>
    'educations[2].group'?: Maybe<EducationGroupType>
    'educations[2].hours'?: Maybe<number>
    'educations[2].degree'?: Maybe<boolean>
}

export const CourseInformationFieldset: React.FunctionComponent<Props> = props => {
    const { prefillData, readOnly } = props
    const { i18n } = useLingui()

    const defaultHasCourse =
        prefillData &&
        (prefillData['educations[2].institution'] ||
            prefillData['educations[2].teachertype'] ||
            prefillData['educations[2].group'] ||
            typeof prefillData['educations[2].hours'] === 'number' ||
            typeof prefillData['educations[2].degree'] === 'boolean')

    const [hasCourse, setHasCourse] = useState<boolean>(!!defaultHasCourse)

    const onChangeHasCourse: ChangeEventHandler<HTMLInputElement> = event => {
        setHasCourse(event.currentTarget.value === 'YES')
    }

    const teacherTypeOptions = getTeacherTypeOptions()
    const groupTypeOptions = getGroupTypeOptions()

    if (readOnly) {
        return (
            <Section title={i18n._(t`Cursus`)}>
                <Column spacing={4}>
                    <Field label={i18n._(t`Volg je op dit moment een cursus?`)} horizontal={true}>
                        <Column spacing={4}>
                            <Paragraph>
                                {hasCourse && i18n._(t`Ja`)}
                                {!hasCourse && i18n._(t`Nee`)}
                            </Paragraph>
                            {hasCourse && (
                                <ConditionalCard>
                                    <Column spacing={4}>
                                        <Field label={i18n._(t`Waar volg je de cursus/training?`)}>
                                            <Paragraph>{prefillData?.['educations[2].institution']}</Paragraph>
                                        </Field>
                                        <Field label={i18n._(t`Type docent`)}>
                                            {prefillData?.['educations[2].teachertype'] &&
                                                teacherTypeOptions.find(
                                                    o => o.value === prefillData['educations[2].teachertype']
                                                )?.label}
                                        </Field>
                                        <Field label={i18n._(t`Type cursus/training`)}>
                                            {prefillData?.['educations[2].group'] &&
                                                groupTypeOptions.find(
                                                    o => o.value === prefillData['educations[2].group']
                                                )?.label}
                                        </Field>
                                        <Field label={i18n._(t`Aantal uren`)}>
                                            <Paragraph>{prefillData?.['educations[2].hours']}</Paragraph>
                                        </Field>
                                        <Field label={i18n._(t`Biedt de opleiding een certificaat?`)}>
                                            <Paragraph>
                                                {prefillData?.['educations[2].degree'] === true && i18n._(t`Ja`)}
                                                {prefillData?.['educations[2].degree'] === false && i18n._(t`Nee`)}
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
        <Section title={i18n._(t`Cursus`)}>
            <Column spacing={4}>
                <Field label={i18n._(t`Volg je op dit moment een cursus?`)} horizontal={true}>
                    <Column spacing={4}>
                        <RadioButton
                            label={i18n._(t`Ja`)}
                            name={'hasCourse'}
                            value={'YES'}
                            defaultChecked={!!hasCourse}
                            onChange={onChangeHasCourse}
                        />
                        {hasCourse && (
                            <ConditionalCard>
                                <Column spacing={4}>
                                    <Field label={i18n._(t`Waar volg je de cursus/training?`)}>
                                        <Input
                                            name={`educations[2].institution`}
                                            placeholder={i18n._(t`Instituut`)}
                                            defaultValue={prefillData?.['educations[2].institution'] ?? undefined}
                                        />
                                    </Field>
                                    <Field label={i18n._(t`Type docent`)}>
                                        <Column spacing={4}>
                                            {Object.values(EducationTeacherType).map((value, key, array) => (
                                                <RadioButton
                                                    key={`${key}-${array.length}`}
                                                    name={'educations[2].teachertype'}
                                                    value={value}
                                                    defaultChecked={
                                                        prefillData?.['educations[2].teachertype'] === value
                                                    }
                                                    label={teacherTypeOptions.find(o => o.value === value)?.label}
                                                />
                                            ))}
                                        </Column>
                                    </Field>
                                    <Field label={i18n._(t`Type cursus/training`)}>
                                        <Column spacing={4}>
                                            {Object.values(EducationGroupType).map((value, key, array) => (
                                                <RadioButton
                                                    key={`${key}-${array.length}`}
                                                    name={'educations[2].group'}
                                                    value={value}
                                                    defaultChecked={prefillData?.['educations[2].group'] === value}
                                                    label={groupTypeOptions.find(o => o.value === value)?.label}
                                                />
                                            ))}
                                        </Column>
                                    </Field>
                                    <Field label={i18n._(t`Aantal uren`)}>
                                        <Input
                                            placeholder={i18n._(t`Aantal uren`)}
                                            name={'educations[2].hours'}
                                            type={'number'}
                                            defaultValue={prefillData?.['educations[2].hours'] ?? undefined}
                                        />
                                    </Field>
                                    <Field label={i18n._(t`Biedt de opleiding een certificaat?`)}>
                                        <Column spacing={4}>
                                            <RadioButton
                                                label={i18n._(t`Ja`)}
                                                name={`educations[2].degree`}
                                                value={'YES'}
                                                defaultChecked={prefillData?.['educations[2].degree'] === true}
                                            />
                                            <RadioButton
                                                label={i18n._(t`Nee`)}
                                                name={`educations[2].degree`}
                                                value={'NO'}
                                                defaultChecked={prefillData?.['educations[2].degree'] === false}
                                            />
                                        </Column>
                                    </Field>
                                </Column>
                            </ConditionalCard>
                        )}
                        <RadioButton
                            label={i18n._(t`Nee`)}
                            name={'hasCourse'}
                            value={'NO'}
                            defaultChecked={!hasCourse}
                            onChange={onChangeHasCourse}
                        />
                    </Column>
                </Field>
            </Column>
        </Section>
    )

    function getTeacherTypeOptions() {
        return Object.values(EducationTeacherType).map(value => ({
            label: educationTeacherTypeEnumTranslations[value],
            value,
        }))
    }

    function getGroupTypeOptions() {
        return Object.values(EducationGroupType).map(value => ({
            label: educationGroupTypeEnumTranslations[value],
            value,
        }))
    }
}
