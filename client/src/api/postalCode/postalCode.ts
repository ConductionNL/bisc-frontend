import { PaginatedResult, PostalCode } from 'api/types/types'
import { useGet } from 'restful-react'

export function useGetPostalCodes(languageHouseId?: string) {
    return useGet<PaginatedResult<PostalCode>, unknown, unknown, unknown>({
        path: '/postal_codes',
        queryParams: { 'languageHouse.id': languageHouseId },
    })
}
