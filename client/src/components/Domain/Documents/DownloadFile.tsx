import { t } from '@lingui/macro'
import { useLingui } from '@lingui/react'
import { useGetFile } from 'api/file/file'
import { Document } from 'api/types/types'
import { NotificationsManager } from 'components/Core/Feedback/Notifications/NotificationsManager'
import { useEffect } from 'react'
import { downloadFile } from 'utils/downloadFile'

interface Props {
    document: Document
    children: (downloadFile: () => void, loading: boolean) => JSX.Element
}

export const DownloadFileContainer = (props: Props) => {
    const { i18n } = useLingui()

    const { response: fileResponse, loading: fileLoading, fetchFile } = useGetFile()

    useEffect(() => {
        if (fileResponse?.ok) {
            NotificationsManager.success(i18n._(t`Bestand wordt gedownload`))
            downloadFile(fileResponse, props.document.file.name)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [fileResponse])

    return props.children(handleDownload, fileLoading)

    async function handleDownload() {
        try {
            await fetchFile(props.document.file.id)

            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
            if (error.data) {
                NotificationsManager.error(i18n._(t`Actie mislukt`), i18n._(t`Er is een onverwachte fout opgetreden`))
            }
        }
    }
}
