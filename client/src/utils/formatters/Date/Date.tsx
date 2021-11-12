import { format, isValid } from 'date-fns'

class Dates {
    public formattedDate = (value?: string | Date, formatAs?: string) => {
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

    public parseDateString = (value?: string | Date) => {
        const date = typeof value === 'string' ? new Date(value) : value

        if (date && isValid(date)) {
            return date
        }
    }
}

export const DateFormatters = new Dates()
