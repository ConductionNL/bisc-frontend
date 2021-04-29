import { t } from '@lingui/macro'
import { useLingui } from '@lingui/react'
import { Maybe, Scalars, StudentFollowingCourseGroupEnum, StudentFollowingCourseTeacherEnum } from 'generated/graphql'
import React from 'react'
import ConditionalCard from '../../Core/Containers/ConditionalCard'
import Input from '../../Core/DataEntry/Input'
import RadioButton from '../../Core/DataEntry/RadioButton'
import Field from '../../Core/Field/Field'
import Section from '../../Core/Field/Section'
import Column from '../../Core/Layout/Column/Column'

interface Props {
    prefillData?: CourseInformationFieldsetPrefillData
    readOnly?: boolean
}

export interface CourseInformationFieldsetModel {
    isFollowingCourseRightNow?: IsFollowingCourseEnum
    courseName?: string
    courseTeacher?: StudentFollowingCourseTeacherEnum
    courseGroup?: StudentFollowingCourseGroupEnum
    amountOfHours?: string
    doesCourseProvideCertificate?: DoesHaveCertificateEnum
}

export interface CourseInformationFieldsetPrefillData {
    isFollowingCourseRightNow?: Maybe<Scalars['Boolean']>
    courseName?: Maybe<Scalars['String']>
    courseTeacher?: Maybe<StudentFollowingCourseTeacherEnum>
    courseGroup?: Maybe<StudentFollowingCourseGroupEnum>
    amountOfHours?: Maybe<Scalars['Int']>
    doesCourseProvideCertificate?: Maybe<Scalars['Boolean']>
}

export enum IsFollowingCourseEnum {
    Yes = 'yes',
    No = 'no',
}

export enum DoesHaveCertificateEnum {
    Yes = 'yes',
    No = 'no',
}

const CourseInformationFieldset: React.FunctionComponent<Props> = props => {
    const { prefillData, readOnly } = props
    const { i18n } = useLingui()

    if (readOnly) {
        return (
            <Section title={i18n._(t`Cursus/Training`)}>
                <Column spacing={4}>
                    <Field label={i18n._(t`Huidige cursus/training`)} horizontal={true}>
                        <p>{prefillData?.isFollowingCourseRightNow ? i18n._(t`Ja, namelijk:`) : i18n._(t`Nee`)}</p>
                    </Field>
                </Column>
            </Section>
        )
    }

    return (
        <Section
            title={i18n._(t`Cursus/Training`)}
            description={i18n._(
                t`Volg je op dit moment een cursus/training die te maken heeft met het vrijwilligerswerk?`
            )}
        >
            <Column spacing={4}>
                <Field label={i18n._(t`Cursus/training`)} horizontal={true}>
                    <Column spacing={4}>
                        <RadioButton
                            label={i18n._(t`Ja, namelijk:`)}
                            name={'isFollowingCourseRightNow'}
                            value={IsFollowingCourseEnum.Yes}
                            defaultChecked={prefillData?.isFollowingCourseRightNow === true}
                        />
                        <ConditionalCard>
                            <Column spacing={5}>
                                <Field label={i18n._(t`Waar volg je de cursus/training?`)}>
                                    <Input
                                        name="courseName"
                                        placeholder={i18n._(t`naam cursus/training`)}
                                        defaultValue={prefillData?.courseName ?? undefined}
                                    />
                                </Field>

                                <Column>
                                    <Field label={i18n._(t`Type docent`)}>
                                        <Column spacing={3}>
                                            <RadioButton
                                                label={i18n._(t`Professioneel`)}
                                                name={'courseTeacher'}
                                                value={StudentFollowingCourseTeacherEnum.Professional}
                                                defaultChecked={
                                                    prefillData?.courseTeacher ===
                                                    StudentFollowingCourseTeacherEnum.Professional
                                                }
                                            />
                                            <RadioButton
                                                label={i18n._(t`Vrijwilliger`)}
                                                name={'courseTeacher'}
                                                value={StudentFollowingCourseTeacherEnum.Volunteer}
                                                defaultChecked={
                                                    prefillData?.courseTeacher ===
                                                    StudentFollowingCourseTeacherEnum.Volunteer
                                                }
                                            />
                                            <RadioButton
                                                label={i18n._(t`Beide`)}
                                                name={'courseTeacher'}
                                                value={StudentFollowingCourseTeacherEnum.Both}
                                                defaultChecked={
                                                    prefillData?.courseTeacher ===
                                                    StudentFollowingCourseTeacherEnum.Both
                                                }
                                            />
                                        </Column>
                                    </Field>
                                </Column>
                                <Column>
                                    <Field label={i18n._(t`Type cursus/training`)}>
                                        <Column spacing={3}>
                                            <RadioButton
                                                label={i18n._(t`individueel`)}
                                                name={'courseGroup'}
                                                value={StudentFollowingCourseGroupEnum.Individually}
                                                defaultChecked={
                                                    prefillData?.courseGroup ===
                                                    StudentFollowingCourseGroupEnum.Individually
                                                }
                                            />
                                            <RadioButton
                                                label={i18n._(t`Groep`)}
                                                name={'courseGroup'}
                                                value={StudentFollowingCourseGroupEnum.Group}
                                                defaultChecked={
                                                    prefillData?.courseGroup === StudentFollowingCourseGroupEnum.Group
                                                }
                                            />
                                        </Column>
                                    </Field>
                                </Column>

                                <Field label={i18n._(t`Aantal uren`)}>
                                    <Input
                                        placeholder={i18n._(t`Aantal uren`)}
                                        name={'amountOfHours'}
                                        type={'number'}
                                        defaultValue={prefillData?.amountOfHours ?? undefined}
                                    />
                                </Field>
                                <Column>
                                    <Field label={i18n._(t`Biedt de cursus een certificaat?`)}>
                                        <Column spacing={3}>
                                            <RadioButton
                                                label={i18n._(t`Ja`)}
                                                name={'doesCourseProvideCertificate'}
                                                value={DoesHaveCertificateEnum.Yes}
                                                defaultChecked={prefillData?.doesCourseProvideCertificate === true}
                                            />
                                            <RadioButton
                                                label={i18n._(t`Nee`)}
                                                name={'doesCourseProvideCertificate'}
                                                value={DoesHaveCertificateEnum.No}
                                                defaultChecked={prefillData?.doesCourseProvideCertificate === false}
                                            />
                                        </Column>
                                    </Field>
                                </Column>
                            </Column>
                        </ConditionalCard>
                        <RadioButton
                            label={i18n._(t`Nee`)}
                            name={'isFollowingCourseRightNow'}
                            value={IsFollowingCourseEnum.No}
                            defaultChecked={prefillData?.isFollowingCourseRightNow === false}
                        />
                    </Column>
                </Field>
                <Field label={i18n._(t`Andere relevante diploma’s/certificaten`)} horizontal={true}>
                    <Input name="relevantCertificates" placeholder={i18n._(t`Relevante diploma's/certificatenkeur`)} />
                </Field>
            </Column>
        </Section>
    )
}

export default CourseInformationFieldset
