import { usePaginatedGet } from 'api/common/pagination'
import { MutationError, PaginatedResult, Team } from 'api/types/types'
import { useGet, useMutate } from 'restful-react'

export interface TeamsParams {}

export interface TeamsData extends PaginatedResult<Team> {}

export type PostPutTeamResponse = Team

export type PostPutTeamParams = Partial<{
    name: string
    type: 'team'
    parentOrganization: string
    team_postalCodes: string[]
    members: any // TODO: BISC-314
}>

export function useGetTeams(limit?: number) {
    return usePaginatedGet<TeamsData>(
        {
            path: '/organizations',
            queryParams: { type: 'team' },
        },
        { limit: limit || 30, page: 1 }
    )
}

export function useGetTeam(teamId: string) {
    return useGet<Team>({
        path: `/organizations/${teamId}`,
    })
}

export function usePostTeam() {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return useMutate<PostPutTeamResponse, MutationError, any, PostPutTeamParams>({
        verb: 'POST',
        path: '/organizations',
    })
}

export function usePutTeam(teamId: string) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return useMutate<PostPutTeamResponse, MutationError, any, PostPutTeamParams>({
        verb: 'PUT',
        path: `/organizations/${teamId}`,
    })
}

export function useDeleteTeam(teamId: string) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return useMutate<null, MutationError, any, void>({
        verb: 'DELETE',
        path: `/organizations/${teamId}`,
    })
}
