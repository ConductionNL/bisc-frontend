import { t } from '@lingui/macro'
import { useLingui } from '@lingui/react'
import { useGetStudent } from 'api/student/student'
import Headline, { SpacingType } from 'components/Chrome/Headline'
import { breadcrumbItems } from 'components/Core/Breadcrumbs/breadcrumbItems'
import { Breadcrumbs } from 'components/Core/Breadcrumbs/Breadcrumbs'
import Column from 'components/Core/Layout/Column/Column'
import {
    TaalhuisParticipantDetailTabs,
    TaalhuisParticipantDetailTabsEnum,
} from 'components/Domain/Taalhuis/Participants/TaalhuisParticipantDetailTabs'
import { Redirect, Route, Switch, useParams } from 'react-router-dom'
import { TaalhuisParticipantsDetailRouteParams, taalhuisRoutes } from 'routes/taalhuis/taalhuisRoutes'
import { NameFormatters } from 'utils/formatters/name/Name'
import { ParticipantMentorDetailView } from './ParticipantMentorDetailView'
import { ParticipantMentorUpdateView } from './ParticipantMentorUpdateView'

export const ParticipantMentorView = () => {
    const { i18n } = useLingui()
    const { taalhuisParticipantId } = useParams<TaalhuisParticipantsDetailRouteParams>()
    const { data } = useGetStudent(taalhuisParticipantId)

    const studentName = data?.person ? NameFormatters.formattedFullname(data.person) : ''
    const basePath = taalhuisRoutes.participants.detail().data.mentor

    return (
        <>
            <Headline
                title={i18n._(t`Deelnemer ${studentName}`)}
                spacingType={SpacingType.small}
                TopComponent={<Breadcrumbs breadcrumbItems={[breadcrumbItems.taalhuis.participants.overview]} />}
            />
            <Column spacing={10}>
                <TaalhuisParticipantDetailTabs activeTabId={TaalhuisParticipantDetailTabsEnum.Mentor} />
                <Switch>
                    <Route path={basePath.detail} exact={true} component={ParticipantMentorDetailView} />
                    <Route path={basePath.update} exact={true} component={ParticipantMentorUpdateView} />
                    <Redirect path={basePath.index} to={basePath.detail} />
                </Switch>
            </Column>
        </>
    )
}
