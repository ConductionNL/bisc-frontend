import { MutationError, Student } from 'api/types/types'
import HorizontalRule from 'components/Core/HorizontalRule/HorizontalRule'
import BackgroundInformationFieldset, {
    BackgroundInformationFieldsetModel,
} from 'components/fieldsets/participants/fieldsets/BackgroundInformationFieldset'
import {
    CivicIntegrationFieldset,
    CivicIntegrationFieldsetModel,
} from 'components/fieldsets/participants/fieldsets/CivicIntegrationInformationFieldset'
import EducationInformationFieldset, {
    EducationInformationFieldsetModel,
} from 'components/fieldsets/participants/fieldsets/EducationInformationFieldset'
import LevelInformationFieldset, {
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
import RefererInformationFieldset, {
    RefererInformationFieldsetModel,
} from 'components/fieldsets/participants/fieldsets/RefererInformationFieldset'
import WorkInformationFieldset, {
    WorkInformationFieldsetModel,
} from 'components/fieldsets/participants/fieldsets/WorkInformationFieldset'
import WritingInformationFieldset, {
    WritingInformationFieldsetModel,
} from 'components/fieldsets/participants/fieldsets/WritingInformationFieldset'
import AvailabillityFieldset, { AvailabillityFieldsetModel } from 'components/fieldsets/shared/AvailabillityFieldset'
import ContactInformationFieldset, {
    ContactInformationFieldsetFormModel,
} from 'components/fieldsets/shared/ContactInformationFieldset'
import CourseInformationFieldset, {
    CourseInformationFieldsetModel,
} from 'components/fieldsets/shared/CourseInformationFieldset'
import DutchNTFieldset, { DutchNTFieldsetModel } from 'components/fieldsets/shared/DutchNTInformationFieldset'
import {
    GeneralInformationFieldset,
    GeneralInformationFieldsetModel,
} from 'components/fieldsets/shared/GeneralInformationFieldset'
import IntakeInformationFieldset from 'components/fieldsets/shared/IntakeInformationFieldset'
import {
    PersonInformationFieldset,
    PersonInformationFieldsetModel,
} from 'components/fieldsets/shared/PersonInformationFieldset'
// import { StudentReadingTestResultEnum, StudentSpeakingLevelEnum, StudentWritingTestResultEnum } from 'generated/enums'
import React from 'react'
import { DateFormatters } from 'utils/formatters/Date/Date'
import { NameFormatters } from 'utils/formatters/name/Name'

interface Props {
    student?: Student
    readOnly?: boolean
    mutationError?: MutationError | string
}

export interface ParticipantIntakeFieldsFormModel
    extends CivicIntegrationFieldsetModel,
        PersonInformationFieldsetModel,
        ContactInformationFieldsetFormModel,
        GeneralInformationFieldsetModel {}
// RefererInformationFieldsetModel,
// BackgroundInformationFieldsetModel,
// DutchNTFieldsetModel,
// LevelInformationFieldsetModel,
// EducationInformationFieldsetModel,
// CourseInformationFieldsetModel,
// WorkInformationFieldsetModel,
// MotivationInformationFieldsetModel,
// AvailabillityFieldsetModel,
// ReadingTestInformationFieldsetModel,
// WritingInformationFieldsetModel,
// PermissionsFieldsetFormModel

export const ParticipantIntakeFields: React.FunctionComponent<Props> = props => {

    console.log('get student', student)

    const address = student?.person.addresses?.[0]
    const telephone = student?.person.telephones?.[0]
    const telephoneContactPerson = student?.person.telephones?.[1]
    const email = student?.person.emails?.[0]

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
            {/* <HorizontalRule />
            <RefererInformationFieldset
                readOnly={readOnly}
                prefillData={{
                    referringOrganization: student?.referrerDetails?.referringOrganization,
                    referringOrganizationOther: student?.referrerDetails?.referringOrganizationOther,
                    referrerEmailAddress: student?.referrerDetails?.email,
                }}
            />
            <HorizontalRule />
            <BackgroundInformationFieldset
                readOnly={readOnly}
                prefillData={{
                    foundVia: student?.backgroundDetails?.foundVia,
                    foundViaOther: student?.backgroundDetails?.foundViaOther,
                    wentToLanguageHouseBefore: student?.backgroundDetails?.wentToLanguageHouseBefore,
                    wentToLanguageHouseBeforeReason: student?.backgroundDetails?.wentToLanguageHouseBeforeReason,
                    wentToLanguageHouseBeforeYear: student?.backgroundDetails?.wentToLanguageHouseBeforeYear,
                    network: student?.backgroundDetails?.network,
                    participationLadder: student?.backgroundDetails?.participationLadder,
                }}
            />
            <HorizontalRule />
            <DutchNTFieldset
                readOnly={readOnly}
                prefillData={{
                    dutchNTLevel: student?.dutchNTDetails?.dutchNTLevel,
                    inNetherlandsSinceYear: student?.dutchNTDetails?.inNetherlandsSinceYear,
                    languageInDailyLife: student?.dutchNTDetails?.languageInDailyLife,
                    knowsLatinAlphabet: student?.dutchNTDetails?.knowsLatinAlphabet,
                    lastKnownLevel: student?.dutchNTDetails?.lastKnownLevel,
                }}
            />
            <HorizontalRule />
            <LevelInformationFieldset
                readOnly={readOnly}
                prefillData={{
                    speakingLevel: student?.speakingLevel as StudentSpeakingLevelEnum,
                }}
            />
            <HorizontalRule />
            <EducationInformationFieldset
                readOnly={readOnly}
                prefillData={{
                    lastFollowedEducation: student?.educationDetails?.lastFollowedEducation,
                    didGraduate: student?.educationDetails?.didGraduate,
                    followingEducationRightNow: student?.educationDetails?.followingEducationRightNow,
                    followingEducationRightNowYesStartDate:
                        student?.educationDetails?.followingEducationRightNowYesStartDate,
                    followingEducationRightNowYesEndDate:
                        student?.educationDetails?.followingEducationRightNowYesEndDate,
                    followingEducationRightNowYesLevel: student?.educationDetails?.followingEducationRightNowYesLevel,
                    followingEducationRightNowYesInstitute:
                        student?.educationDetails?.followingEducationRightNowYesInstitute,
                    followingEducationRightNowYesProvidesCertificate:
                        student?.educationDetails?.followingEducationRightNowYesProvidesCertificate,
                    followingEducationRightNowNoEndDate: student?.educationDetails?.followingEducationRightNowNoEndDate,
                    followingEducationRightNowNoLevel: student?.educationDetails?.followingEducationRightNowNoLevel,
                    followingEducationRightNowNoGotCertificate:
                        student?.educationDetails?.followingEducationRightNowNoGotCertificate,
                }}
            />
            <HorizontalRule />
            <CourseInformationFieldset
                readOnly={readOnly}
                prefillData={{
                    isFollowingCourseRightNow: student?.courseDetails?.isFollowingCourseRightNow,
                    courseName: student?.courseDetails?.courseName,
                    courseTeacher: student?.courseDetails?.courseTeacher,
                    courseGroup: student?.courseDetails?.courseGroup,
                    amountOfHours: student?.courseDetails?.amountOfHours,
                    doesCourseProvideCertificate: student?.courseDetails?.doesCourseProvideCertificate,
                }}
            />
            <HorizontalRule />
            <WorkInformationFieldset
                readOnly={readOnly}
                prefillData={{
                    dayTimeActivities: student?.jobDetails?.dayTimeActivities,
                    dayTimeActivitiesOther: student?.jobDetails?.dayTimeActivitiesOther,
                    lastJob: student?.jobDetails?.lastJob,
                    trainedForJob: student?.jobDetails?.trainedForJob,
                }}
            />
            <HorizontalRule />
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
            />
            <HorizontalRule />
            <PermissionsFieldset
                readOnly={readOnly}
                prefillData={{
                    didSignPermissionForm: student?.permissionDetails?.didSignPermissionForm,
                    hasPermissionToShareDataWithProviders:
                        student?.permissionDetails?.hasPermissionToShareDataWithProviders,
                    hasPermissionToShareDataWithLibraries:
                        student?.permissionDetails?.hasPermissionToShareDataWithLibraries,
                    hasPermissionToSendInformationAboutLibraries:
                        student?.permissionDetails?.hasPermissionToSendInformationAboutLibraries,
                }}
            /> */}
        </>
    )
}
