// import { Organization } from 'api/types/types'
import { usePaginatedGet } from 'api/common/pagination'
import { PostPutOrganizationParams } from 'api/organization/organization'
import { MutationError, OrganizationEmployee, PaginatedResult } from 'api/types/types'
import { useGet, useMutate } from 'restful-react'
import { RecursivePartial } from 'utils/objects/objects'

export interface OrganizationEmployeesData extends PaginatedResult<OrganizationEmployee> {}

export type PostPutOrganizationEmployeeResponse = OrganizationEmployee

export type PostPutOrganizationEmployeeParams = RecursivePartial<OrganizationEmployee>

export function useGetOrganizationEmployees(organizationId: string) {
    return usePaginatedGet<OrganizationEmployeesData>(
        {
            path: '/employees',
            queryParams: { 'organization.id': organizationId },
        },
        { limit: 30, page: 1 }
    )
}

export function useGetOrganizationEmployee(employeeId: string) {
    return useGet<OrganizationEmployee>({
        path: `/employees/${employeeId}`,
    })
}

export function usePostOrganizationEmployee() {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return useMutate<PostPutOrganizationEmployeeResponse, MutationError, any, PostPutOrganizationParams>({
        verb: 'POST',
        path: '/employees',
    })
}

export function usePutOrganizationEmployee(employeeId: string) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return useMutate<PostPutOrganizationEmployeeResponse, MutationError, any, PostPutOrganizationParams>({
        verb: 'PUT',
        path: `/employees/${employeeId}`,
    })
}

export function useDeleteOrganizationEmployee(employeeId: string) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return useMutate<null, MutationError, any, void>({
        verb: 'DELETE',
        path: `/employees/${employeeId}`,
    })
}
