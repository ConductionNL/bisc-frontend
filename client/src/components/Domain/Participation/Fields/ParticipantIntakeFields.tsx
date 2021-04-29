import HorizontalRule from 'components/Core/HorizontalRule/HorizontalRule'
import BackgroundInformationFieldset, {
    BackgroundInformationFieldsetModel,
} from 'components/fieldsets/participants/fieldsets/BackgroundInformationFieldset'
import CivicIntegrationFieldset, {
    CivicIntegrationFieldsetModel,
} from 'components/fieldsets/participants/fieldsets/CivicIntegrationInformationFieldset'
import EducationInformationFieldset, {
    DidGraduateEnum,
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
import GeneralInformationFieldset, {
    GeneralInformationFieldsetModel,
} from 'components/fieldsets/shared/GeneralInformationFieldset'
import IntakeInformationFieldset from 'components/fieldsets/shared/IntakeInformationFieldset'
import PersonInformationFieldset, {
    PersonInformationFieldsetModel,
} from 'components/fieldsets/shared/PersonInformationFieldset'
import { StudentQuery } from 'generated/graphql'
import React from 'react'
import { NameFormatters } from 'utils/formatters/name/Name'

interface Props {
    data?: StudentQuery
    readOnly?: boolean
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
        MotivationInformationFieldsetModel,
        AvailabillityFieldsetModel,
        ReadingTestInformationFieldsetModel,
        WritingInformationFieldsetModel,
        PermissionsFieldsetFormModel {}

export const ParticipantIntakeFields: React.FunctionComponent<Props> = props => {
    const { data, readOnly } = props

    return (
        <>
            {readOnly && (
                <>
                    <IntakeInformationFieldset
                        prefillData={{
                            nameOfCustomer: NameFormatters.formattedFullname(data?.student.registrar),
                            dateOfIntake: data?.student.dateCreated,
                        }}
                    />
                    <HorizontalRule />
                </>
            )}

            <CivicIntegrationFieldset
                readOnly={readOnly}
                prefillData={{
                    civicIntegrationRequirement: data?.student.civicIntegrationDetails?.civicIntegrationRequirement,
                    civicIntegrationRequirementReason:
                        data?.student.civicIntegrationDetails?.civicIntegrationRequirementReason,
                    civicIntegrationRequirementFinishDate:
                        data?.student.civicIntegrationDetails?.civicIntegrationRequirementFinishDate,
                }}
            />
            <HorizontalRule />
            <PersonInformationFieldset
                readOnly={readOnly}
                prefillData={{
                    familyName: data?.student.personDetails.familyName,
                    additionalName: data?.student.personDetails.additionalName,
                    givenName: data?.student.personDetails.givenName,
                    gender: data?.student.personDetails.gender,
                    dateOfBirth: data?.student.personDetails.dateOfBirth,
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
                    street: data?.student.contactDetails?.street,
                    houseNumber: data?.student.contactDetails?.houseNumber,
                    houseNumberSuffix: data?.student.contactDetails?.houseNumberSuffix,
                    postalCode: data?.student.contactDetails?.postalCode,
                    locality: data?.student.contactDetails?.locality,
                    telephone: data?.student.contactDetails?.telephone,
                    email: data?.student.contactDetails?.email,
                    contactPersonTelephone: data?.student.contactDetails?.contactPersonTelephone,
                    contactPreference: data?.student.contactDetails?.contactPreference,
                    contactPreferenceOther: data?.student.contactDetails?.contactPreferenceOther,
                }}
            />
            <HorizontalRule />
            <GeneralInformationFieldset
                readOnly={readOnly}
                prefillData={{
                    countryOfOrigin: data?.student.generalDetails?.countryOfOrigin,
                    nativeLanguage: data?.student.generalDetails?.nativeLanguage,
                    otherLanguages: data?.student.generalDetails?.otherLanguages,
                    familyComposition: data?.student.generalDetails?.familyComposition,
                    childrenCount: data?.student.generalDetails?.childrenCount,
                    childrenDatesOfBirth: data?.student.generalDetails?.childrenDatesOfBirth,
                }}
            />
            <HorizontalRule />
            <RefererInformationFieldset
                readOnly={readOnly}
                prefillData={{
                    referringOrganization: data?.student.referrerDetails?.referringOrganization,
                    referringOrganizationOther: data?.student.referrerDetails?.referringOrganizationOther,
                    referrerEmailAddress: data?.student.referrerDetails?.email,
                }}
            />
            <HorizontalRule />
            <BackgroundInformationFieldset
                readOnly={readOnly}
                prefillData={{
                    foundVia: data?.student.backgroundDetails?.foundVia,
                    foundViaOther: data?.student.backgroundDetails?.foundViaOther,
                    wentToLanguageHouseBefore: data?.student.backgroundDetails?.wentToLanguageHouseBefore,
                    wentToLanguageHouseBeforeReason: data?.student.backgroundDetails?.wentToLanguageHouseBeforeReason,
                    wentToLanguageHouseBeforeYear: data?.student.backgroundDetails?.wentToLanguageHouseBeforeYear,
                    network: data?.student.backgroundDetails?.network,
                    participationLadder: data?.student.backgroundDetails?.participationLadder,
                }}
            />
            <HorizontalRule />
            <DutchNTFieldset
                readOnly={readOnly}
                prefillData={{
                    dutchNTLevel: data?.student.dutchNTDetails?.dutchNTLevel,
                    inNetherlandsSinceYear: data?.student.dutchNTDetails?.inNetherlandsSinceYear,
                    languageInDailyLife: data?.student.dutchNTDetails?.languageInDailyLife,
                    knowsLatinAlphabet: data?.student.dutchNTDetails?.knowsLatinAlphabet,
                    lastKnownLevel: data?.student.dutchNTDetails?.lastKnownLevel,
                }}
            />
            <HorizontalRule />
            <LevelInformationFieldset
                readOnly={readOnly}
                prefillData={{
                    speakingLevel: data?.student.speakingLevel,
                }}
            />
            <HorizontalRule />
            {/* create fieldset */}
            <EducationInformationFieldset
                readOnly={readOnly}
                prefillData={{
                    lastFollowedEducation: data?.student.educationDetails?.lastFollowedEducation,
                    didGraduate: data?.student.educationDetails?.didGraduate,
                    followingEducationRightNow: data?.student.educationDetails?.followingEducationRightNow,
                    followingEducationRightNowYesStartDate:
                        data?.student.educationDetails?.followingEducationRightNowYesStartDate,
                    followingEducationRightNowYesEndDate:
                        data?.student.educationDetails?.followingEducationRightNowYesEndDate,
                    followingEducationRightNowYesLevel:
                        data?.student.educationDetails?.followingEducationRightNowYesLevel,
                    followingEducationRightNowYesInstitute:
                        data?.student.educationDetails?.followingEducationRightNowYesInstitute,
                    followingEducationRightNowYesProvidesCertificate:
                        data?.student.educationDetails?.followingEducationRightNowYesProvidesCertificate,
                    followingEducationRightNowNoEndDate:
                        data?.student.educationDetails?.followingEducationRightNowNoEndDate,
                    followingEducationRightNowNoLevel:
                        data?.student.educationDetails?.followingEducationRightNowNoLevel,
                    followingEducationRightNowNoGotCertificate:
                        data?.student.educationDetails?.followingEducationRightNowNoGotCertificate,
                }}
            />
            <HorizontalRule />
            <CourseInformationFieldset
                readOnly={readOnly}
                prefillData={{
                    isFollowingCourseRightNow: data?.student.courseDetails?.isFollowingCourseRightNow,
                    courseName: data?.student.courseDetails?.courseName,
                    courseTeacher: data?.student.courseDetails?.courseTeacher,
                    courseGroup: data?.student.courseDetails?.courseGroup,
                    amountOfHours: data?.student.courseDetails?.amountOfHours,
                    doesCourseProvideCertificate: data?.student.courseDetails?.doesCourseProvideCertificate,
                }}
            />
            <HorizontalRule />
            <WorkInformationFieldset
                readOnly={readOnly}
                prefillData={{
                    dayTimeActivities: data?.student.jobDetails?.dayTimeActivities,
                    dayTimeActivitiesOther: data?.student.jobDetails?.dayTimeActivitiesOther,
                    lastJob: data?.student.jobDetails?.lastJob,
                    trainedForJob: data?.student.jobDetails?.trainedForJob,
                }}
            />
            <HorizontalRule />
            <MotivationInformationFieldset
                readOnly={readOnly}
                prefillData={{
                    desiredSkills: data?.student.motivationDetails?.desiredSkills,
                    desiredSkillsOther: data?.student.motivationDetails?.desiredSkillsOther,
                    hasTriedThisBefore: data?.student.motivationDetails?.hasTriedThisBefore,
                    hasTriedThisBeforeExplanation: data?.student.motivationDetails?.hasTriedThisBeforeExplanation,
                    whyWantTheseSkills: data?.student.motivationDetails?.whyWantTheseSkills,
                    whyWantThisNow: data?.student.motivationDetails?.whyWantThisNow,
                    desiredLearningMethod: data?.student.motivationDetails?.desiredLearningMethod,
                    remarks: data?.student.motivationDetails?.remarks,
                }}
            />
            <HorizontalRule />
            <AvailabillityFieldset
                readOnly={readOnly}
                prefillData={{
                    available: data?.student.availabilityDetails?.availability,
                    note: data?.student.availabilityDetails?.availabilityNotes,
                }}
            />
            <HorizontalRule />
            <ReadingTestInformationFieldset
                readOnly={readOnly}
                prefillData={{
                    readingTestResults: data?.student.readingTestResult,
                }}
            />
            <HorizontalRule />
            <WritingInformationFieldset
                readOnly={readOnly}
                prefillData={{
                    writingTestResult: data?.student.writingTestResult,
                }}
            />
            <HorizontalRule />
            <PermissionsFieldset
                readOnly={readOnly}
                prefillData={{
                    didSignPermissionForm: data?.student.permissionDetails.didSignPermissionForm,
                    hasPermissionToShareDataWithProviders:
                        data?.student.permissionDetails.hasPermissionToShareDataWithProviders,
                    hasPermissionToShareDataWithLibraries:
                        data?.student.permissionDetails.hasPermissionToShareDataWithLibraries,
                    hasPermissionToSendInformationAboutLibraries:
                        data?.student.permissionDetails.hasPermissionToSendInformationAboutLibraries,
                }}
            />
        </>
    )
}
