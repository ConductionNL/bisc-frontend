import { t } from '@lingui/macro'
import { useLingui } from '@lingui/react'
import Headline, { SpacingType } from 'components/Chrome/Headline'
import { breadcrumbItems } from 'components/Core/Breadcrumbs/breadcrumbItems'
import { Breadcrumbs } from 'components/Core/Breadcrumbs/Breadcrumbs'
import ErrorBlock from 'components/Core/Feedback/Error/ErrorBlock'
import Spinner, { Animation } from 'components/Core/Feedback/Spinner/Spinner'
import Center from 'components/Core/Layout/Center/Center'
import Column from 'components/Core/Layout/Column/Column'
import { ParticipationRegistrationFields } from 'components/Domain/Participation/ParticipationRegistrationFields'
import {
    TaalhuisParticipantsDetailTabs,
    Tabs,
} from 'components/Domain/Taalhuis/Participants/TaalhuisParticipantDetailTabs'
import { useMockQuery } from 'components/hooks/useMockQuery'
import { ParticipantStatusEnum, StudentQuery } from 'generated/graphql'
import React from 'react'
import { ParticipantDetailLocationStateProps } from '../ParticipantsDetailView'

interface Props {
    routeState: ParticipantDetailLocationStateProps
}

export const ParticipantsRegistrationView: React.FC<Props> = props => {
    const { routeState } = props
    const { i18n } = useLingui()
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

    return (
        <>
            <Headline
                title={i18n._(t`Deelnemer ${routeState.participantName}`)}
                spacingType={SpacingType.small}
                TopComponent={<Breadcrumbs breadcrumbItems={[breadcrumbItems.taalhuis.participants.overview]} />}
            />

            <Column spacing={12}>
                <TaalhuisParticipantsDetailTabs activeTabId={Tabs.Registration} routeState={routeState} />
                {renderSection()}
            </Column>
        </>
    )

    function renderSection() {
        if (loading) {
            return (
                <Center grow={true}>
                    <Spinner type={Animation.pageSpinner} />
                </Center>
            )
        }

        if (error) {
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
