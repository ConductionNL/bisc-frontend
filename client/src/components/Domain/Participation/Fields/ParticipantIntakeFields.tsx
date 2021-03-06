import React from 'react'
import { EducationName, MutationError, Student } from 'api/types/types'
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
import {
    MotivationInformationFieldset,
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
import { AvailabilityFieldset, AvailabilityFieldsetModel } from 'components/fieldsets/shared/AvailabilityFieldset'
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
// import IntakeInformationFieldset from 'components/fieldsets/shared/IntakeInformationFieldset'
import {
    PersonInformationFieldset,
    PersonInformationFieldsetModel,
} from 'components/fieldsets/shared/PersonInformationFieldset'
import { studentContactPersonTelephoneName } from 'api/common/telephone'

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
        MotivationInformationFieldsetModel,
        AvailabilityFieldsetModel,
        ReadingTestInformationFieldsetModel,
        WritingInformationFieldsetModel,
        PermissionsFieldsetFormModel {}

export const ParticipantIntakeFields: React.FunctionComponent<Props> = props => {
    const { student, readOnly } = props

    const address = student?.person.addresses?.[0]
    const allStudentTelephones = student?.person.telephones || []
    const studentTelephones = allStudentTelephones.filter(
        telephone => telephone.name !== studentContactPersonTelephoneName
    )
    const contactPersonTelephones = allStudentTelephones.filter(
        telephone => telephone.name === studentContactPersonTelephoneName
    )
    const telephone = studentTelephones[0]
    const telephoneContactPerson = contactPersonTelephones[0]
    const email = student?.person.emails?.[0]

    const educations = student?.educations || []
    const lastFollowedEducation = educations.find(e => e.name === EducationName.LastFollowedEducation)
    const currentEducation = educations.find(e => e.name === EducationName.CurrentEducation)
    const course = educations.find(e => e.name === EducationName.Course)

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
                        required: true,
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
                    'intake.referringOrganization': student?.intake?.referringOrganization,
                    'intake.referringOrganizationOther': student?.intake?.referringOrganizationOther,
                    'intake.referringPerson.emails[0].email': student?.intake?.referringPerson?.emails?.[0]?.email,
                }}
            />
            <HorizontalRule />
            <BackgroundInformationFieldset
                readOnly={readOnly}
                prefillData={{
                    'intake.foundVia': student?.intake?.foundVia,
                    'intake.foundViaOther': student?.intake?.foundViaOther,
                    'intake.wentToLanguageHouseBefore': student?.intake?.wentToLanguageHouseBefore,
                    'intake.wentToLanguageHouseBeforeReason': student?.intake?.wentToLanguageHouseBeforeReason,
                    'intake.wentToLanguageHouseBeforeYear': student?.intake?.wentToLanguageHouseBeforeYear,
                    'intake.network': student?.intake?.network,
                    'intake.participationLadder': student?.intake?.participationLadder,
                }}
            />
            <HorizontalRule />
            <DutchNTFieldset
                readOnly={readOnly}
                prefillData={{
                    'intake.dutchNTLevel': student?.intake?.dutchNTLevel,
                    'intake.inNetherlandsSinceYear': student?.intake?.inNetherlandsSinceYear,
                    'intake.languageInDailyLife': student?.intake?.languageInDailyLife,
                    'intake.knowsLatinAlphabet': student?.intake?.knowsLatinAlphabet,
                    'intake.lastKnownLevel': student?.intake?.lastKnownLevel,
                }}
            />
            <HorizontalRule />
            <LevelInformationFieldset
                readOnly={readOnly}
                prefillData={{
                    'intake.speakingLevel': student?.intake?.speakingLevel,
                }}
            />
            <HorizontalRule />
            <EducationInformationFieldset
                readOnly={readOnly}
                prefillData={{
                    // last followed education
                    'educations[0].level': lastFollowedEducation?.level,
                    'educations[0].degreeGranted': lastFollowedEducation?.degreeGranted,
                    'educations[0].yearsFollowed': lastFollowedEducation?.yearsFollowed,

                    // current education
                    'educations[1].startDate': currentEducation?.startDate,
                    'educations[1].yearsFollowed': currentEducation?.yearsFollowed,
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
            <HorizontalRule />
            <MotivationInformationFieldset
                readOnly={readOnly}
                prefillData={{
                    'intake.desiredSkills': student?.intake?.desiredSkills,
                    'intake.desiredSkillsOther': student?.intake?.desiredSkillsOther,
                    'intake.hasTriedThisBefore': student?.intake?.hasTriedThisBefore,
                    'intake.hasTriedThisBeforeExplanation': student?.intake?.hasTriedThisBeforeExplanation,
                    'intake.whyWantTheseskills': student?.intake?.whyWantTheseskills,
                    'intake.whyWantThisNow': student?.intake?.whyWantThisNow,
                    'intake.desiredLearningMethod': student?.intake?.desiredLearningMethod,
                    'intake.remarks': student?.intake?.remarks,
                }}
            />
            <HorizontalRule />
            <AvailabilityFieldset
                readOnly={readOnly}
                prefillData={{
                    'person.availability': student?.person.availability,
                    'person.availabilityNotes': student?.person.availabilityNotes,
                }}
            />
            <HorizontalRule />
            <ReadingTestInformationFieldset
                readOnly={readOnly}
                prefillData={{
                    'intake.readingTestResult': student?.intake?.readingTestResult,
                }}
            />
            <HorizontalRule />
            <WritingInformationFieldset
                readOnly={readOnly}
                prefillData={{
                    'intake.writingTestResult': student?.intake?.writingTestResult,
                }}
            />
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
