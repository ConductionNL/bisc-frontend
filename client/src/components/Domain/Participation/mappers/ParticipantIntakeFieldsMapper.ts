import { ParticipantIntakeFieldsFormModel } from '../Fields/ParticipantIntakeFields'
import {
    PostPutAddressParams,
    PostPutEducationParams,
    PostPutEmailParams,
    PostPutStudentParams,
    PostPutTelephoneParams,
} from 'api/student/student'
import { DateFormatters } from 'utils/formatters/Date/Date'
import { EducationName, EducationType, Maybe, Student } from 'api/types/types'

export function participantIntakeFieldsMapper(
    languageHouseId: string,
    formData: ParticipantIntakeFieldsFormModel,
    defaultUser?: Student
): PostPutStudentParams {
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
            degreeGranted: getBooleanValueByCheckboxValue(formData['educations[0].degreeGranted']),
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
            degree: getBooleanValueByCheckboxValue(formData['educations[1].degree']),
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
            degree: getBooleanValueByCheckboxValue(formData['educations[2].degree']),
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
            children: getNumberValueByInputValue(formData['person.children']),
            availability: formData['person.availability'],
            availabilityNotes: formData['person.availabilityNotes'],
        },
        intake: {
            id: defaultUser?.intake?.id,
            referringOrganization: formData['intake.referringOrganization'],
            referringOrganizationOther: formData['intake.referringOrganizationOther'],
            referringOrganizationEmail: formData['intake.referringOrganizationEmail'],
            foundVia: formData['intake.foundVia'],
            foundViaOther: formData['intake.foundViaOther'],
            wentToLanguageHouseBefore: getBooleanValueByCheckboxValue(formData['intake.wentToLanguageHouseBefore']),
            wentToLanguageHouseBeforeReason: formData['intake.wentToLanguageHouseBeforeReason'],
            wentToLanguageHouseBeforeYear: getNumberValueByInputValue(formData['intake.wentToLanguageHouseBeforeYear']),
            network: formData['intake.network'],
            participationLadder: formData['intake.participationLadder'],
            dutchNTLevel: formData['intake.dutchNTLevel'],
            inNetherlandsSinceYear: getNumberValueByInputValue(formData['intake.inNetherlandsSinceYear']),
            languageInDailyLife: formData['intake.languageInDailyLife'],
            knowsLatinAlphabet: getBooleanValueByCheckboxValue(formData['intake.knowsLatinAlphabet']),
            lastKnownLevel: formData['intake.lastKnownLevel'],
            speakingLevel: formData['intake.speakingLevel'],
            trainedForJob: formData['intake.trainedForJob'],
            lastJob: formData['intake.lastJob'],
            desiredSkills: formData['intake.desiredSkills'],
            desiredSkillsOther: formData['intake.desiredSkillsOther'],
            hasTriedThisBefore: getBooleanValueByCheckboxValue(formData['intake.hasTriedThisBefore']),
            hasTriedThisBeforeExplanation: formData['intake.hasTriedThisBeforeExplanation'],
            whyWantTheseskills: formData['intake.whyWantTheseskills'],
            whyWantThisNow: formData['intake.whyWantThisNow'],
            desiredLearningMethod: formData['intake.desiredLearningMethod'],
            remarks: formData['intake.remarks'],
            dayTimeActivities: formData['intake.dayTimeActivities'],
            dayTimeActivitiesOther: formData['intake.dayTimeActivitiesOther'],
            readingTestResult: formData['intake.readingTestResult'],
            writingTestResult: formData['intake.writingTestResult'],
            didSignPermissionForm: formData['intake.didSignPermissionForm'] === 'on',
            hasPermissionToSendInformationAboutLibraries:
                formData['intake.hasPermissionToSendInformationAboutLibraries'] === 'on',
            hasPermissionToShareDataWithLibraries: formData['intake.hasPermissionToShareDataWithLibraries'] === 'on',
            hasPermissionToShareDataWithProviders: formData['intake.hasPermissionToShareDataWithProviders'] === 'on',
        },
        educations: educations,
    }

    return postStudentParams

    function getBooleanValueByCheckboxValue(checkboxValue?: Maybe<'YES' | 'NO'>) {
        if (checkboxValue) {
            if (checkboxValue === 'YES') {
                return true
            }

            if (checkboxValue === 'NO') {
                return false
            }
        }
    }

    function getNumberValueByInputValue(inputValue?: Maybe<string>) {
        if (typeof inputValue === 'string' && inputValue !== '') {
            return +inputValue
        }
    }
}
