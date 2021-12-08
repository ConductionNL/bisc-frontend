import { t } from '@lingui/macro'
import { useLingui } from '@lingui/react'
import { ParticipationStatus } from 'api/types/types'
import { IconType } from 'components/Core/Icon/IconType'
import React from 'react'
import LabelTag from '../../Core/DataDisplay/LabelTag/LabelTag'
import { LabelColor } from '../../Core/DataDisplay/LabelTag/types'

interface Props {
    status: ParticipationStatus
}

export const ParticipationStatusLabelTag: React.FC<Props> = ({ status }) => {
    const { i18n } = useLingui()

    const statusTypesTranslations = {
        [ParticipationStatus.Ongoing]: i18n._(t`Lopend`),
        [ParticipationStatus.Finished]: i18n._(t`Afgerond`),
        [ParticipationStatus.Referred]: i18n._(t`Verwezen`),
    }

    const statusTypesIcons = {
        [ParticipationStatus.Ongoing]: IconType.stripe,
        [ParticipationStatus.Finished]: IconType.checkmark,
        [ParticipationStatus.Referred]: IconType.send,
    }

    const statusTypesColors = {
        [ParticipationStatus.Ongoing]: LabelColor.red,
        [ParticipationStatus.Finished]: LabelColor.green,
        [ParticipationStatus.Referred]: LabelColor.blue,
    }

    return (
        <LabelTag
            label={statusTypesTranslations[status]}
            icon={statusTypesIcons[status]}
            color={statusTypesColors[status]}
        />
    )
}
