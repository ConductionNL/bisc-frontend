import { BackgroundInformationFieldsetWentToLanguageHouseBefore } from 'components/fieldsets/participants/fieldsets/BackgroundInformationFieldset'
import {
    DidGraduateEnum,
    FollowingEducationRightNowYesProvidesCertificateEnum,
    FollowingEducationRightNowNoGotCertificateEnum,
} from 'components/fieldsets/participants/fieldsets/EducationInformationFieldset'
import { HasTriedThisBeforeOptionEnum } from 'components/fieldsets/participants/fieldsets/MotivationInformationFieldset'
import { IsFollowingCourseEnum, DoesHaveCertificateEnum } from 'components/fieldsets/shared/CourseInformationFieldset'
import { DutchNTFieldsetKnowsLatinAlphabetEnum } from 'components/fieldsets/shared/DutchNTInformationFieldset'
import { ParticipantIntakeFieldsFormModel } from '../Fields/ParticipantIntakeFields'
import merge from 'lodash/merge'
import {
    StudentMotivationDesiredLearningMethodsEnum,
    StudentMotivationDesiredSkillsEnum,
    StudentNetworkEnum,
} from 'generated/enums'
import { StudentQuery } from 'generated/graphql'

export function participantIntakeFieldsMapper(
    formData: ParticipantIntakeFieldsFormModel,
    defaultQueryValues?: StudentQuery
) {
    const model = {
        civicIntegrationDetails: {
            civicIntegrationRequirement: formData.civicIntegrationRequirement,
            civicIntegrationRequirementReason: formData.civicIntegrationRequirementReason,
            civicIntegrationRequirementFinishDate: formData.civicIntegrationRequirementFinishDate,
        },
        personDetails: {
            familyName: formData.familyName,
            givenName: formData.givenName,
            additionalName: formData.additionalName,
            gender: formData.gender,
            dateOfBirth: formData.dateOfBirth,
        },
        contactDetails: {
            street: formData.street,
            houseNumber: formData.houseNumber,
            houseNumberSuffix: formData.houseNumberSuffix,
            postalCode: formData.postalCode,
            locality: formData.locality,
            telephone: formData.telephone,
            email: formData.email,
            contactPersonTelephone: formData.contactPersonTelephone,
            contactPreference: formData.contactPreference,
            contactPreferenceOther: formData.contactPreferenceOther || '',
        },
        generalDetails: {
            countryOfOrigin: formData.countryOfOrigin,
            nativeLanguage: formData.nativeLanguage,
            otherLanguages: formData.otherLanguages,
            familyComposition: formData.familyComposition,
            childrenCount: formData.childrenCount,
            childrenDatesOfBirth: formData.childrenDatesOfBirth,
        },
        referrerDetails: {
            referringOrganization: formData.referringOrganization,
            referringOrganizationOther: formData.referringOrganizationOther,
            email: formData.referrerEmailAddress,
        },
        backgroundDetails: {
            foundVia: formData.foundVia,
            foundViaOther: formData.foundViaOther,
            wentToLanguageHouseBefore:
                formData.wentToLanguageHouseBefore === BackgroundInformationFieldsetWentToLanguageHouseBefore.yes,
            wentToLanguageHouseBeforeReason: formData.wentToLanguageHouseBeforeReason,
            wentToLanguageHouseBeforeYear: parseInt(formData.wentToLanguageHouseBeforeYear),
            network: formData.network ? (formData.network.split(',') as StudentNetworkEnum[]) : undefined,
            participationLadder: parseInt(formData.participationLadder),
        },
        dutchNTDetails: {
            dutchNTLevel: formData.dutchNTLevel,
            inNetherlandsSinceYear: parseInt(formData.inNetherlandsSinceYear),
            languageInDailyLife: formData.languageInDailyLife,
            knowsLatinAlphabet: DutchNTFieldsetKnowsLatinAlphabetEnum.yes === formData.knowsLatinAlphabet,
            lastKnownLevel: formData.lastKnownLevel,
        },
        speakingLevel: formData.speakingLevel,
        educationDetails: {
            lastFollowedEducation: formData.lastFollowedEducation,
            didGraduate: formData.didGraduate === DidGraduateEnum.yes,
            followingEducationRightNow: formData.followingEducationRightNow,
            followingEducationRightNowYesStartDate: formData.followingEducationRightNowYesStartDate,
            followingEducationRightNowYesEndDate: formData.followingEducationRightNowYesEndDate,
            followingEducationRightNowYesLevel: formData.followingEducationRightNowYesLevel,
            followingEducationRightNowYesInstitute: formData.followingEducationRightNowYesInstitute,
            followingEducationRightNowYesProvidesCertificate:
                formData.followingEducationRightNowYesProvidesCertificate ===
                FollowingEducationRightNowYesProvidesCertificateEnum.yes,
            followingEducationRightNowNoEndDate: formData.followingEducationRightNowNoEndDate,
            followingEducationRightNowNoLevel: formData.followingEducationRightNowNoLevel,
            followingEducationRightNowNoGotCertificate:
                formData.followingEducationRightNowNoGotCertificate ===
                FollowingEducationRightNowNoGotCertificateEnum.yes,
        },
        courseDetails: {
            isFollowingCourseRightNow: formData.isFollowingCourseRightNow === IsFollowingCourseEnum.Yes,
            courseName: formData.courseName,
            courseTeacher: formData.courseTeacher,
            courseGroup: formData.courseGroup,
            amountOfHours: formData.amountOfHours ? parseInt(formData.amountOfHours) : 0,
            doesCourseProvideCertificate: formData.doesCourseProvideCertificate === DoesHaveCertificateEnum.Yes,
        },
        jobDetails: {
            trainedForJob: formData.trainedForJob,
            lastJob: formData.lastJob,
            dayTimeActivities: formData.dayTimeActivities,
            dayTimeActivitiesOther: formData.dayTimeActivitiesOther,
        },
        motivationDetails: {
            desiredSkills: formData.desiredSkills?.split(',') as StudentMotivationDesiredSkillsEnum[],
            desiredSkillsOther: formData.desiredSkillsOther,
            hasTriedThisBefore: formData.hasTriedThisBefore === HasTriedThisBeforeOptionEnum.yes,
            hasTriedThisBeforeExplanation: formData.hasTriedThisBeforeExplanation,
            whyWantTheseSkills: formData.whyWantTheseSkills,
            whyWantThisNow: formData.whyWantThisNow,
            desiredLearningMethod: formData.desiredLearningMethod?.split(
                ','
            ) as StudentMotivationDesiredLearningMethodsEnum[],
            remarks: formData.remarks,
        },
        availabilityDetails: {
            availability: formData.available ? JSON.parse(formData.available) : undefined,
            availabilityNotes: formData.note,
        },
        readingTestResult: formData.readingTestResults,
        writingTestResult: formData.writingTestResult,

        permissionDetails: {
            didSignPermissionForm: formData.didSignPermissionForm,
            hasPermissionToShareDataWithProviders: formData.hasPermissionToShareDataWithProviders,
            hasPermissionToShareDataWithLibraries: formData.hasPermissionToShareDataWithLibraries,
            hasPermissionToSendInformationAboutLibraries: formData.hasPermissionToSendInformationAboutLibraries,
        },
    }

    if (defaultQueryValues) {
        return merge(defaultQueryValues.student, model)
    }
    return model
}
