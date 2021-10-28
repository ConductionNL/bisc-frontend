import { Gender, Student } from 'api/types/types'
import { useGet, useMutate } from 'restful-react'

export interface StudentsParams {}

export interface StudentsData {
    results: Student[]
}

export function useGetStudents() {
    return useGet<StudentsData>({
        path: '/students',
    })
}

export function useGetStudent(studentId: string) {
    return useGet<Student>({
        path: `/students/${studentId}`,
    })
}

export interface PostStudentParams {
    languageHouse: string
    person: {
        givenName: string //'Jesse'
        additionalName: string //'de'
        familyName: string //'Vries'
        birthday: string //'12-02-1989'
        gender: Gender | null
        // primaryLanguage: 'NL'
        // birthplace: 'The Netherlands POST'
        // speakingLanguages: 'English'
        // maritalStatus: 'MARRIED_PARTNER'
        // children: 2
        // childrenbirthdays: ['01-01-2006', '01-02-2006']
        // addresses: [
        //     {
        //         name: 'Address of this person/organization POST'
        //         street: 'Dam POST'
        //         houseNumber: '1'
        //         houseNumberSuffix: 'A'
        //         postalCode: '1000 AA'
        //         locality: 'Amsterdam'
        //     }
        // ]
        // telephones: [
        //     {
        //         name: 'Primary phone number POST'
        //         telephone: '+31612345678'
        //     }
        // ]
        // emails: [
        //     {
        //         name: 'Primary email address POST'
        //         email: '{{$randomEmail}}'
        //     }
        // ]
        // contactPreference: 'PHONECALL'
        // contactPreferenceOther: 'Send contact person a message'
        // availability: ['MONDAY_MORNING', 'MONDAY_AFTERNOON', 'MONDAY_EVENING', 'TUESDAY_MORNING']
        // availabilityNotes: 'stringetje'
    }
    // intake: {
    //     date: '23-04-2021'
    //     referringOrganization: 'UWV'
    //     referringOrganizationOther: 'SOCIAL_SERVICE'
    //     referringOrganizationEmail: 'johndoe2@test.com'
    //     foundVia: 'LIBRARY_WEBSITE'
    //     foundViaOther: 'Advertentie'
    //     wentToLanguageHouseBefore: true
    //     wentToLanguageHouseBeforeReason: 'Went to this languageHouse before, because...'
    //     wentToLanguageHouseBeforeYear: 2016
    //     network: ['HOUSEHOLD_MEMBERS', 'NEIGHBORS']
    //     participationLadder: '4 vrijwilligers werk/maatschappelijke activering'
    //     dutchNTLevel: 'NT1'
    //     inNetherlandsSinceYear: 2016
    //     languageInDailyLife: 'Dutch'
    //     knowsLatinAlphabet: true
    //     lastKnownLevel: 'A0'
    //     speakingLevel: 'ADVANCED'
    //     trainedForJob: 'Software Engineer POST'
    //     lastJob: 'Software Engineer'
    //     dayTimeActivities: ['SCHOOL', 'SEARCHING_FOR_JOB']
    //     dayTimeActivitiesOther: 'INTERNSHIP'
    //     desiredSkills: ['USING_WHATSAPP', 'DEVICE_FUNCTIONALITIES']
    //     desiredSkillsOther: 'USING_FACEBOOK'
    //     hasTriedThisBefore: true
    //     hasTriedThisBeforeExplanation: 'YES'
    //     whyWantTheseskills: 'Verbeteren'
    //     whyWantThisNow: 'Hoe sneller hoe beter'
    //     desiredLearningMethod: ['ONLINE']
    //     remarks: 'stringetje'
    //     readingTestResult: 'B2'
    //     writingTestResult: 'WRITE_NAW_DETAILS'
    //     didSignPermissionForm: true
    //     hasPermissionToShareDataWithProviders: true
    //     hasPermissionToShareDataWithLibraries: true
    //     hasPermissionToSendInformationAboutLibraries: true
    // }
    // civicIntegration: {
    //     requirement: 'YES'
    //     reason: 'FROM_EU_COUNTRY'
    //     finishDate: '23-04-2021'
    // }
    // educations: [
    //     {
    //         name: 'Language course'
    //         type: 'EDUCATION'
    //         level: 'HBO'
    //         degree: true
    //         startDate: '12-07-2021'
    //         endDate: '12-10-2021'
    //         institution: 'Institution X'
    //         degreeGranted: true
    //         group: 'INDIVIDUALLY'
    //         teachertype: 'PROFESSIONAL'
    //         coursetype: 'PROFESSIONAL'
    //         hours: 25
    //         doesCurrentlyFollowCourse: 'YES'
    //     },
    //     {
    //         name: 'Language course POST'
    //         type: 'COURSE'
    //         level: 'WO'
    //         degree: false
    //         startDate: '12-07-2021'
    //         endDate: '12-10-2021'
    //         institution: 'Institution X'
    //         degreeGranted: false
    //         group: 'INDIVIDUALLY'
    //         teachertype: 'PROFESSIONAL'
    //         coursetype: 'PROFESSIONAL'
    //         hours: 25
    //         doesCurrentlyFollowCourse: 'YES'
    //     }
    // ]
}

export interface PostStudentResponse extends Student {}

export function usePostStudent() {
    return useMutate<PostStudentResponse, any, any, PostStudentParams>({
        verb: 'POST',
        path: '/students',
    })
}
