import { t } from '@lingui/macro'
import { useLingui } from '@lingui/react'
import LabelTag from 'components/Core/DataDisplay/LabelTag/LabelTag'
import { LabelColor } from 'components/Core/DataDisplay/LabelTag/types'
import { IconType } from 'components/Core/Icon/IconType'
import React from 'react'

interface Props {
    status: Status | string
    className?: string
}

enum Status {
    Refered = 'REFERED',
    Ongoing = 'ONGOING',
    Finished = 'FINISHED',
}

const ReferenceStatusLabel: React.FunctionComponent<Props> = props => {
    const { i18n } = useLingui()
    const { status, className } = props
    const colorConfig = {
        [Status.Refered]: LabelColor.blue,
        [Status.Ongoing]: LabelColor.red,
        [Status.Finished]: LabelColor.green,
    }
    const roleTranslations = {
        [Status.Refered]: i18n._(t`Verwezen`),
        [Status.Ongoing]: i18n._(t`Lopend`),
        [Status.Finished]: i18n._(t`Afgerond`),
    }
    const statusIcons = {
        [Status.Refered]: IconType.send,
        [Status.Ongoing]: IconType.rapportage,
        [Status.Finished]: IconType.checkmark,
    }

    return (
        <LabelTag
            {...props}
            className={className}
            icon={statusIcons[status as Status]}
            label={roleTranslations[status as Status] || '[STATUS DOES NOT EXIST]'}
            color={colorConfig[status as Status] || LabelColor.red}
        />
    )
}

export default ReferenceStatusLabel
