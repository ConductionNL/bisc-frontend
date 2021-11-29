import { usePaginatedGet } from 'api/common/pagination'
import {
    CivicIntegrationReason,
    CivicIntegrationRequirement,
    ContactPreference,
    IntakeFoundVia,
    Gender,
    MaritalStatus,
    Maybe,
    MutationError,
    PaginatedResult,
    IntakeReferringOrganization,
    Student,
    IntakeNetwork,
    IntakeParticipationLadder,
    DutchNTType,
    DutchNT2Level,
    SpeakingLevel,
    EducationType,
    EducationLevel,
    EducationDoesCurrentlyFollowCourse,
    EducationGroupType,
    EducationTeacherType,
    IntakeDayTimeActivities,
    Availability,
    ReadingTestResult,
    WritingTestResult,
    DesiredSkills,
    DesiredLearningMethod,
} from 'api/types/types'
import { useGet, useMutate } from 'restful-react'

export interface StudentsParams {}
export interface StudentsData extends PaginatedResult<Student> {}

export function useGetStudents(page: number) {
    return usePaginatedGet<StudentsData>(
        {
            path: `/students`,
        },
        { limit: 1, page }
    )
}

export function useGetStudentsReport() {
    const result = useGet<StudentsData>({
        path: `/students.csv`,
        lazy: true,
    })

    return {
        ...result,
        fetchReport: async (organizationId: string, periodFrom: Date, periodTo: Date) => {
            // const periodFromFormatted = DateFormatters.formattedDate(periodFrom, 'YYYY-MM-DD')
            // const periodToFormatted = DateFormatters.formattedDate(periodTo, 'YYYY-MM-DD')

            await result.refetch({
                path: `/students.csv?fields[]=id&fields[]=intake.date&fields[]=intake.status&fields[]=person.givenName&fields[]=person.additionalName&fields[]=person.familyName&fields[]=languageHouse.name`,
            })
        },
    }
}

export function useGetStudent(studentId: string) {
    return useGet<Student>({
        path: `/students/${studentId}`,
    })
}

export interface PostPutStudentParams {
    languageHouse: string
    civicIntegration: {
        id?: string
        requirement?: Maybe<CivicIntegrationRequirement>
        reason?: Maybe<CivicIntegrationReason>
        finishDate?: Maybe<string>
    }
    person: {
        id?: string
        givenName?: Maybe<string>
        additionalName?: Maybe<string>
        familyName?: Maybe<string>
        birthday?: Maybe<string>
        gender?: Maybe<Gender>
        addresses?: PostPutAddressParams[]
        emails?: PostPutEmailParams[]
        telephones?: PostPutTelephoneParams[]
        contactPreference?: Maybe<ContactPreference>
        contactPreferenceOther?: Maybe<string>
        birthplace?: Maybe<string>
        primaryLanguage?: Maybe<string>
        speakingLanguages?: Maybe<string>
        maritalStatus?: Maybe<MaritalStatus>
        children?: Maybe<number>
        availability?: Maybe<Availability[]>
        availabilityNotes?: Maybe<string>
    }
    intake: {
        id?: string
        referringOrganization?: Maybe<IntakeReferringOrganization>
        referringOrganizationOther?: Maybe<string>
        referringOrganizationEmail?: Maybe<string>
        foundVia?: Maybe<IntakeFoundVia>
        foundViaOther?: Maybe<string>
        wentToLanguageHouseBefore?: Maybe<boolean>
        wentToLanguageHouseBeforeReason?: Maybe<string>
        wentToLanguageHouseBeforeYear?: Maybe<number>
        network?: Maybe<IntakeNetwork[]>
        participationLadder?: Maybe<IntakeParticipationLadder>
        dutchNTLevel?: Maybe<DutchNTType>
        inNetherlandsSinceYear?: Maybe<number>
        languageInDailyLife?: Maybe<string>
        knowsLatinAlphabet?: Maybe<boolean>
        lastKnownLevel?: Maybe<DutchNT2Level>
        speakingLevel?: Maybe<SpeakingLevel>
        trainedForJob?: Maybe<string>
        lastJob?: Maybe<string>
        desiredSkills?: Maybe<DesiredSkills[]>
        desiredSkillsOther?: Maybe<string>
        hasTriedThisBefore?: Maybe<boolean>
        hasTriedThisBeforeExplanation?: Maybe<string>
        whyWantTheseskills?: Maybe<string>
        whyWantThisNow?: Maybe<string>
        desiredLearningMethod?: Maybe<DesiredLearningMethod[]>
        remarks?: Maybe<string>
        dayTimeActivities?: Maybe<IntakeDayTimeActivities[]>
        dayTimeActivitiesOther?: Maybe<string>
        readingTestResult?: Maybe<ReadingTestResult>
        writingTestResult?: Maybe<WritingTestResult>
        didSignPermissionForm?: Maybe<boolean>
        hasPermissionToSendInformationAboutLibraries?: Maybe<boolean>
        hasPermissionToShareDataWithLibraries?: Maybe<boolean>
        hasPermissionToShareDataWithProviders?: Maybe<boolean>
    }
    educations: PostPutEducationParams[]
}

export interface PostPutEducationParams {
    id?: string
    name?: Maybe<string>
    type?: Maybe<EducationType>
    level?: Maybe<EducationLevel>
    degree?: Maybe<boolean>
    degreeGranted?: Maybe<boolean>
    doesCurrentlyFollowCourse?: Maybe<EducationDoesCurrentlyFollowCourse>
    startDate?: Maybe<string>
    endDate?: Maybe<string>
    institution?: Maybe<string>
    group?: Maybe<EducationGroupType>
    teachertype?: Maybe<EducationTeacherType>
    hours?: Maybe<number>
}

export interface PostPutAddressParams {
    id?: string
    street?: Maybe<string>
    houseNumber?: Maybe<string>
    houseNumberSuffix?: Maybe<string>
    postalCode?: Maybe<string>
    locality?: Maybe<string>
}

export interface PostPutEmailParams {
    id?: string
    name?: Maybe<string>
    email?: Maybe<string>
}

export interface PostPutTelephoneParams {
    id?: string
    name?: Maybe<string>
    telephone?: Maybe<string>
}

export interface PostStudentResponse extends Student {}

export function usePostStudent() {
    return useMutate<PostStudentResponse, MutationError, any, PostPutStudentParams>({
        verb: 'POST',
        path: '/students',
    })
}

export interface PutStudentResponse extends Student {}

export function usePutStudent(studentId: string) {
    return useMutate<PutStudentResponse, MutationError, any, PostPutStudentParams>({
        verb: 'PUT',
        path: `/students/${studentId}`,
    })
}
