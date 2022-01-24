import { useLingui } from '@lingui/react'
import { Team } from 'api/types/types'
import Headline, { SpacingType } from 'components/Chrome/Headline'
import Actionbar from 'components/Core/Actionbar/Actionbar'
import { breadcrumbItems } from 'components/Core/Breadcrumbs/breadcrumbItems'
import { Breadcrumbs } from 'components/Core/Breadcrumbs/Breadcrumbs'
import Button, { ButtonType } from 'components/Core/Button/Button'
import Column from 'components/Core/Layout/Column/Column'
import { TeamDetailFields } from 'components/Domain/Taalhuis/Team/TeamDetailFields'
import React from 'react'
import { useHistory } from 'react-router-dom'
import { taalhuisRoutes } from 'routes/taalhuis/taalhuisRoutes'
import { useParams } from 'react-router-dom'
import { TeamDetailRouteParams } from 'routes/taalhuis/taalhuisRoutes'
import { TeamPageQuery } from 'components/Domain/Taalhuis/Team/TeamPageQuery'

export const TeamDetailView: React.FunctionComponent = () => {
    const { teamId } = useParams<TeamDetailRouteParams>()
    const { i18n } = useLingui()
    const history = useHistory()

    return <TeamPageQuery teamId={teamId}>{renderContent}</TeamPageQuery>

    function renderContent(team: Team) {
        return (
            <>
                <Headline
                    title={team.name}
                    TopComponent={<Breadcrumbs breadcrumbItems={[breadcrumbItems.taalhuis.teams.overview]} />}
                    spacingType={SpacingType.default}
                />
                <Column spacing={10}>
                    <TeamDetailFields defaultValues={team} readOnly={true} />
                </Column>
                <Actionbar
                    RightComponent={
                        <Button
                            type={ButtonType.primary}
                            onClick={() => history.push(taalhuisRoutes.teams.detail(teamId).update)}
                        >
                            {i18n._('Bewerken')}
                        </Button>
                    }
                />
            </>
        )
    }
}
