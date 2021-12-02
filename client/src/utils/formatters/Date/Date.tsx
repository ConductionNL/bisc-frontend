import { Maybe } from 'api/types/types'
import { format, isValid } from 'date-fns'

export class Dates {
    public formattedDate = (value?: string | Date | null, formatAs?: string) => {
        const parsedDate = this.parseDateString(value)

        if (parsedDate) {
            const formatted = format(parsedDate, formatAs || 'DD-MM-YYYY')
            return formatted
        }
    }

    public formattedUsaDate = (value?: string | Date) => {
        const parsedDate = this.parseDateString(value)
        if (parsedDate) {
            const formatted = format(parsedDate, 'YYYY-MM-DD')
            return formatted
        }
    }

    public parseDateString = (value?: string | Date | null) => {
        const date = typeof value === 'string' ? new Date(value) : value

        if (date && isValid(date)) {
            return date
        }
    }

    public static toString(value?: Maybe<Date>) {
        if (!value) {
            return
        }

        return value.toDateString()
    }
}

export const DateFormatters = new Dates()
