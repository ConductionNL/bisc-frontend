import { t } from '@lingui/macro'
import { useLingui } from '@lingui/react'
import { useGetStudent } from 'api/student/student'
import Headline, { SpacingType } from 'components/Chrome/Headline'
import { breadcrumbItems } from 'components/Core/Breadcrumbs/breadcrumbItems'
import { Breadcrumbs } from 'components/Core/Breadcrumbs/Breadcrumbs'
import ErrorBlock from 'components/Core/Feedback/Error/ErrorBlock'
import Spinner, { Animation } from 'components/Core/Feedback/Spinner/Spinner'
import Center from 'components/Core/Layout/Center/Center'
import Column from 'components/Core/Layout/Column/Column'
import Paragraph from 'components/Core/Typography/Paragraph'
import { ParticipationRegistrationReadFields } from 'components/Domain/Participation/ParticipationRegistrationReadFields'
import {
    TaalhuisParticipantDetailTabs,
    TaalhuisParticipantDetailTabsEnum,
} from 'components/Domain/Taalhuis/Participants/TaalhuisParticipantDetailTabs'
import React from 'react'
import { useParams } from 'react-router'
import { TaalhuisParticipantsDetailRouteParams } from 'routes/taalhuis/taalhuisRoutes'
import { NameFormatters } from 'utils/formatters/name/Name'

export const ParticipantsRegistrationView: React.FC = () => {
    const { taalhuisParticipantId } = useParams<TaalhuisParticipantsDetailRouteParams>()
    const { i18n } = useLingui()
    const { data: student, loading, error } = useGetStudent(taalhuisParticipantId)

    if (loading) {
        return (
            <Center grow={true}>
                <Spinner type={Animation.pageSpinner} />
            </Center>
        )
    }

    if (error || !student) {
        return (
            <ErrorBlock
                title={i18n._(t`Er ging iets fout`)}
                message={i18n._(t`Wij konden de gegevens niet ophalen, probeer het opnieuw`)}
            />
        )
    }

    /**
     * Bit hacky: here we are assuming that the signup has been done using the public registration form when the `team` field is present,
     * because the team field is only asked in that form and its required.
     *
     * There is currently no other way in the API to know this.
     */
    const studentIsRegisteredUsingPublicForm = !!student.intake?.referringPerson.team

    return (
        <>
            <Headline
                title={i18n._(t`Deelnemer ${NameFormatters.formattedFullname(student.person)}`)}
                spacingType={SpacingType.small}
                TopComponent={<Breadcrumbs breadcrumbItems={[breadcrumbItems.taalhuis.participants.overview]} />}
            />

            <Column spacing={12}>
                <TaalhuisParticipantDetailTabs activeTabId={TaalhuisParticipantDetailTabsEnum.Registration} />
                {studentIsRegisteredUsingPublicForm && <ParticipationRegistrationReadFields student={student} />}
                {!studentIsRegisteredUsingPublicForm && <Paragraph subtle={true}>Geen digitale aanmelding</Paragraph>}
            </Column>
        </>
    )
}
