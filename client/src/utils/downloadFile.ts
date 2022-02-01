import { i18n } from '@lingui/core'
import { NotificationsManager } from 'components/Core/Feedback/Notifications/NotificationsManager'

export async function downloadFile(response: Response, filename: string) {
    try {
        // source: https://stackoverflow.com/a/48968694/2803759
        const blob = await response.blob()
        if (window.navigator.msSaveOrOpenBlob) {
            window.navigator.msSaveOrOpenBlob(blob, filename)
        } else {
            const a = document.createElement('a')
            document.body.appendChild(a)
            const url = window.URL.createObjectURL(blob)
            a.href = url
            a.download = filename
            a.click()
            setTimeout(() => {
                window.URL.revokeObjectURL(url)
                document.body.removeChild(a)
            }, 0)
        }
    } catch (e) {
        NotificationsManager.error(i18n._(`Actie mislukt`), i18n._(`Er is een onverwachte fout opgetreden`))
        // eslint-disable-next-line no-console
        console.error(e)
    }
}
