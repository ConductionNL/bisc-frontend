import React from 'react'
import classNames from 'classnames'

import styles from './LabelTag.module.scss'
import Paragraph from '../../Typography/Paragraph'
import capitalize from 'lodash/capitalize'
import { LabelColor } from './types'
import { IconType } from 'components/Core/Icon/IconType'
import Icon from 'components/Core/Icon/Icon'
export interface Props {
    label: string
    color?: LabelColor // defaults to blue
    icon?: IconType
    className?: string
}

const LabelTag: React.FunctionComponent<Props> = props => {
    const { color = LabelColor.blue, className, label, icon } = props

    const labelClassName = classNames(styles.container, className, {
        [styles[`is${capitalize(color)}`]]: color,
        [styles.hasIcon]: icon,
    })

    return (
        <span className={labelClassName}>
            {icon && <Icon className={styles.icon} type={icon} />}
            <Paragraph small={true} bold={true} className={classNames(styles.text)}>
                {label}
            </Paragraph>
        </span>
    )
}

export default LabelTag
