export const toBase64SingleFile = (file: File): Promise<string> =>
    new Promise((resolve, reject) => {
        const reader = new FileReader()
        reader.readAsDataURL(file)
        reader.onload = () => resolve(reader.result as string)
        reader.onerror = error => reject(error)
    })

export function downloadBase64(base64: string, fileName: string) {
    // TODO: expand files support
    const linkSource = `data:application/pdf;base64, ${base64}`
    const downloadLink = document.createElement('a')

    downloadLink.href = linkSource
    downloadLink.download = fileName
    downloadLink.click()
    downloadLink.remove()
}
