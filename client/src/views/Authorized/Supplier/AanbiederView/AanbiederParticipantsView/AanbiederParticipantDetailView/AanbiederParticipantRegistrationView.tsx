import React from 'react'
import { useLingui } from '@lingui/react'
import { t } from '@lingui/macro'

import Headline, { SpacingType } from 'components/Chrome/Headline'
import Column from 'components/Core/Layout/Column/Column'
import {
    AanbiederParticipantTab,
    AanbiederParticipantTabs,
} from 'components/Domain/Aanbieder/AanbiederParticipants/AanbiederParticipantTabs'
import { useMockQuery } from 'components/hooks/useMockQuery'
import { AanbiederParticipantDetail, aanbiederParticipantDetail } from '../../mocks'
import Center from 'components/Core/Layout/Center/Center'
import Spinner, { Animation } from 'components/Core/Feedback/Spinner/Spinner'
import ErrorBlock from 'components/Core/Feedback/Error/ErrorBlock'
import { ParticipationRegistrationFields } from 'components/Domain/Participation/ParticipationRegistrationFields'
import { ParticipantStatusEnum, StudentQuery } from 'generated/graphql'
import { NameFormatters } from 'utils/formatters/name/Name'

interface Props {
    participantId: number
}

export const AanbiederParticipantRegistrationView: React.FunctionComponent<Props> = ({ participantId }) => {
    const { i18n } = useLingui()
    // TODO: replace with real query
    const { data, loading, error } = useMockQuery<StudentQuery>({
        student: {
            id: 'myId',
            dateCreated: new Date().toString(),
            status: ParticipantStatusEnum.Accepted,
            givenName: 'my name',
            additionalName: 'den',
            familyName: 'woltheus',
            memo: `iusov, as a man man of breeding and deilcacy, could not but feel some inwrd qualms, when he reached the Father Superior's with Ivan: he felt ashamed of havin lost his temper. He felt that he ought to have disdaimed that despicable wretch, Fyodor Pavlovitch, too much to have been upset by him in Father Zossima's cell, and so to have forgotten himself. "Teh monks were not to blame, in any case," he reflceted, on the steps. "And if they're decent people here (and the Father Superior, I understand, is a nobleman) why not be friendly and courteous withthem? I won't argue, I'll fall in with everything, I'll win them by politness, and show them that I've nothing to do with that Aesop, thta buffoon, that Pierrot, and have merely been takken in over this affair, just as they have.`,
            registrar: {
                __typename: 'StudentRegistrarType',
                id: 'id',
                organisationName: 'Lifely',
                givenName: 'Rick',
                additionalName: 'den',
                familyName: 'Woltheus',
                email: 'rwoltheus@gmail.com',
                telephone: '06111111111',
            },
        },
    })

    if (loading) {
        return (
            <Center grow={true}>
                <Spinner type={Animation.pageSpinner} />
            </Center>
        )
    }

    return (
        <>
            {/* TODO: add breadcrumb */}
            <Headline
                spacingType={SpacingType.small}
                title={
                    NameFormatters.formattedFullname({
                        givenName: data?.student.givenName,
                        additionalName: data?.student.additionalName,
                        familyName: data?.student.familyName,
                    }) || ''
                }
            />
            <Column spacing={10}>
                <AanbiederParticipantTabs currentTab={AanbiederParticipantTab.registration} />
                {renderList()}
            </Column>
        </>
    )

    function renderList() {
        if (error || !data) {
            return (
                <ErrorBlock
                    title={i18n._(t`Er ging iets fout`)}
                    message={i18n._(t`Wij konden de gegevens niet ophalen, probeer het opnieuw`)}
                />
            )
        }

        return <ParticipationRegistrationFields prefillData={data} readOnly={true} />
    }
}
