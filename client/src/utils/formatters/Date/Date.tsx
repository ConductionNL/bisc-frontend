import { Maybe } from 'api/types/types'
import { format, isValid } from 'date-fns'
import isString from 'lodash/isString'

class Dates {
    public static formattedDate = (value?: string | Date | null, formatAs?: string) => {
        const parsedDate = Dates.parseDateString(value)

        if (parsedDate) {
            const formatted = format(parsedDate, formatAs || 'DD-MM-YYYY')
            return formatted
        }
    }

    public static formattedUsaDate = (value?: string | Date) => {
        const parsedDate = Dates.parseDateString(value)
        if (parsedDate) {
            const formatted = format(parsedDate, 'YYYY-MM-DD')
            return formatted
        }
    }

    public static parseDateString = (value?: string | Date | null) => {
        const date = typeof value === 'string' ? new Date(value) : value

        if (date && isValid(date)) {
            return date
        }
    }

    public static toString(value?: Maybe<Date | string>) {
        if (!value) {
            return
        }

        if (isString(value)) {
            return value
        }

        return value.toDateString()
    }
}

export const DateFormatters = Dates
