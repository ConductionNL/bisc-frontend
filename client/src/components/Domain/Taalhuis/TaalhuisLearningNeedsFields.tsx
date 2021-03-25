import { useLingui } from '@lingui/react'
import HorizontalRule from 'components/Core/HorizontalRule/HorizontalRule'
import Column from 'components/Core/Layout/Column/Column'
import React from 'react'

interface Props {}

export const TaalhuisParticipantLearningNeedsFields: React.FC<Props> = ({}) => {
    const { i18n } = useLingui()

    return (
        <Column>
            <HorizontalRule />
        </Column>
    )
}
