import React, { useEffect, useState } from 'react'
import { DateFormatters } from 'utils/formatters/Date/Date'
import Input, { BaseInputProps } from './Input'

interface Props extends BaseInputProps {
    defaultValue?: string
}

const DateInput: React.FunctionComponent<Props> = props => {
    const { defaultValue, ...rest } = props
    const [value, setValue] = useState<string | number | undefined>(undefined)

    useEffect(() => {
        if (defaultValue) {
            const date = new Date(defaultValue)
            const formattedDate = DateFormatters.formattedUsaDate(date.toString())
            setValue(formattedDate)
        }
    }, [defaultValue])

    return <Input type="date" value={value} {...rest} />
}

export default DateInput
