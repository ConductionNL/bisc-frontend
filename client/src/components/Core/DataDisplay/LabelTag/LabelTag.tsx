import React from 'react'
import classNames from 'classnames'

import styles from './LabelTag.module.scss'
import Paragraph from '../../Typography/Paragraph'
import capitalize from 'lodash/capitalize'

interface Props {
    label: string
    color?: LabelColor // defaults to blue
    className?: string
}

export enum LabelColor {
    red = 'red',
    yellow = 'yellow',
    blue = 'blue',
    purple = 'purple',
}

const LabelTag: React.FunctionComponent<Props> = props => {
    const { color, className, label } = props

    const labelColor = color ? color : LabelColor.blue
    const labelClassName = classNames(styles.container, className, {
        [styles[`is${capitalize(labelColor)}`]]: labelColor,
    })

    return (
        <span className={labelClassName}>
            <Paragraph small={true} bold={true} className={classNames(styles.text)}>
                {label}
            </Paragraph>
        </span>
    )
}

export default LabelTag
