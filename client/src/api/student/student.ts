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

export function useGetStudents() {
    return usePaginatedGet<StudentsData>(
        {
            path: `/students`,
        },
        { limit: 30, page: 1 }
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
                path: `/students.csv?fields[]=id&fields[]=languageHouse.name&fields[]=person.givenName&fields[]=person.additionalName&fields[]=person.familyName&fields[]=intake.date&fields[]=person.emails.email&fields[]=person.telephones.telephone&fields[]=status&fields[]=intake.referringOrganization&fields[]=intake.referringOrganizationEmail&fields[]=intake.referringOrganizationOther&fields[]=intake.foundVia&fields[]=Intake.foundViaOther&status=Accepted&_dateCreated[from]=${periodFromFormatted}&_dateCreated[till]=${periodToFormatted}&languageHouse.id=${organizationId}`,
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
