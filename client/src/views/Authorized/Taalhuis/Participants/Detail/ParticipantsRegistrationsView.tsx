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
    TaalhuisParticipantDetailTabs,
    TaalhuisParticipantDetailTabsEnum,
} from 'components/Domain/Taalhuis/Participants/TaalhuisParticipantDetailTabs'
import { useStudentQuery } from 'generated/graphql'
import React from 'react'
import { useParams } from 'react-router'
import { TaalhuisParticipantsDetailRouteParams } from 'routes/taalhuis/taalhuisRoutes'
import { NameFormatters } from 'utils/formatters/name/Name'

export const ParticipantsRegistrationView: React.FC = () => {
    const { taalhuisParticipantId } = useParams<TaalhuisParticipantsDetailRouteParams>()
    const { i18n } = useLingui()
    const { data, loading, error } = useStudentQuery({ variables: { id: taalhuisParticipantId } })

    if (loading) {
        return (
            <Center grow={true}>
                <Spinner type={Animation.pageSpinner} />
            </Center>
        )
    }

    if (error || !data?.student) {
        return (
            <ErrorBlock
                title={i18n._(t`Er ging iets fout`)}
                message={i18n._(t`Wij konden de gegevens niet ophalen, probeer het opnieuw`)}
            />
        )
    }

    return (
        <>
            <Headline
                title={i18n._(t`Deelnemer ${NameFormatters.formattedFullname(data.student.personDetails)}`)}
                spacingType={SpacingType.small}
                TopComponent={<Breadcrumbs breadcrumbItems={[breadcrumbItems.taalhuis.participants.overview]} />}
            />

            <Column spacing={12}>
                <TaalhuisParticipantDetailTabs activeTabId={TaalhuisParticipantDetailTabsEnum.Registration} />
                <ParticipationRegistrationFields prefillData={data} readOnly={true} />
            </Column>
        </>
    )
}
