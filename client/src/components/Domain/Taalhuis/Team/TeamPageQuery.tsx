// import { useGetTeam } from 'api/team/team'
import { Team } from 'api/types/types'
import { PageQueryResultOptions } from 'components/Core/PageQuery/PageQuery'
import React from 'react'

interface Props {
    teamId: string
    children: (data: Team, options: PageQueryResultOptions) => JSX.Element
}

export const TeamPageQuery: React.FunctionComponent<Props> = ({ teamId, children }) => {
    // TODO: BISC-314
    // eslint-disable-next-line react-hooks/rules-of-hooks
    // return <PageQuery queryHook={() => useGetTeam(teamId)}>{children}</PageQuery>

    const tempData = {
        id: '1',
        name: 'Some team -- TODO: not using the query',
        team_postalCodes: [],
        members: null,
        '@dateCreated': new Date().toString(),
        '@dateModified': new Date().toString(),
    }

    return children(tempData, { loading: false, error: null, refetch: () => ({}) })
}
