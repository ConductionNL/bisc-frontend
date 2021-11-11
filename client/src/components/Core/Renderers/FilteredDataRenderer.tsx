import { useState } from 'react'

interface Props<TData> {
    options: TData[]
    render: (renderProps: RenderProps<TData>) => JSX.Element
    filterMethod: (options: TData[], value?: string) => TData[]
}

interface RenderProps<TData> {
    results: TData[] | undefined
    searchList?: (value: string) => void
}

export const FilterteredDataRenderer = <TData extends unknown>(props: Props<TData>) => {
    const { render, options, filterMethod } = props
    const [results, setResults] = useState<TData[] | undefined>(props.options)

    return (
        <>
            {render({
                results,
                searchList: value => searchList(value),
            })}
        </>
    )

    function searchList(value: string) {
        const results = filterMethod(options, value)
        setResults(results)
    }
}
