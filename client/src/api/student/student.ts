import { usePaginatedGet } from 'api/common/pagination'
import { PostPutPersonParams } from 'api/common/person'
import {
    CivicIntegrationReason,
    CivicIntegrationRequirement,
    IntakeFoundVia,
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
    ReadingTestResult,
    WritingTestResult,
    DesiredSkills,
    DesiredLearningMethod,
    IntakeStatus,
} from 'api/types/types'
import { useGet, useMutate } from 'restful-react'
import { DateFormatters } from 'utils/formatters/Date/Date'

export interface StudentsParams {}
export interface StudentsData extends PaginatedResult<Student> {}

interface UseGetStudentsOptions {
    intakeStatus?: IntakeStatus
    limit?: number
}

export function useGetStudents(options?: UseGetStudentsOptions) {
    const queryParams: { [key: string]: string } = {}

    if (options) {
        if (options.intakeStatus) {
            queryParams['intake.status'] = options.intakeStatus
        }
    }

    return usePaginatedGet<StudentsData>(
        {
            path: `/students`,
            queryParams,
        },
        { limit: options?.limit ?? 30, page: 1 }
    )
}

export function useGetStudentsReport() {
    const result = useGet<string>({
        path: `/students.csv`,
        lazy: true,
    })

    return {
        ...result,
        fetchReport: async (periodFrom: Date, periodTo: Date, organizationId: string) => {
            const periodFromFormatted = DateFormatters.formattedDate(periodFrom, 'YYYY-MM-DD')
            const periodToFormatted = DateFormatters.formattedDate(periodTo, 'YYYY-MM-DD')

            await result.refetch({
                // TODO: add '&intake.status=Accepted' once that parameter is working - in order to return only accepted students
                // v1 path: `students.csv?_mapping[Voornaam]=person.givenName&_mapping[Tussenvoegsel]=person.additionalName&_mapping[Achternaam ]=person.familyName&_mapping[Aanmaakdatum]=intake.date&_mapping[E-mail adres]=person.emails.0.email&_mapping[Telefoon]=person.telephones.0.telephone&_mapping[Aanmeldende instantie]=intake.referringOrganization&_mapping[Aanmeldende instantie Email]=intake.referringOrganizationEmail&_mapping[Aanmeldende instantie Anders]=intake.referringOrganizationOther&_mapping[Hoe bij Taalhuis terecht gekomen]=intake.foundVia&_mapping[Hoe bij Taalhuis terecht gekomen anders ]=intake.foundViaOther&_dateCreated[from]=${periodFromFormatted}&_dateCreated[till]=${periodToFormatted}&languageHouse.id=${organizationId}`,
                // v2 path: `students.csv?fields[]=id&fields[]=languageHouse.name&fields[]=person.givenName&fields[]=person.additionalName&fields[]=person.familyName&fields[]=intake.date&fields[]=person.emails.email&fields[]=person.telephones.telephone&fields[]=status&fields[]=intake.referringOrganization&fields[]=intake.referringOrganizationEmail&fields[]=intake.referringOrganizationOther&fields[]=intake.foundVia&fields[]=Intake.foundViaOther&_dateCreated[from]=${periodFromFormatted}&_dateCreated[till]=${periodToFormatted}&languageHouse.id=${organizationId}`,
                // v3 path:
                path: `students.csv?_mapping[Voornaam]=person.givenName&_mapping[Tussenvoegsel]=person.additionalName&_mapping[Achternaam]=person.familyName&_mapping[Aanmaakdatum]=intake.date&_mapping[E-mail%20adres]=person.emails.0.email&_mapping[Telefoon]=person.telephones.0.telephone&_mapping[Aanmeldende%20instantie]=intake.referringOrganization&_mapping[Aanmeldende%20instantie%20Email]=intake.referringPerson.emails.0.email&_mapping[Aanmeldende%20instantie%20Anders]=intake.referringOrganizationOther&_mapping[Hoe%20bij%20Taalhuis%20terecht%20gekomen]=intake.foundVia&_mapping[Hoe%20bij%20Taalhuis%20terecht%20gekomen%20anders%20]=intake.foundViaOther&_mapping[Status]=intake.status&_mapping[Aanmaakdatum]=@dateCreatedd&_dateCreated[from]=${periodFromFormatted}&_dateCreated[till]=${periodToFormatted}&languageHouse._id=${organizationId}`,
            })
        },
    }
}

export function useGetStudent(studentId: string) {
    return useGet<Student>({
        path: `/students/${studentId}`,
    })
}

export function useGetSingleStudentReport(studentId: string) {
    return useGet<string>({
        path: `/studentDownload/${studentId}`,
        lazy: true,
    })
}

export function useDeletePendingStudent(taalhuisParticipantId: string) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return useMutate<null, MutationError, any, void>({
        verb: 'DELETE',
        path: `/students/${taalhuisParticipantId}`,
    })
}

export interface PostPutStudentParams {
    languageHouse?: string
    civicIntegration?: {
        id?: string
        requirement?: Maybe<CivicIntegrationRequirement>
        reason?: Maybe<CivicIntegrationReason>
        finishDate?: Maybe<string>
    }
    person?: Maybe<PostPutPersonParams>
    intake: {
        id?: string
        status: IntakeStatus
        referringOrganization?: Maybe<IntakeReferringOrganization>
        referringOrganizationOther?: Maybe<string>
        referringPerson?: Maybe<PostPutPersonParams>
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
    educations?: PostPutEducationParams[]
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
