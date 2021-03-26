class FormsUtils {
    public getFormDataFromFormEvent<TData>(e: React.FormEvent<HTMLFormElement>): TData {
        const data = new FormData(e.currentTarget)
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const form = Object.fromEntries(Array.from(data.entries())) as any
        return form
    }

    public getObjectsFromListWithStringList<TData>(compareKey: string, value?: string, items?: TData[]): TData[] {
        const splittedValue = value?.split(', ') ?? []
        const list = splittedValue.map(valueItem => {
            const correspondingItem = items?.find(item => {
                // had to use any here, because the item is not known yet
                const field = (item as any)[compareKey]

                return field === valueItem
            })

            return correspondingItem
        })
        const filteredList: TData[] = list.filter(item => item) as TData[]

        return filteredList
    }
}

export const Forms = new FormsUtils()
