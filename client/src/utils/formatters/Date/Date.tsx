import { isValid } from 'date-fns'
import { i18n } from '@lingui/core'
import { t } from '@lingui/macro'

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

        return i18n._(t`Onbekende datum`)
    }
}

export const DateFormatters = new Dates()
