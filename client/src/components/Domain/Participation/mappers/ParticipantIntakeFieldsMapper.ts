import { ParticipantIntakeFieldsFormModel } from '../Fields/ParticipantIntakeFields'
import { PostPutEducationParams, PostPutStudentParams } from 'api/student/student'
import { DateFormatters } from 'utils/formatters/Date/Date'
import { EducationName, EducationType, IntakeStatus, Maybe, Student } from 'api/types/types'
import { PostPutEmailParams } from 'api/common/email'
import { PostPutAddressParams } from 'api/common/address'
import { PostPutTelephoneParams, studentContactPersonTelephoneName } from 'api/common/telephone'
import { PostPutPersonParams } from 'api/common/person'

export function participantIntakeFieldsMapper(
    languageHouseId: string,
    formData: ParticipantIntakeFieldsFormModel,
    defaultUser?: Student
): PostPutStudentParams {
    const addresses: PostPutAddressParams[] = []

    if (
        formData['person.addresses[0].street'] ||
        formData['person.addresses[0].houseNumber'] ||
        formData['person.addresses[0].houseNumberSuffix'] ||
        formData['person.addresses[0].postalCode'] ||
        formData['person.addresses[0].locality']
    ) {
        addresses.push({
            id: defaultUser?.person.addresses?.[0].id,
            street: formData['person.addresses[0].street'],
            houseNumber: formData['person.addresses[0].houseNumber'],
            houseNumberSuffix: formData['person.addresses[0].houseNumberSuffix'],
            postalCode: formData['person.addresses[0].postalCode'],
            locality: formData['person.addresses[0].locality'],
            country: 'NL',
        })
    }

    const emails: PostPutEmailParams[] = []

    if (formData['person.emails[0].email']) {
        emails.push({
            id: defaultUser?.person.emails?.[0].id,
            email: formData['person.emails[0].email'],
        })
    }

    const telephones: PostPutTelephoneParams[] = []

    if (formData['person.telephones[0].telephone']) {
        telephones.push({
            id: defaultUser?.person.telephones?.[0].id,
            telephone: formData['person.telephones[0].telephone'],
        })
    }

    if (formData['person.telephones[1].telephone']) {
        telephones.push({
            id: defaultUser?.person.telephones?.[1].id,
            name: studentContactPersonTelephoneName,
            telephone: formData['person.telephones[1].telephone'],
        })
    }

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

    const referringPersonEmails: PostPutEmailParams[] = []

    if (formData['intake.referringPerson.emails[0].email']) {
        referringPersonEmails.push({
            email: formData['intake.referringPerson.emails[0].email'],
        })
    }

    const postReferringPersonParams: PostPutPersonParams = {
        emails: referringPersonEmails,
        givenName: defaultUser?.intake?.referringPerson?.givenName || '-', // referringPerson.givenName is required in the api
        familyName: defaultUser?.intake?.referringPerson?.familyName || '-', // referringPerson.familyName is required in the api
    }

    const postStudentParams: PostPutStudentParams = {
        languageHouse: defaultUser ? undefined : languageHouseId, // dont pass language house when editing
        civicIntegration: {
            id: defaultUser?.civicIntegration?.id,
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
            status: IntakeStatus.Accepted,
            referringOrganization: formData['intake.referringOrganization'],
            referringOrganizationOther: formData['intake.referringOrganizationOther'],
            referringPerson: postReferringPersonParams,
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
