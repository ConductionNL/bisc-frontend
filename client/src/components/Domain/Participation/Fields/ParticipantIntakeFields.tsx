import React from 'react'
import sortBy from 'lodash/sortBy'
import { isBefore, isAfter } from 'date-fns'
import { EducationName, EducationType, MutationError, Student } from 'api/types/types'
import { DateFormatters } from 'utils/formatters/Date/Date'
import HorizontalRule from 'components/Core/HorizontalRule/HorizontalRule'
import {
    BackgroundInformationFieldset,
    BackgroundInformationFieldsetModel,
} from 'components/fieldsets/participants/fieldsets/BackgroundInformationFieldset'
import {
    CivicIntegrationFieldset,
    CivicIntegrationFieldsetModel,
} from 'components/fieldsets/participants/fieldsets/CivicIntegrationInformationFieldset'
import {
    EducationInformationFieldset,
    EducationInformationFieldsetModel,
} from 'components/fieldsets/participants/fieldsets/EducationInformationFieldset'
import {
    LevelInformationFieldset,
    LevelInformationFieldsetModel,
} from 'components/fieldsets/participants/fieldsets/LevelInformationFieldset'
import MotivationInformationFieldset, {
    MotivationInformationFieldsetModel,
} from 'components/fieldsets/participants/fieldsets/MotivationInformationFieldset'
import {
    PermissionsFieldset,
    PermissionsFieldsetFormModel,
} from 'components/fieldsets/participants/fieldsets/PermissionsFieldset'
import ReadingTestInformationFieldset, {
    ReadingTestInformationFieldsetModel,
} from 'components/fieldsets/participants/fieldsets/ReadingTestInformationFieldset'
import {
    RefererInformationFieldset,
    RefererInformationFieldsetModel,
} from 'components/fieldsets/participants/fieldsets/RefererInformationFieldset'
import {
    WorkInformationFieldset,
    WorkInformationFieldsetModel,
} from 'components/fieldsets/participants/fieldsets/WorkInformationFieldset'
import WritingInformationFieldset, {
    WritingInformationFieldsetModel,
} from 'components/fieldsets/participants/fieldsets/WritingInformationFieldset'
import AvailabillityFieldset, { AvailabillityFieldsetModel } from 'components/fieldsets/shared/AvailabillityFieldset'
import {
    ContactInformationFieldset,
    ContactInformationFieldsetFormModel,
} from 'components/fieldsets/shared/ContactInformationFieldset'
import {
    CourseInformationFieldset,
    CourseInformationFieldsetModel,
} from 'components/fieldsets/shared/CourseInformationFieldset'
import { DutchNTFieldset, DutchNTFieldsetModel } from 'components/fieldsets/shared/DutchNTInformationFieldset'
import {
    GeneralInformationFieldset,
    GeneralInformationFieldsetModel,
} from 'components/fieldsets/shared/GeneralInformationFieldset'
import IntakeInformationFieldset from 'components/fieldsets/shared/IntakeInformationFieldset'
import {
    PersonInformationFieldset,
    PersonInformationFieldsetModel,
} from 'components/fieldsets/shared/PersonInformationFieldset'

interface Props {
    student?: Student
    readOnly?: boolean
    mutationError?: MutationError | string
}

export interface ParticipantIntakeFieldsFormModel
    extends CivicIntegrationFieldsetModel,
        PersonInformationFieldsetModel,
        ContactInformationFieldsetFormModel,
        GeneralInformationFieldsetModel,
        RefererInformationFieldsetModel,
        BackgroundInformationFieldsetModel,
        DutchNTFieldsetModel,
        LevelInformationFieldsetModel,
        EducationInformationFieldsetModel,
        CourseInformationFieldsetModel,
        WorkInformationFieldsetModel,
        PermissionsFieldsetFormModel {}

// MotivationInformationFieldsetModel,
// AvailabillityFieldsetModel,
// ReadingTestInformationFieldsetModel,
// WritingInformationFieldsetModel,

export const ParticipantIntakeFields: React.FunctionComponent<Props> = props => {
    const { student, readOnly, mutationError } = props

    console.log('get student', student)
    console.log('mutation error', mutationError)

    const address = student?.person.addresses?.[0]
    const telephone = student?.person.telephones?.[0]
    const telephoneContactPerson = student?.person.telephones?.[1]
    const email = student?.person.emails?.[0]

    const educations = student?.educations || []
    const lastFollowedEducation = educations.find(e => e.name === EducationName.LastFollowedEducation)
    const currentEducation = educations.find(e => e.name === EducationName.CurrentEducation)
    const course = educations.find(e => e.name === EducationName.Course)

    // let lastEducationIndex = allEducations.length - 1
    // function getNewEducationIndex() {
    //     lastEducationIndex++
    //     return lastEducationIndex
    // }

    // const educations = allEducations.filter(e => e.type === EducationType.Education)

    // const orderedEducations = sortBy(educations, e => DateFormatters.parseDateString(e.endDate))

    // const pastEducations = orderedEducations.filter(e => {
    //     const parsedDate = DateFormatters.parseDateString(e.endDate)
    //     return parsedDate && isBefore(parsedDate, new Date())
    // })

    // const lastFollowedEducation = pastEducations[pastEducations.length - 1]
    // const lastFollowedEducationIndex = lastFollowedEducation
    //     ? allEducations.indexOf(lastFollowedEducation)
    //     : getNewEducationIndex()

    // const futureEducations = orderedEducations.filter(e => {
    //     const parsedDate = DateFormatters.parseDateString(e.endDate)
    //     return !parsedDate || isAfter(parsedDate, new Date())
    // })

    // const currentEducation = futureEducations[0]
    // const currentEducationIndex = currentEducation ? allEducations.indexOf(currentEducation) : getNewEducationIndex()

    return (
        <>
            {/* {readOnly && (
                <>
                    <IntakeInformationFieldset
                        prefillData={{
                            nameOfCustomer: NameFormatters.formattedFullname(student?.registrar),
                            dateOfIntake: student?.dateCreated,
                        }}
                    />
                    <HorizontalRule />
                </>
            )} */}

            <CivicIntegrationFieldset
                readOnly={readOnly}
                prefillData={{
                    'civicIntegration.requirement': student?.civicIntegration?.requirement,
                    'civicIntegration.reason': student?.civicIntegration?.reason,
                    'civicIntegration.finishDate': student?.civicIntegration?.finishDate,
                }}
            />
            <HorizontalRule />
            <PersonInformationFieldset
                readOnly={readOnly}
                prefillData={{
                    'person.familyName': student?.person.familyName,
                    'person.additionalName': student?.person.additionalName,
                    'person.givenName': student?.person.givenName,
                    'person.gender': student?.person.gender,
                    'person.birthday': student?.person.birthday,
                }}
                fieldControls={{
                    countryOfOrigin: {
                        hidden: true,
                    },
                    familyName: {
                        required: false,
                    },
                }}
            />
            <HorizontalRule />
            <ContactInformationFieldset
                readOnly={readOnly}
                prefillData={{
                    'person.addresses[0].street': address?.street,
                    'person.addresses[0].houseNumber': address?.houseNumber,
                    'person.addresses[0].houseNumberSuffix': address?.houseNumberSuffix,
                    'person.addresses[0].postalCode': address?.postalCode,
                    'person.addresses[0].locality': address?.locality,
                    'person.telephones[0].telephone': telephone?.telephone,
                    'person.emails[0].email': email?.email,
                    'person.telephones[1].telephone': telephoneContactPerson?.telephone,
                    'person.contactPreference': student?.person.contactPreference,
                    'person.contactPreferenceOther': student?.person.contactPreferenceOther,
                }}
            />
            <HorizontalRule />
            <GeneralInformationFieldset
                readOnly={readOnly}
                prefillData={{
                    'person.birthplace': student?.person.birthplace,
                    'person.primaryLanguage': student?.person.primaryLanguage,
                    'person.speakingLanguages': student?.person.speakingLanguages,
                    'person.maritalStatus': student?.person.maritalStatus,
                    'person.children': student?.person.children,
                }}
            />
            <HorizontalRule />
            <RefererInformationFieldset
                readOnly={readOnly}
                prefillData={{
                    ['intake.referringOrganization']: student?.intake?.referringOrganization,
                    ['intake.referringOrganizationOther']: student?.intake?.referringOrganizationOther,
                    ['intake.referringOrganizationEmail']: student?.intake?.referringOrganizationEmail,
                }}
            />
            <HorizontalRule />
            <BackgroundInformationFieldset
                readOnly={readOnly}
                prefillData={{
                    ['intake.foundVia']: student?.intake?.foundVia,
                    ['intake.foundViaOther']: student?.intake?.foundViaOther,
                    ['intake.wentToLanguageHouseBefore']: student?.intake?.wentToLanguageHouseBefore,
                    ['intake.wentToLanguageHouseBeforeReason']: student?.intake?.wentToLanguageHouseBeforeReason,
                    ['intake.wentToLanguageHouseBeforeYear']: student?.intake?.wentToLanguageHouseBeforeYear,
                    ['intake.network']: student?.intake?.network,
                    ['intake.participationLadder']: student?.intake?.participationLadder,
                }}
            />
            <HorizontalRule />
            <DutchNTFieldset
                readOnly={readOnly}
                prefillData={{
                    ['intake.dutchNTLevel']: student?.intake?.dutchNTLevel,
                    ['intake.inNetherlandsSinceYear']: student?.intake?.inNetherlandsSinceYear,
                    ['intake.languageInDailyLife']: student?.intake?.languageInDailyLife,
                    ['intake.knowsLatinAlphabet']: student?.intake?.knowsLatinAlphabet,
                    ['intake.lastKnownLevel']: student?.intake?.lastKnownLevel,
                }}
            />
            <HorizontalRule />
            <LevelInformationFieldset
                readOnly={readOnly}
                prefillData={{
                    ['intake.speakingLevel']: student?.intake?.speakingLevel,
                }}
            />
            <HorizontalRule />
            <EducationInformationFieldset
                readOnly={readOnly}
                prefillData={{
                    // last followed education
                    'educations[0].level': lastFollowedEducation?.level,
                    'educations[0].degreeGranted': lastFollowedEducation?.degreeGranted,
                    'educations[0].endDate': lastFollowedEducation?.endDate,

                    // current education
                    'educations[1].startDate': currentEducation?.startDate,
                    'educations[1].endDate': currentEducation?.endDate,
                    'educations[1].level': currentEducation?.level,
                    'educations[1].institution': currentEducation?.institution,
                    'educations[1].degree': currentEducation?.degree,
                }}
            />
            <HorizontalRule />
            <CourseInformationFieldset
                readOnly={readOnly}
                prefillData={{
                    // course
                    'educations[2].institution': course?.institution,
                    'educations[2].teachertype': course?.teachertype,
                    'educations[2].group': course?.group,
                    'educations[2].hours': course?.hours,
                    'educations[2].degree': course?.degree,
                }}
            />
            <HorizontalRule />
            <WorkInformationFieldset
                readOnly={readOnly}
                prefillData={{
                    'intake.dayTimeActivities': student?.intake?.dayTimeActivities,
                    'intake.dayTimeActivitiesOther': student?.intake?.dayTimeActivitiesOther,
                    'intake.lastJob': student?.intake?.lastJob,
                    'intake.trainedForJob': student?.intake?.trainedForJob,
                }}
            />
            {/* <HorizontalRule />
            <MotivationInformationFieldset
                readOnly={readOnly}
                prefillData={{
                    desiredSkills: student?.motivationDetails?.desiredSkills,
                    desiredSkillsOther: student?.motivationDetails?.desiredSkillsOther,
                    hasTriedThisBefore: student?.motivationDetails?.hasTriedThisBefore,
                    hasTriedThisBeforeExplanation: student?.motivationDetails?.hasTriedThisBeforeExplanation,
                    whyWantTheseSkills: student?.motivationDetails?.whyWantTheseSkills,
                    whyWantThisNow: student?.motivationDetails?.whyWantThisNow,
                    desiredLearningMethod: student?.motivationDetails?.desiredLearningMethod,
                    remarks: student?.motivationDetails?.remarks,
                }}
            />
            <HorizontalRule />
            <AvailabillityFieldset
                readOnly={readOnly}
                prefillData={{
                    available: student?.availabilityDetails?.availability,
                    note: student?.availabilityDetails?.availabilityNotes,
                }}
            />
            <HorizontalRule />
            <ReadingTestInformationFieldset
                readOnly={readOnly}
                prefillData={{
                    readingTestResults: student?.readingTestResult as StudentReadingTestResultEnum,
                }}
            />
            <HorizontalRule />
            <WritingInformationFieldset
                readOnly={readOnly}
                prefillData={{
                    writingTestResult: student?.writingTestResult as StudentWritingTestResultEnum,
                }}
            /> */}
            <HorizontalRule />
            <PermissionsFieldset
                readOnly={readOnly}
                prefillData={{
                    'intake.didSignPermissionForm': student?.intake?.didSignPermissionForm,
                    'intake.hasPermissionToShareDataWithProviders':
                        student?.intake?.hasPermissionToShareDataWithProviders,
                    'intake.hasPermissionToShareDataWithLibraries':
                        student?.intake?.hasPermissionToShareDataWithLibraries,
                    'intake.hasPermissionToSendInformationAboutLibraries':
                        student?.intake?.hasPermissionToSendInformationAboutLibraries,
                }}
            />
        </>
    )
}
