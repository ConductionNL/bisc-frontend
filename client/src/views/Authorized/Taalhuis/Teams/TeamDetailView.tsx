import { useLingui } from '@lingui/react'
import { Team } from 'api/types/types'
import Headline, { SpacingType } from 'components/Chrome/Headline'
import Actionbar from 'components/Core/Actionbar/Actionbar'
import { breadcrumbItems } from 'components/Core/Breadcrumbs/breadcrumbItems'
import { Breadcrumbs } from 'components/Core/Breadcrumbs/Breadcrumbs'
import Button, { ButtonType } from 'components/Core/Button/Button'
import Column from 'components/Core/Layout/Column/Column'
import { TeamDetailFields } from 'components/Domain/Taalhuis/Team/TeamDetailFields'
import React, { useState } from 'react'
// import { useGetTeam } from 'api/team/team'
// import { PageQuery } from 'components/Core/PageQuery/PageQuery'
// import { useParams } from 'react-router-dom'
// import { TeamDetailRouteParams } from 'routes/taalhuis/taalhuisRoutes'

export const TeamDetailView: React.FunctionComponent = () => {
    // const { teamId } = useParams<TeamDetailRouteParams>()
    const [editing, setEditing] = useState(false)
    const { i18n } = useLingui()

    // eslint-disable-next-line react-hooks/rules-of-hooks
    // return <PageQuery queryHook={() => useGetTeam(teamId)}>{renderContent}</PageQuery>
    return renderContent({
        id: '1',
        name: 'Some team -- TODO: not using the query',
        team_postalCodes: [],
        members: null,
        '@dateCreated': new Date().toString(),
        '@dateModified': new Date().toString(),
    })

    function renderContent(team: Team) {
        return (
            <>
                <Headline
                    title={team.name}
                    TopComponent={<Breadcrumbs breadcrumbItems={[breadcrumbItems.taalhuis.teams.overview]} />}
                    spacingType={SpacingType.default}
                />
                <Column spacing={10}>
                    <TeamDetailFields readOnly={!editing} defaultValues={team} />
                </Column>
                <Actionbar
                    RightComponent={
                        <Button type={ButtonType.primary} onClick={() => setEditing(true)}>
                            {i18n._('Bewerken')}
                        </Button>
                    }
                />
            </>
        )
    }
}
