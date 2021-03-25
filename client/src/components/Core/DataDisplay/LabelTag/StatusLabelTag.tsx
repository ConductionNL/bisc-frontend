import { IconType } from 'components/Core/Icon/IconType'
import capitalize from 'lodash/capitalize'
import React from 'react'
import LabelTag from './LabelTag'
import { LabelColor } from './types'

export enum StatusTypes {
    afgerond = 'afgerond',
    verwezen = 'verwezen',
    lopend = 'lopend',
}

interface Props {
    label: StatusTypes
}

export const StatusLabelTag: React.FC<Props> = ({ label }) => {
    return <LabelTag label={capitalize(label)} icon={getIcon()} color={getColor()} />

    function getIcon() {
        let icon
        switch (label) {
            case (label = StatusTypes.afgerond):
                icon = IconType.checkmark
                break
            case (label = StatusTypes.lopend):
                icon = IconType.stripe
                break
            case (label = StatusTypes.verwezen):
                icon = IconType.send
                break
        }

        return icon
    }

    function getColor() {
        let color
        switch (label) {
            case (label = StatusTypes.afgerond):
                color = LabelColor.green
                break
            case (label = StatusTypes.lopend):
                color = LabelColor.red
                break
            case (label = StatusTypes.verwezen):
                color = LabelColor.blue
                break
        }

        return color
    }
}
