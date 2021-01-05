import React from 'react'

import './Icon.module.scss'
import { IconTpye } from './IconType'
import icons from './icons.json'

interface Props {
    type: IconTpye
    className?: string
    onClick?: () => void
}

const Icon: React.FunctionComponent<Props> = props => {
    const { type, className, onClick } = props

    return (
        <i
            className={className}
            dangerouslySetInnerHTML={{ __html: icons[type] }}
            onClick={() => onClick && onClick()}
        />
    )
}

export default Icon
