import { t } from '@lingui/macro'
import { useLingui } from '@lingui/react'
import { studentEducationLevelEnumTranslations } from 'components/Domain/Participation/translations/translations'
import React from 'react'
import ConditionalCard from 'components/Core/Containers/ConditionalCard'
import DateInput from 'components/Core/DataEntry/DateInput'
import Input from 'components/Core/DataEntry/Input'
import RadioButton from 'components/Core/DataEntry/RadioButton'
import Select from 'components/Core/DataEntry/Select'
import Field from 'components/Core/Field/Field'
import Section from 'components/Core/Field/Section'
import Column from 'components/Core/Layout/Column/Column'
import {
    EducationDoesCurrentlyFollowCourse,
    EducationGroupType,
    EducationLevel,
    EducationTeacherType,
    EducationType,
    Maybe,
} from 'api/types/types'
import Paragraph from 'components/Core/Typography/Paragraph'
import { DateFormatters } from 'utils/formatters/Date/Date'

interface Props {
    lastFollowedEducationPrefillData?: EducationInformationFieldsetPrefillData
    lastFollowedEducationNamespace?: string // e.g. educations[0] or educations[1] (needed for inline error assigment)
    currentEducationPrefillData?: EducationInformationFieldsetPrefillData
    currentEducationNamespace?: string // e.g. educations[0] or educations[1] (needed for inline error assigment)
    readOnly?: boolean
}

export interface EducationInformationFieldsetModel {
    id?: string
    type?: Maybe<EducationType>
    level?: Maybe<EducationLevel>
    degree?: Maybe<'YES' | 'NO'>
    degreeGranted?: Maybe<'YES' | 'NO'>
    doesCurrentlyFollowCourse?: Maybe<EducationDoesCurrentlyFollowCourse>
    startDate?: Maybe<string>
    endDate?: Maybe<string>
    institution?: Maybe<string>
    group?: Maybe<EducationGroupType>
    teachertype?: Maybe<EducationTeacherType>
}

export interface EducationInformationFieldsetPrefillData {
    id: string
    type: EducationType
    level: EducationLevel
    degree: boolean
    degreeGranted: boolean
    doesCurrentlyFollowCourse: EducationDoesCurrentlyFollowCourse
    startDate: string
    endDate: string
    institution: string
    group: EducationGroupType
    teachertype: EducationTeacherType
}

export const EducationInformationFieldset: React.FunctionComponent<Props> = props => {
    const {
        lastFollowedEducationPrefillData,
        lastFollowedEducationNamespace,
        currentEducationPrefillData,
        currentEducationNamespace,
        readOnly,
    } = props
    const { i18n } = useLingui()
    const educationLevelOptions = getEducationLevelOptions()

    if (readOnly) {
        return (
            <Section title={i18n._(t`Opleiding`)}>
                <Column spacing={4}>
                    <Field label={i18n._(t`Laatst gevolgde opleiding`)} horizontal={true}>
                        <Paragraph>
                            {lastFollowedEducationPrefillData?.level &&
                                educationLevelOptions.find(o => o.value === lastFollowedEducationPrefillData?.level)
                                    ?.label}
                        </Paragraph>
                    </Field>

                    <Field label={i18n._(t`Gevolgd tot`)} horizontal={true}>
                        <Paragraph>
                            {lastFollowedEducationPrefillData?.endDate &&
                                DateFormatters.formattedDate(lastFollowedEducationPrefillData.endDate)}
                        </Paragraph>
                    </Field>

                    <Field label={i18n._(t`Diploma behaald`)} horizontal={true}>
                        <Column spacing={4}>
                            <Paragraph>
                                {lastFollowedEducationPrefillData?.degreeGranted === true && i18n._(t`Ja`)}
                                {lastFollowedEducationPrefillData?.degreeGranted === false && i18n._(t`Nee`)}
                            </Paragraph>
                        </Column>
                    </Field>

                    <Field label={i18n._(t`Volg je op dit moment een opleiding?`)} horizontal={true}>
                        <Column spacing={4}>
                            <RadioButton
                                label={i18n._(t`Ja`)}
                                name={'hasCurrentEducation'}
                                value={'YES'}
                                defaultChecked={!!currentEducationPrefillData}
                            />
                            {currentEducationPrefillData && (
                                <Column spacing={4}>
                                    <Paragraph>{i18n._(t`Ja`)}</Paragraph>
                                    <ConditionalCard>
                                        <Column spacing={4}>
                                            <Field label={i18n._(t`Begindatum`)}>
                                                <Paragraph>
                                                    {currentEducationPrefillData.startDate &&
                                                        DateFormatters.formattedDate(
                                                            currentEducationPrefillData.startDate
                                                        )}
                                                </Paragraph>
                                            </Field>

                                            <Field label={i18n._(t`Einddatum`)}>
                                                <Paragraph>
                                                    {currentEducationPrefillData.endDate &&
                                                        DateFormatters.formattedDate(
                                                            currentEducationPrefillData.endDate
                                                        )}
                                                </Paragraph>
                                            </Field>

                                            <Field label={i18n._(t`Opleidingsniveau`)}>
                                                <Paragraph>
                                                    {currentEducationPrefillData?.level &&
                                                        educationLevelOptions.find(
                                                            o => o.value === currentEducationPrefillData?.level
                                                        )?.label}
                                                </Paragraph>
                                            </Field>

                                            <Field label={i18n._(t`Waar volg je de opleiding?`)}>
                                                <Paragraph>{currentEducationPrefillData?.institution}</Paragraph>
                                            </Field>

                                            <Field label={i18n._(t`Biedt de opleiding een diploma of certificaat?`)}>
                                                <Column spacing={4}>
                                                    <Paragraph>
                                                        {currentEducationPrefillData?.degree === true && i18n._(t`Ja`)}
                                                        {currentEducationPrefillData?.degree === false &&
                                                            i18n._(t`Nee`)}
                                                    </Paragraph>
                                                </Column>
                                            </Field>
                                        </Column>
                                    </ConditionalCard>
                                </Column>
                            )}
                            {!currentEducationPrefillData && <Paragraph>{i18n._(t`Nee`)}</Paragraph>}
                        </Column>
                    </Field>
                </Column>
            </Section>
        )
    }

    return (
        <Section title={i18n._(t`Opleiding`)}>
            <Column spacing={8}>
                <Field label={i18n._(t`Laatst gevolgde opleiding`)} horizontal={true}>
                    <Select
                        list={`${lastFollowedEducationNamespace}.level`}
                        name={`${lastFollowedEducationNamespace}.level`}
                        placeholder={i18n._(t`Selecteer niveau`)}
                        options={educationLevelOptions}
                        defaultValue={lastFollowedEducationPrefillData?.level ?? undefined}
                    />
                </Field>

                <Field label={i18n._(t`Gevolgd tot`)} horizontal={true}>
                    <DateInput
                        name={`${lastFollowedEducationNamespace}.endDate`}
                        placeholder={i18n._(t`01/01/2020`)}
                        defaultValue={lastFollowedEducationPrefillData?.endDate ?? undefined}
                    />
                </Field>

                <Field label={i18n._(t`Diploma behaald`)} horizontal={true}>
                    <Column spacing={4}>
                        <RadioButton
                            label={i18n._(t`Ja`)}
                            name={`${lastFollowedEducationNamespace}.degreeGranted`}
                            value={'YES'}
                            defaultChecked={lastFollowedEducationPrefillData?.degreeGranted === true}
                        />
                        <RadioButton
                            label={i18n._(t`Nee`)}
                            name={`${lastFollowedEducationNamespace}.degreeGranted`}
                            value={'NO'}
                            defaultChecked={lastFollowedEducationPrefillData?.degreeGranted === false}
                        />
                    </Column>
                </Field>

                <Field label={i18n._(t`Volg je op dit moment een opleiding?`)} horizontal={true}>
                    <Column spacing={4}>
                        <RadioButton
                            label={i18n._(t`Ja`)}
                            name={'hasCurrentEducation'}
                            value={'YES'}
                            defaultChecked={!!currentEducationPrefillData}
                        />
                        {currentEducationPrefillData && (
                            <ConditionalCard>
                                <Column spacing={4}>
                                    <Field label={i18n._(t`Begindatum`)}>
                                        <DateInput
                                            name={`${currentEducationNamespace}.startDate`}
                                            placeholder={i18n._(t`01/01/2020`)}
                                            defaultValue={currentEducationPrefillData.startDate ?? undefined}
                                        />
                                    </Field>

                                    <Field label={i18n._(t`Einddatum`)}>
                                        <DateInput
                                            name={`${currentEducationNamespace}.endDate`}
                                            placeholder={i18n._(t`01/01/2020`)}
                                            defaultValue={currentEducationPrefillData.endDate ?? undefined}
                                        />
                                    </Field>

                                    <Field label={i18n._(t`Opleidingsniveau`)}>
                                        <Select
                                            list={`${currentEducationNamespace}.level`}
                                            name={`${currentEducationNamespace}.level`}
                                            placeholder={i18n._(t`Selecteer niveau`)}
                                            options={educationLevelOptions}
                                            defaultValue={currentEducationPrefillData?.level ?? undefined}
                                        />
                                    </Field>

                                    <Field label={i18n._(t`Waar volg je de opleiding?`)}>
                                        <Input
                                            name={`${currentEducationNamespace}.institution`}
                                            placeholder={i18n._(t`Instituut`)}
                                            defaultValue={currentEducationPrefillData?.institution ?? undefined}
                                        />
                                    </Field>

                                    <Field label={i18n._(t`Biedt de opleiding een diploma of certificaat?`)}>
                                        <Column spacing={4}>
                                            <RadioButton
                                                label={i18n._(t`Ja`)}
                                                name={`${currentEducationNamespace}.degree`}
                                                value={'YES'}
                                                defaultChecked={currentEducationPrefillData?.degree === true}
                                            />
                                            <RadioButton
                                                label={i18n._(t`Nee`)}
                                                name={`${currentEducationNamespace}.degree`}
                                                value={'NO'}
                                                defaultChecked={currentEducationPrefillData?.degree === false}
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
                            defaultChecked={!currentEducationPrefillData}
                        />

                        {/* <RadioButton
                            label={i18n._(t`Nee, maar wel gevolgd`)}
                            name={'followingEducationRightNow'}
                            value="no, but followed"
                            defaultChecked={
                                prefillData?.followingEducationRightNow === StudentFollowingEducationRightNowEnum.Yes
                            }
                        />
                        <ConditionalCard>
                            <Column spacing={4}>
                                <Field label={i18n._(t`Gevolgd tot`)}>
                                    <DateInput
                                        name="followingEducationRightNowNoEndDate"
                                        placeholder={i18n._(t`01/01/2020`)}
                                        defaultValue={prefillData?.followingEducationRightNowNoEndDate ?? undefined}
                                    />
                                </Field>

                                <Field label={i18n._(t`Opleidingsniveau`)}>
                                    <Input
                                        name="followingEducationRightNowNoLevel"
                                        placeholder={i18n._(t`Selecteer niveau`)}
                                        defaultValue={prefillData?.followingEducationRightNowNoLevel ?? undefined}
                                    />
                                </Field>

                                <Field label={i18n._(t`Diploma`)}>
                                    <Column spacing={4}>
                                        <RadioButton
                                            label={i18n._(t`Ja`)}
                                            name={'followingEducationRightNowNoGotCertificate'}
                                            value={FollowingEducationRightNowNoGotCertificateEnum.yes}
                                        />
                                        <RadioButton
                                            label={i18n._(t`Nee`)}
                                            name={'followingEducationRightNowNoGotCertificate'}
                                            value={FollowingEducationRightNowNoGotCertificateEnum.no}
                                        />
                                    </Column>
                                </Field>
                            </Column>
                        </ConditionalCard> */}
                    </Column>
                </Field>
            </Column>
        </Section>
    )

    function getEducationLevelOptions() {
        return Object.values(EducationLevel).map(value => ({
            label: studentEducationLevelEnumTranslations[value] ?? 'TRANSLATION NOT SUPPORTED',
            value,
        }))
    }
}
