class FormsUtils {
    public getFormDataFromFormEvent<TData>(e: React.FormEvent<HTMLFormElement>): TData {
        const data = new FormData(e.currentTarget)
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const form = Object.fromEntries(Array.from(data.entries())) as any
        return form
    }
}

export const Forms = new FormsUtils()
