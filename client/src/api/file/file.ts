import { useGet } from 'restful-react'

export function useGetFile() {
    const result = useGet<string>({
        path: `/files/:documentId`,
        lazy: true,
    })

    return {
        ...result,
        fetchFile: async (documentId: string) => {
            await result.refetch({
                path: `/files/${documentId}`,
            })
        },
    }
}
