import { HasTriedThisBeforeOptionEnum } from 'components/fieldsets/participants/fieldsets/MotivationInformationFieldset'
import { ParticipantIntakeFieldsFormModel } from '../Fields/ParticipantIntakeFields'
import merge from 'lodash/merge'
import { StudentMotivationDesiredLearningMethodsEnum, StudentMotivationDesiredSkillsEnum } from 'generated/enums'
import {
    PostPutAddressParams,
    PostPutEducationParams,
    PostPutEmailParams,
    PostPutStudentParams,
    PostPutTelephoneParams,
} from 'api/student/student'
import { DateFormatters } from 'utils/formatters/Date/Date'
import { EducationLevel, EducationName, EducationType, Student } from 'api/types/types'

export function participantIntakeFieldsMapper(
    languageHouseId: string,
    formData: ParticipantIntakeFieldsFormModel,
    defaultUser?: Student
): PostPutStudentParams {
    console.log('formData', formData)

    const addresses: PostPutAddressParams[] = [
        {
            id: defaultUser?.person.addresses?.[0].id,
            street: formData['person.addresses[0].street'],
            houseNumber: formData['person.addresses[0].houseNumber'],
            houseNumberSuffix: formData['person.addresses[0].houseNumberSuffix'],
            postalCode: formData['person.addresses[0].postalCode'],
            locality: formData['person.addresses[0].locality'],
        },
    ]

    const emails: PostPutEmailParams[] = [
        {
            id: defaultUser?.person.emails?.[0].id,
            email: formData['person.emails[0].email'],
        },
    ]

    const telephones: PostPutTelephoneParams[] = [
        {
            id: defaultUser?.person.telephones?.[0].id,
            telephone: formData['person.telephones[0].telephone'],
        },
        {
            id: defaultUser?.person.telephones?.[1].id,
            name: 'Contactpersoon',
            telephone: formData['person.telephones[1].telephone'],
        },
    ]

    const defaultEducations = defaultUser?.educations || []
    const defaultLastFollowedEducation = defaultEducations.find(e => e.name === EducationName.LastFollowedEducation)
    const defaultCurrentEducation = defaultEducations.find(e => e.name === EducationName.CurrentEducation)
    const defaultCourse = defaultEducations.find(e => e.name === EducationName.Course)

    const educations: PostPutEducationParams[] = [
        // last followed education
        {
            id: defaultLastFollowedEducation?.id,
            name: EducationName.LastFollowedEducation,
            type: EducationType.Education,
            level: formData['educations[0].level'],
            degreeGranted:
                formData['educations[0].degreeGranted'] === 'YES'
                    ? true
                    : formData['educations[0].degreeGranted'] === 'NO'
                    ? false
                    : undefined,
            endDate: formData['educations[0].endDate'],
        },

        // current education
        {
            id: defaultCurrentEducation?.id,
            name: EducationName.CurrentEducation,
            type: EducationType.Education,
            startDate: formData['educations[1].startDate'],
            endDate: formData['educations[1].endDate'],
            level: formData['educations[1].level'],
            institution: formData['educations[1].institution'],
            degree:
                formData['educations[1].degree'] === 'YES'
                    ? true
                    : formData['educations[1].degree'] === 'NO'
                    ? false
                    : undefined,
        },

        // course
        {
            id: defaultCourse?.id,
            name: EducationName.Course,
            type: EducationType.Course,
            institution: formData['educations[2].institution'],
            teachertype: formData['educations[2].teachertype'],
            group: formData['educations[2].group'],
            hours: formData['educations[2].hours'] ? +formData['educations[2].hours'] : undefined,
            degree:
                formData['educations[2].degree'] === 'YES'
                    ? true
                    : formData['educations[2].degree'] === 'NO'
                    ? false
                    : undefined,
        },
    ]

    const postStudentParams: PostPutStudentParams = {
        languageHouse: languageHouseId,
        civicIntegration: {
            id: defaultUser?.civicIntegration.id,
            requirement: formData['civicIntegration.requirement'],
            reason: formData['civicIntegration.reason'],
            finishDate: formData['civicIntegration.finishDate'],
        },
        person: {
            id: defaultUser?.person.id,
            familyName: formData['person.familyName'],
            givenName: formData['person.givenName'],
            additionalName: formData['person.additionalName'] || undefined,
            gender: formData['person.gender'],
            birthday: formData['person.birthday']
                ? DateFormatters.formattedDate(formData['person.birthday'], 'DD-MM-YYYY')
                : undefined,
            addresses: addresses,
            emails: emails,
            telephones: telephones,
            contactPreference: formData['person.contactPreference'],
            contactPreferenceOther: formData['person.contactPreferenceOther'],
            birthplace: formData['person.birthplace'],
            primaryLanguage: formData['person.primaryLanguage'],
            speakingLanguages: formData['person.speakingLanguages'],
            maritalStatus: formData['person.maritalStatus'],
            children: formData['person.children'] ? +formData['person.children'] : undefined,
        },
        intake: {
            id: defaultUser?.intake?.id,
            referringOrganization: formData['intake.referringOrganization'],
            referringOrganizationOther: formData['intake.referringOrganizationOther'],
            referringOrganizationEmail: formData['intake.referringOrganizationEmail'],
            foundVia: formData['intake.foundVia'],
            foundViaOther: formData['intake.foundViaOther'],
            wentToLanguageHouseBefore:
                formData['intake.wentToLanguageHouseBefore'] === 'YES'
                    ? true
                    : formData['intake.wentToLanguageHouseBefore'] === 'NO'
                    ? false
                    : undefined,
            wentToLanguageHouseBeforeReason: formData['intake.wentToLanguageHouseBeforeReason'],
            wentToLanguageHouseBeforeYear: formData['intake.wentToLanguageHouseBeforeYear']
                ? +formData['intake.wentToLanguageHouseBeforeYear']
                : undefined,
            network: formData['intake.network'],
            participationLadder: formData['intake.participationLadder'],
            dutchNTLevel: formData['intake.dutchNTLevel'],
            inNetherlandsSinceYear: formData['intake.inNetherlandsSinceYear']
                ? +formData['intake.inNetherlandsSinceYear']
                : undefined,
            languageInDailyLife: formData['intake.languageInDailyLife'],
            knowsLatinAlphabet:
                formData['intake.knowsLatinAlphabet'] === 'YES'
                    ? true
                    : formData['intake.knowsLatinAlphabet'] === 'NO'
                    ? false
                    : undefined,
            lastKnownLevel: formData['intake.lastKnownLevel'],
            speakingLevel: formData['intake.speakingLevel'],
            trainedForJob: formData['intake.trainedForJob'],
            lastJob: formData['intake.lastJob'],
            dayTimeActivities: formData['intake.dayTimeActivities'],
            dayTimeActivitiesOther: formData['intake.dayTimeActivitiesOther'],
            didSignPermissionForm: formData['intake.didSignPermissionForm'] === 'on',
            hasPermissionToSendInformationAboutLibraries:
                formData['intake.hasPermissionToSendInformationAboutLibraries'] === 'on',
            hasPermissionToShareDataWithLibraries: formData['intake.hasPermissionToShareDataWithLibraries'] === 'on',
            hasPermissionToShareDataWithProviders: formData['intake.hasPermissionToShareDataWithProviders'] === 'on',
        },
        educations: educations,
        // speakingLevel: formData.speakingLevel,
        // educationDetails: {
        //     lastFollowedEducation: formData.lastFollowedEducation,
        //     didGraduate: formData.didGraduate === DidGraduateEnum.yes,
        //     followingEducationRightNow: formData.followingEducationRightNow,
        //     followingEducationRightNowYesStartDate: formData.followingEducationRightNowYesStartDate,
        //     followingEducationRightNowYesEndDate: formData.followingEducationRightNowYesEndDate,
        //     followingEducationRightNowYesLevel: formData.followingEducationRightNowYesLevel,
        //     followingEducationRightNowYesInstitute: formData.followingEducationRightNowYesInstitute,
        //     followingEducationRightNowYesProvidesCertificate:
        //         formData.followingEducationRightNowYesProvidesCertificate ===
        //         FollowingEducationRightNowYesProvidesCertificateEnum.yes,
        //     followingEducationRightNowNoEndDate: formData.followingEducationRightNowNoEndDate,
        //     followingEducationRightNowNoLevel: formData.followingEducationRightNowNoLevel,
        //     followingEducationRightNowNoGotCertificate:
        //         formData.followingEducationRightNowNoGotCertificate ===
        //         FollowingEducationRightNowNoGotCertificateEnum.yes,
        // },
        // courseDetails: {
        //     isFollowingCourseRightNow: formData.isFollowingCourseRightNow === IsFollowingCourseEnum.Yes,
        //     courseName: formData.courseName,
        //     courseTeacher: formData.courseTeacher,
        //     courseGroup: formData.courseGroup,
        //     amountOfHours: formData.amountOfHours ? parseInt(formData.amountOfHours) : 0,
        //     doesCourseProvideCertificate: formData.doesCourseProvideCertificate === DoesHaveCertificateEnum.Yes,
        // },
        // jobDetails: {
        //     trainedForJob: formData.trainedForJob,
        //     lastJob: formData.lastJob,
        //     dayTimeActivities: formData.dayTimeActivities,
        //     dayTimeActivitiesOther: formData.dayTimeActivitiesOther,
        // },
        // motivationDetails: {
        //     desiredSkills: formData.desiredSkills?.split(',') as StudentMotivationDesiredSkillsEnum[],
        //     desiredSkillsOther: formData.desiredSkillsOther,
        //     hasTriedThisBefore: formData.hasTriedThisBefore === HasTriedThisBeforeOptionEnum.yes,
        //     hasTriedThisBeforeExplanation: formData.hasTriedThisBeforeExplanation,
        //     whyWantTheseSkills: formData.whyWantTheseSkills,
        //     whyWantThisNow: formData.whyWantThisNow,
        //     desiredLearningMethod: formData.desiredLearningMethod?.split(
        //         ','
        //     ) as StudentMotivationDesiredLearningMethodsEnum[],
        //     remarks: formData.remarks,
        // },
        // availabilityDetails: {
        //     availability: formData.available ? JSON.parse(formData.available) : undefined,
        //     availabilityNotes: formData.note,
        // },
        // readingTestResult: formData.readingTestResults,
        // writingTestResult: formData.writingTestResult,
    }

    // if (defaultQueryValues) {
    //     return merge(defaultQueryValues.student, model)
    // }

    return postStudentParams
}
