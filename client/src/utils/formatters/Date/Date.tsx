class Dates {
    public formattedDate = (value?: string) => {
        if (!value) {
            return ''
        }
        const formatted = new Intl.DateTimeFormat('en-US').format(new Date(value))

        return formatted
    }
}

export const DateFormatters = new Dates()
