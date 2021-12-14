import { usePaginatedGet } from 'api/common/pagination'
import { MutationError, Document, PaginatedResult } from 'api/types/types'
import { useGet, useMutate } from 'restful-react'
import { RecursivePartial } from 'utils/objects/objects'

export type PaginatedDocuments = PaginatedResult<Document>

export type PostDocumentParams = RecursivePartial<Params>

interface Params extends Omit<Document, 'participant'> {
    participant: string
}

export function useGetDocuments(forParticipantId?: string) {
    return usePaginatedGet<PaginatedDocuments>(
        {
            path: `/documents`,
            queryParams: { 'participant.id': forParticipantId },
        },
        { limit: 30, page: 1 }
    )
}

export function useGetDocument(documentId: string) {
    return useGet<Document>({
        path: `/documents/${documentId}`,
    })
}

export function usePostDocument() {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return useMutate<Document, MutationError, any, PostDocumentParams>({
        verb: 'POST',
        path: '/documents',
    })
}

export function useDeleteDocument(documentId: string) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return useMutate<null, MutationError, any, void>({
        verb: 'DELETE',
        path: `/documents/${documentId}`,
    })
}
