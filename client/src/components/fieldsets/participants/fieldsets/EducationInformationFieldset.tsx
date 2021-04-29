import { t } from '@lingui/macro'
import { useLingui } from '@lingui/react'
import {
    studentStudentFollowingEducationRightNowLevelEnumTranslations,
    studentStudentLastFollowedEducationEnumTranslations,
} from 'components/Domain/Participation/translations/translations'
import {
    Maybe,
    Scalars,
    StudentFollowingEducationRightNowEnum,
    StudentFollowingEducationRightNowLevelEnum,
    StudentLastFollowedEducationEnum,
} from 'generated/graphql'
import React from 'react'
import ConditionalCard from '../../../Core/Containers/ConditionalCard'
import DateInput from '../../../Core/DataEntry/DateInput'
import Input from '../../../Core/DataEntry/Input'
import RadioButton from '../../../Core/DataEntry/RadioButton'
import Select from '../../../Core/DataEntry/Select'
import ControlField from '../../../Core/Field/ControlField'
import Field from '../../../Core/Field/Field'
import Section from '../../../Core/Field/Section'
import Column from '../../../Core/Layout/Column/Column'
import { ConnectedFieldsetProps } from '../../../hooks/fieldsets/types'
import { useFieldsetContent } from '../../../hooks/fieldsets/useFieldsetContent'
import { useFieldsetControl } from '../../../hooks/fieldsets/useFieldsetControl'

interface Props extends ConnectedFieldsetProps<Fields> {
    prefillData?: EducationInformationFieldsetPrefillData
    readOnly?: boolean
}

export interface EducationInformationFieldsetModel {
    lastFollowedEducation?: StudentLastFollowedEducationEnum
    didGraduate?: DidGraduateEnum
    followingEducationRightNow?: StudentFollowingEducationRightNowEnum
    followingEducationRightNowYesStartDate?: string
    followingEducationRightNowYesEndDate?: string
    followingEducationRightNowYesLevel?: StudentFollowingEducationRightNowLevelEnum
    followingEducationRightNowYesInstitute?: string
    followingEducationRightNowYesProvidesCertificate?: FollowingEducationRightNowYesProvidesCertificateEnum
    followingEducationRightNowNoEndDate: string
    followingEducationRightNowNoLevel: string
    followingEducationRightNowNoGotCertificate: FollowingEducationRightNowNoGotCertificateEnum
}

export interface EducationInformationFieldsetPrefillData {
    lastFollowedEducation?: Maybe<StudentLastFollowedEducationEnum>
    didGraduate?: Maybe<Scalars['Boolean']>
    followingEducationRightNow?: Maybe<StudentFollowingEducationRightNowEnum>
    followingEducationRightNowYesStartDate?: Maybe<Scalars['String']>
    followingEducationRightNowYesEndDate?: Maybe<Scalars['String']>
    followingEducationRightNowYesLevel?: Maybe<StudentFollowingEducationRightNowLevelEnum>
    followingEducationRightNowYesInstitute?: Maybe<Scalars['String']>
    followingEducationRightNowYesProvidesCertificate?: Maybe<Scalars['Boolean']>
    followingEducationRightNowNoEndDate?: Maybe<Scalars['String']>
    followingEducationRightNowNoLevel?: Maybe<Scalars['String']>
    followingEducationRightNowNoGotCertificate?: Maybe<Scalars['Boolean']>
}
export enum DidGraduateEnum {
    yes = 'yes',
    no = 'no',
}
export enum FollowingEducationRightNowYesProvidesCertificateEnum {
    yes = 'yes',
    no = 'no',
}
export enum FollowingEducationRightNowNoGotCertificateEnum {
    yes = 'yes',
    no = 'no',
}

type Fields =
    | 'lastFollowedEducation'
    | 'didGraduate'
    | 'followingEducationRightNow'
    | 'followingEducationRightNowYesStartDate'
    | 'followingEducationRightNowYesEndDate'
    | 'followingEducationRightNowYesLevel'
    | 'followingEducationRightNowYesInstitute'
    | 'followingEducationRightNowYesProvidesCertificate'
    | 'followingEducationRightNowNoEndDate'
    | 'followingEducationRightNowNoLevel'
    | 'followingEducationRightNowNoGotCertificate'

const EducationInformationFieldset: React.FunctionComponent<Props> = props => {
    const { prefillData, readOnly, fieldNaming, fieldControls } = props
    const { i18n } = useLingui()
    const content = useFieldsetContent<Fields>(
        {
            title: i18n._(t`Opleiding`),
            lastFollowedEducation: {
                label: i18n._(t`Laatst gevolgde opleiding`),
                placeholder: i18n._(t`Selecteer niveau`),
            },
            didGraduate: {
                label: i18n._(t`Diploma behaald`),
            },
            followingEducationRightNow: {
                label: i18n._(t`Volg je op dit moment een opleiding?`),
            },
        },
        fieldNaming
    )
    const studentLastFollowedEducationOptions = getStudentLastFollowedEducationEnumOptions()
    const studentFollowingEducationRighNowLevelEnumOptions = getStudentFollowingEducationRightNowLevelEnumTranslationsOptions()

    const controls = useFieldsetControl<Fields>({}, fieldControls)

    if (readOnly) {
        return (
            <Section title={content.title}>
                <Column spacing={4}>
                    <ControlField
                        control={controls.lastFollowedEducation}
                        label={content.lastFollowedEducation?.label}
                        horizontal={true}
                    >
                        <p>{`${prefillData?.lastFollowedEducation}`}</p>
                    </ControlField>

                    <ControlField control={controls.didGraduate} label={content.didGraduate?.label} horizontal={true}>
                        <p>{prefillData?.didGraduate}</p>
                    </ControlField>

                    <ControlField
                        control={controls.followingEducationRightNow}
                        label={content.followingEducationRightNow?.label}
                        horizontal={true}
                    >
                        <p>{prefillData?.followingEducationRightNow}</p>
                    </ControlField>
                </Column>
            </Section>
        )
    }

    return (
        <Section title={content.title}>
            <Column spacing={8}>
                <ControlField
                    control={controls.lastFollowedEducation}
                    label={content.lastFollowedEducation?.label}
                    horizontal={true}
                >
                    <Select
                        list="lastFollowedEducation"
                        name="lastFollowedEducation"
                        placeholder={content.lastFollowedEducation?.placeholder}
                        options={studentLastFollowedEducationOptions}
                        defaultValue={prefillData?.lastFollowedEducation ?? undefined}
                    />
                </ControlField>

                <ControlField control={controls.didGraduate} label={content?.didGraduate?.label} horizontal={true}>
                    <Column spacing={4}>
                        <RadioButton label={i18n._(t`Ja`)} name={'didGraduate'} value="yes" />
                        <RadioButton label={i18n._(t`Nee`)} name={'didGraduate'} value="no" />
                    </Column>
                </ControlField>

                <ControlField
                    control={controls.followingEducationRightNow}
                    label={content?.followingEducationRightNow?.label}
                    horizontal={true}
                >
                    <Column spacing={4}>
                        <RadioButton
                            label={i18n._(t`Ja`)}
                            name={'followingEducationRightNow'}
                            value={DidGraduateEnum.yes}
                            defaultChecked={
                                prefillData?.followingEducationRightNow === StudentFollowingEducationRightNowEnum.Yes
                            }
                        />
                        <ConditionalCard>
                            <Column spacing={4}>
                                <Field label={i18n._(t`Begindatum`)}>
                                    <DateInput
                                        name="followingEducationRightNowYesStartDate"
                                        placeholder={i18n._(t`01/01/2020`)}
                                        defaultValue={prefillData?.followingEducationRightNowYesStartDate ?? undefined}
                                    />
                                </Field>

                                <Field label={i18n._(t`Einddatum`)}>
                                    <DateInput
                                        name="followingEducationRightNowYesEndDate"
                                        placeholder={i18n._(t`01/01/2020`)}
                                        defaultValue={prefillData?.followingEducationRightNowYesEndDate ?? undefined}
                                    />
                                </Field>

                                <Field label={i18n._(t`Opleidingsniveau`)}>
                                    <Select
                                        list="followingEducationRightNowYesLevel"
                                        name="followingEducationRightNowYesLevel"
                                        placeholder={i18n._(t`Selecteer niveau`)}
                                        options={studentFollowingEducationRighNowLevelEnumOptions}
                                        defaultValue={prefillData?.followingEducationRightNowYesLevel ?? undefined}
                                    />
                                </Field>

                                <Field label={i18n._(t`Waar volg je de opleiding?`)}>
                                    <Input
                                        name="followingEducationRightNowYesInstitute"
                                        placeholder={i18n._(t`Instituut`)}
                                        defaultValue={prefillData?.followingEducationRightNowYesInstitute ?? undefined}
                                    />
                                </Field>

                                <Field label={i18n._(t`Biedt de opleiding een diploma of certificaat?`)}>
                                    <Column spacing={4}>
                                        <RadioButton
                                            label={i18n._(t`Ja`)}
                                            name={'providesCertificate'}
                                            value="yes"
                                            defaultChecked={
                                                prefillData?.followingEducationRightNowYesProvidesCertificate === true
                                            }
                                        />
                                        <RadioButton
                                            label={i18n._(t`Nee`)}
                                            name={'providesCertificate'}
                                            value="no"
                                            defaultChecked={
                                                prefillData?.followingEducationRightNowYesProvidesCertificate === false
                                            }
                                        />
                                    </Column>
                                </Field>
                            </Column>
                        </ConditionalCard>

                        <RadioButton
                            label={i18n._(t`Nee`)}
                            name={'followingEducationRightNow'}
                            value={DidGraduateEnum.no}
                            defaultChecked={
                                prefillData?.followingEducationRightNow === StudentFollowingEducationRightNowEnum.No
                            }
                        />

                        <RadioButton
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
                        </ConditionalCard>
                    </Column>
                </ControlField>
            </Column>
        </Section>
    )

    function getStudentLastFollowedEducationEnumOptions() {
        return Object.values(StudentLastFollowedEducationEnum).map(value => ({
            label: studentStudentLastFollowedEducationEnumTranslations[value] ?? 'TRANSLATION NOT SUPPORTED',
            value,
        }))
    }
    function getStudentFollowingEducationRightNowLevelEnumTranslationsOptions() {
        return Object.values(StudentFollowingEducationRightNowLevelEnum).map(value => ({
            label: studentStudentFollowingEducationRightNowLevelEnumTranslations[value] ?? 'TRANSLATION NOT SUPPORTED',
            value,
        }))
    }
}

export default EducationInformationFieldset
