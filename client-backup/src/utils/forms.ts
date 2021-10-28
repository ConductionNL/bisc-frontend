class FormsUtils {
    public getFormDataFromFormEvent<TData>(e: React.FormEvent<HTMLFormElement>): TData {
        const data = new FormData(e.currentTarget)
        const dataEntries = Array.from(data.entries()) as (string | undefined)[][]

        const mappedDataEntries = dataEntries.map(dataEntry => {
            const dataEntryWithUndefinedValues = dataEntry.map(value => (value ? value : undefined))

            return dataEntryWithUndefinedValues
        })
        const dataObject = Object.fromEntries(mappedDataEntries)

        return dataObject
    }

    public getObjectsFromListWithStringList<TData>(compareKey: string, value?: string, items?: TData[]): TData[] {
        const splittedValue = value?.split(', ') ?? []
        const list = splittedValue.map(valueItem => {
            const correspondingItem = items?.find(item => {
                // had to use any here, because the item is not known yet
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                const field = (item as any)[compareKey]

                return field === valueItem
            })

            return correspondingItem
        })
        const filteredList: TData[] = list.filter(item => item) as TData[]

        return filteredList
    }

    public getUpdatedValuesArrayForChangedCheckbox<ValueType>(
        allCheckboxValues: ValueType[],
        checkboxValue: ValueType,
        checked: boolean
    ): ValueType[] {

        // Checkbox checked. Add to array.
        if (checked && !allCheckboxValues.includes(checkboxValue)) {
            return [
                ...allCheckboxValues,
                checkboxValue,
            ]
        }

        // Unchecked
        if(!checked && allCheckboxValues.includes(checkboxValue)) {
            const newFamilyComposition = [...allCheckboxValues]
            const index = newFamilyComposition.indexOf(checkboxValue)
            newFamilyComposition.splice(index, 1)
            return newFamilyComposition
        }

        // Nothing needs to change
        return allCheckboxValues
    }
}

export const Forms = new FormsUtils()
