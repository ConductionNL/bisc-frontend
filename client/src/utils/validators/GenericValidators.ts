import { i18n } from '@lingui/core'
import { t } from '@lingui/macro'

class Generic {
    public required = (value: string | null) => {
        if (!value) {
            return i18n._(t`Dit veld is verplicht`)
        }
        return null
    }
}

export const GenericValidators = new Generic()
