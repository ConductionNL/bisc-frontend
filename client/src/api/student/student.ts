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
} from 'api/types/types'
import { useEffect, useState } from 'react'
import { useGet, useMutate } from 'restful-react'

export interface StudentsParams {}
export interface StudentsData extends PaginatedResult<Student> {}

export function useGetStudents(page: number) {
    /**
     * TODO: make generic so it can be reused for another paginated GET request
     */
    const [data, setData] = useState<StudentsData>()

    const limit = 30

    const o = useGet<StudentsData>({
        path: `/students`,
        queryParams: {
            limit: limit,
            page: page,
        },
    })

    useEffect(() => {
        if (o.data) {
            if (o.data.page && o.data.page > 1) {
                // not the first page, so assume data has changed because of infinite scroll
                setData(prevData => {
                    if (!prevData) {
                        return o.data ?? undefined
                    }

                    return {
                        ...prevData,
                        // merge results
                        results: [...(prevData?.results || []), ...(o.data?.results || [])],
                    }
                })
            } else {
                // overwrite data
                setData(o.data)
            }
        }
    }, [o.data?.page])

    return {
        ...o,
        loadMore: (page: number) => {
            o.refetch({
                queryParams: {
                    limit: limit,
                    page: page,
                },
            })
        },
        data,
    }
}

export function useGetStudentsReport() {
    const result = useGet<StudentsData>({
        path: `/students.csv`,
        lazy: true,
    })

    return {
        ...result,
        fetchReport: async (periodFrom: Date, periodTo: Date) => {
            // TODO pass period
            await result.refetch()
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
        // availability: ['MONDAY_MORNING', 'MONDAY_AFTERNOON', 'MONDAY_EVENING', 'TUESDAY_MORNING']
        // availabilityNotes: 'stringetje'
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
        didSignPermissionForm?: Maybe<boolean>
        hasPermissionToSendInformationAboutLibraries?: Maybe<boolean>
        hasPermissionToShareDataWithLibraries?: Maybe<boolean>
        hasPermissionToShareDataWithProviders?: Maybe<boolean>
        //     date: '23-04-2021'

        //     network: ['HOUSEHOLD_MEMBERS', 'NEIGHBORS']
        //     dutchNTLevel: 'NT1'
        //     inNetherlandsSinceYear: 2016
        //     languageInDailyLife: 'Dutch'
        //     knowsLatinAlphabet: true
        //     lastKnownLevel: 'A0'
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
    }
    educations: PostPutEducationParams[]
}

export interface PostPutEducationParams {
    id?: string
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
