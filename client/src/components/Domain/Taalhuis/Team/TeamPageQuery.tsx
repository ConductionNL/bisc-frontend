// import { useGetTeam } from 'api/team/team'
import { useGetTeam } from 'api/team/team'
import { Team } from 'api/types/types'
import { PageQuery, PageQueryResultOptions } from 'components/Core/PageQuery/PageQuery'
import React from 'react'

interface Props {
    teamId: string
    children: (data: Team, options: PageQueryResultOptions) => JSX.Element
}

export const TeamPageQuery: React.FunctionComponent<Props> = ({ teamId, children }) => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    return <PageQuery queryHook={() => useGetTeam(teamId)}>{children}</PageQuery>
}
