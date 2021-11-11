export async function downloadFile(response: Response, filename: string) {
    try {
        // source: https://stackoverflow.com/a/48968694/2803759
        const blob = await response.blob()
        if ((window.navigator as any).msSaveOrOpenBlob) {
            ;(window.navigator as any).msSaveOrOpenBlob(blob, filename)
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
        // eslint-disable-next-line no-console
        console.error(e)
    }
}
