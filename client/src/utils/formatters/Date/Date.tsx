import { isValid } from 'date-fns'

class Dates {
    public formattedDate = (value?: string | Date) => {
        const date = typeof value === 'string' ? new Date(value) : value
        if (!date) {
            return ''
        }
        if (isValid(date)) {
            const formatted = new Intl.DateTimeFormat('en-US').format(date)

            return formatted
        }

        return 'NOT A VALID DATE'
    }
}

export const DateFormatters = new Dates()
