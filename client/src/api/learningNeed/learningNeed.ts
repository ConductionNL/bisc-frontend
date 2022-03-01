import { usePaginatedGet } from 'api/common/pagination'
import {
    LearningNeed,
    LearningResultApplication,
    LearningResultLevel,
    LearningResultSubject,
    Maybe,
    MutationError,
    OfferDifference,
    PaginatedResult,
} from 'api/types/types'
import { useGet, useMutate } from 'restful-react'
import { DateFormatters } from 'utils/formatters/Date/Date'

export interface LeaningNeedsParams {}
export interface LearningNeedsData extends PaginatedResult<LearningNeed> {}

export function useGetLearningNeeds(studentId: string) {
    return usePaginatedGet<LearningNeedsData>(
        {
            path: `/learning_needs`,
            queryParams: {
                'student.id': studentId,
            },
        },
        { limit: 30, page: 1 }
    )
}

export function useGetLearningNeedsReport() {
    const result = useGet<string>({
        path: `/learning_needs.csv`,
        lazy: true,
    })

    return {
        ...result,
        fetchReport: async (periodFrom: Date, periodTo: Date, organizationId: string) => {
            const periodFromFormatted = DateFormatters.formattedDate(periodFrom, 'YYYY-MM-DD')
            const periodToFormatted = DateFormatters.formattedDate(periodTo, 'YYYY-MM-DD')

            await result.refetch({
                // v1 path: `learning_needs.csv?_mapping[Voornaam]=student.person.givenName&_mapping[Tussenvoegsel]=student.person.additionalName&_mapping[Achternaam]=student.person.familyName&_mapping[NT1 of NT2]=student.intake.dutchNTLevel&_mapping[ID leervraag]=id&_mapping[Leervraag]=motivation&_mapping[Gewenste leeruitkomst]=description&_mapping[Werkwoord]=learningResults.0.verb&_mapping[Onderwerp]=learningResults.0.subject&_mapping[Onderwerp anders]=learningResults.0.subjectOther&_mapping[Toepassing]=learningResults.0.application&_mapping[Toepassing anders]=learningResults.0.applicationOther&_mapping[Niveau]=learningResults.0.level&_mapping[Gewenst aanbod]=desiredOffer&_mapping[Geadviseerd aanbod]=advisedOffer&_mapping[ID aanbieder]=participations.0.provider.id&_mapping[Aanbieder]=participations.0.provider.name&_mapping[Aanbieder en Aanbod verschil]=offerDifference&_mapping[Aanbieder en Aanbod verschil anders]=offerDifferenceOther&student.languageHouse._id=${organizationId}&_dateCreated[from]=${periodFromFormatted}&_dateCreated[till]=${periodToFormatted}`,
                // v2 path: `learning_needs.csv?_mapping[Voornaam]=student.person.givenName&_mapping[Tussenvoegsel]=student.person.additionalName&_mapping[Achternaam]=student.person.familyName&_mapping[NT1%20of%20NT2]=student.intake.dutchNTLevel&_mapping[Leervraag]=motivation&_mapping[Gewenste%20leeruitkomst]=description&_mapping[Werkwoord]=learningResults.0.verb&_mapping[Onderwerp]=learningResults.0.subject&_mapping[Onderwerp%20anders]=learningResults.0.subjectOther&_mapping[Toepassing]=learningResults.0.application&_mapping[Toepassing%20anders]=learningResults.0.applicationOther&_mapping[Niveau]=learningResults.0.level&_mapping[Gewenst%20aanbod]=desiredOffer&_mapping[Geadviseerd%20aanbod]=advisedOffer&_mapping[aanbieder]=participations.0.provider.name&_mapping[Aanbieder%20anders]=participations.0.providerOther&_mapping[Aanbieder%20en%20Aanbod%20verschil]=offerDifference&_mapping[Aanbieder%20en%20Aanbod%20verschil%20anders]=offerDifferenceOther&student.languageHouse._id=${organizationId}&_dateCreated[from]=${periodFromFormatted}&_dateCreated[till]=${periodToFormatted}`,
                path: `learning_needs.csv?_dateCreated[from]=${periodFromFormatted}&_dateCreated[till]=${periodToFormatted}&_mapping[Voornaam]=student.person.givenName&_mapping[Tussenvoegsel]=student.person.additionalName&_mapping[Achternaam]=student.person.familyName&_mapping[NT1%20of%20NT2]=student.intake.dutchNTLevel&_mapping[Leervraag]=motivation&_mapping[Gewenste%20leeruitkomst]=description&_mapping[Werkwoord]=learningResults.0.verb&_mapping[Onderwerp]=learningResults.0.subject&_mapping[Onderwerp%20anders]=learningResults.0.subjectOther&_mapping[Toepassing]=learningResults.0.application&_mapping[Toepassing%20anders]=learningResults.0.applicationOther&_mapping[Niveau]=learningResults.0.level&_mapping[Gewenst%20aanbod]=desiredOffer&_mapping[Geadviseerd%20aanbod]=advisedOffer&_mapping[Aanbieder]=participations.0.provider.name&_mapping[Aanbieder%20anders]=participations.0.providerOther&_mapping[Aanbieder%20en%20Aanbod%20verschil]=offerDifference&_mapping[Aanbieder%20en%20Aanbod%20verschil%20anders]=offerDifferenceOther&student.languageHouse._id=${organizationId}&fields[]=student.person.givenName&fields[]=student.person.additionalName&fields[]=student.person.familyName&fields[]=student.intake.dutchNTLevel&fields[]=motivation&fields[]=description&fields[]=learningResults.verb&fields[]=learningResults.subject&fields[]=learningResults.subjectOther&fields[]=learningResults.application&fields[]=learningResults.applicationOther&fields[]=learningResults.level&fields[]=desiredOffer&fields[]=advisedOffer&fields[]=participations.provider.name&fields[]=participations.providerOther&fields[]=offerDifference&fields[]=offerDifferenceOther`,
                // OLD path: `/learning_needs.csv?_dateCreated[from]=${periodFromFormatted}&_dateCreated[till]=${periodToFormatted}&fields[]=student.id&fields[]=description&fields[]=id&fields[]=motivation&fields[]=desiredOffer&fields[]=advisedOffer&fields[]=offerDifference&fields[]=agreements&fields[]=learningResults&fields[]=student.person.givenName&fields[]=student.person.additionalName&fields[]=student.person.familyName&fields[]=student.intake.dutchNTLevel&fields[]=learning_results.id&fields[]=learning_results.verb&fields[]=learning_results.subject&fields[]=learning_results.subjectOther&fields[]=learning_results.application&fields[]=learning_results.applicationOther&fields[]=learning_results.level&fields[]=participations.provider.id&fields[]=participations.provider.name&student.languageHouse._id=${organizationId}`,
            })
        },
    }
}

export function useGetLearningNeed(learningNeedId: string) {
    return useGet<LearningNeed>({
        path: `/learning_needs/${learningNeedId}`,
    })
}

export interface PostPutLearningNeedParams {
    id?: string // only for Put (updates)
    student?: string // only for Post (creates)
    description?: Maybe<string>
    motivation?: Maybe<string>
    learningResults?: PostPutLearningResultParams[]
    advisedOffer?: Maybe<string>
    desiredOffer?: Maybe<string>
    offerDifference?: Maybe<OfferDifference>
    offerDifferenceOther?: Maybe<string>
    agreements?: Maybe<string>
}

export interface PostPutLearningResultParams {
    id?: string
    verb?: Maybe<string>
    subject?: Maybe<LearningResultSubject>
    subjectOther?: Maybe<string>
    application?: Maybe<LearningResultApplication>
    applicationOther?: Maybe<string>
    level?: Maybe<LearningResultLevel>
    levelOther?: Maybe<string>
}

export interface PostLearningNeedResponse extends LearningNeed {}

export function usePostLearningNeed() {
    return useMutate<PostLearningNeedResponse, MutationError, any, PostPutLearningNeedParams>({
        verb: 'POST',
        path: '/learning_needs',
    })
}

export interface PutLearningNeedResponse extends LearningNeed {}

export function usePutLearningNeed(learningNeedId: string) {
    return useMutate<PutLearningNeedResponse, MutationError, any, PostPutLearningNeedParams>({
        verb: 'PUT',
        path: `/learning_needs/${learningNeedId}`,
    })
}

export interface DeleteLearningNeedParams {}
export interface DeletelearningNeedResponse {}

export function useDeleteLearningNeed(learningNeedId: string) {
    return useMutate<DeletelearningNeedResponse, MutationError, any, DeleteLearningNeedParams>({
        verb: 'DELETE',
        path: `/learning_needs/${learningNeedId}`,
    })
}
