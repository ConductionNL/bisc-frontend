import { i18n } from '@lingui/core'
import { t } from '@lingui/macro'
import { format, isValid } from 'date-fns'

class Dates {
    public formattedDate = (value?: string | Date) => {
        const date = typeof value === 'string' ? new Date(value) : value
        if (!date) {
            return ''
        }
        if (isValid(date)) {
            const formatted = format('DD-MM-YYYY')

            return formatted
        }

        return 'NOT A VALID DATE'
    }

    public formattedUsaDate = (value?: string | Date) => {
        const date = typeof value === 'string' ? new Date(value) : value
        if (!date) {
            return ''
        }
        if (isValid(date)) {
            const formatted = format(date, 'YYYY-MM-DD')

            return formatted
        }

        return i18n._(t`Onbekende datum`)
    }
}

export const DateFormatters = new Dates()
