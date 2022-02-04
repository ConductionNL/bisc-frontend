import { useLingui } from '@lingui/react'
import { GetTeamField, useGetTeams } from 'api/team/team'
import { Team } from 'api/types/types'
import Headline, { SpacingType } from 'components/Chrome/Headline'
import Button from 'components/Core/Button/Button'
import { IconType } from 'components/Core/Icon/IconType'
import { InfiniteScrollPageQuery } from 'components/Core/InfiniteScrollPageQuery/InfiniteScrollPageQuery'
import Column from 'components/Core/Layout/Column/Column'
import Row from 'components/Core/Layout/Row/Row'
import { Table } from 'components/Core/Table/Table'
import { TableLink } from 'components/Core/Table/TableLink'
import Paragraph from 'components/Core/Typography/Paragraph'
import { useHistory } from 'react-router-dom'
import { taalhuisRoutes } from 'routes/taalhuis/taalhuisRoutes'

export const TeamsOverviewView = () => {
    const { i18n } = useLingui()
    const history = useHistory()

    return (
        <>
            <Headline spacingType={SpacingType.small} title={i18n._(`Teams`)} />

            <Column spacing={6}>
                <Row justifyContent="flex-end">
                    <Button icon={IconType.add} onClick={() => history.push(taalhuisRoutes.teams.create)}>
                        {i18n._(`Nieuwe team`)}
                    </Button>
                </Row>
                <InfiniteScrollPageQuery
                    queryHook={() =>
                        // eslint-disable-next-line react-hooks/rules-of-hooks
                        useGetTeams({
                            fields: [
                                GetTeamField.Id,
                                GetTeamField.Name,
                                GetTeamField.MembersId,
                                GetTeamField.TeamPostalCodesId,
                                GetTeamField.TeamPostalCodesCode,
                            ],
                        })
                    }
                >
                    {renderTable}
                </InfiniteScrollPageQuery>
            </Column>
        </>
    )

    function renderTable(teams: Team[]) {
        return (
            <Table
                flex={1}
                headers={[i18n._('TEAM'), i18n._('MEDEWERKERS'), i18n._('POSTCODEGEBIED(EN)')]}
                rows={renderTeams(teams)}
            />
        )
    }

    function renderTeams(teams: Team[]) {
        return teams.map(t => [
            <TableLink text={t.name} to={taalhuisRoutes.teams.detail(t.id).index} />,
            <Paragraph>{t.members?.length}</Paragraph>,
            <Paragraph>{t.team_postalCodes?.map(p => p.code).join(', ')}</Paragraph>,
        ])
    }
}
