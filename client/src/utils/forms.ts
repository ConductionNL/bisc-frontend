class FormsUtils {
    public getFormDataFromFormEvent<TData>(e: React.FormEvent<HTMLFormElement>): TData {
        const data = new FormData(e.currentTarget)
        const form = Object.fromEntries(Array.from(data.entries())) as any
        return form
    }

    public getObjectsFromListWithStringList<TData>(compareKey: string, value?: string, items?: TData[]): TData[] {
        const list =
            value?.split(', ').map(valueItem => items?.find(item => (item as any)[compareKey] ?? '' === valueItem)) ??
            []
        const filteredList: TData[] = list.filter(item => item) as TData[]
        return filteredList
    }
}

export const Forms = new FormsUtils()
