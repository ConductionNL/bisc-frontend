import { t } from '@lingui/macro'
import { useLingui } from '@lingui/react'
import { IconType } from 'components/Core/Icon/IconType'
import { ParticipationStatusEnum } from 'generated/graphql'
import React from 'react'
import LabelTag from '../../Core/DataDisplay/LabelTag/LabelTag'
import { LabelColor } from '../../Core/DataDisplay/LabelTag/types'

interface Props {
    status: ParticipationStatusEnum
}

export const ParticipationStatusLabelTag: React.FC<Props> = ({ status }) => {
    const { i18n } = useLingui()

    const statusTypesTranslations = {
        [ParticipationStatusEnum.Active]: i18n._(t`Lopend`),
        [ParticipationStatusEnum.Completed]: i18n._(t`Afgerond`),
        [ParticipationStatusEnum.Referred]: i18n._(t`Verwezen`),
    }

    const statusTypesIcons = {
        [ParticipationStatusEnum.Active]: IconType.stripe,
        [ParticipationStatusEnum.Completed]: IconType.checkmark,
        [ParticipationStatusEnum.Referred]: IconType.send,
    }

    const statusTypesColors = {
        [ParticipationStatusEnum.Active]: LabelColor.red,
        [ParticipationStatusEnum.Completed]: LabelColor.green,
        [ParticipationStatusEnum.Referred]: LabelColor.blue,
    }

    return (
        <LabelTag
            label={statusTypesTranslations[status]}
            icon={statusTypesIcons[status]}
            color={statusTypesColors[status]}
        />
    )
}
