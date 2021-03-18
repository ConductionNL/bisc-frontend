import { i18n } from '@lingui/core'
import { t } from '@lingui/macro'
import classNames from 'classnames'
import React, { useState } from 'react'
import Checkbox, { CheckboxColor } from '../DataEntry/Checkbox'
import Paragraph from '../Typography/Paragraph'
import styles from './permissionCheckboxContainer.module.scss'

export enum FontWeight {
    bold = 'bold',
    normal = 'normal',
}

export enum PermissionCheckboxBackgroundColor {
    grey = 'grey',
    green = 'green',
}

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
    text: string
    fontWeight: FontWeight
    className?: string
    checkboxColor?: CheckboxColor
    backgroundColor: PermissionCheckboxBackgroundColor
}

export const PermissionCheckboxContainer: React.FC<Props> = ({ name, text, fontWeight, checkboxColor, className }) => {
    const [checked, setChecked] = useState(false)
    const containerClassNames = classNames(styles.container, className, {
        [styles.grey]: !checked,
        [styles.green]: checked,
    })

    return (
        <div className={containerClassNames}>
            <Checkbox
                color={checkboxColor}
                className={styles.checkboxContainer}
                name={name}
                checked={checked}
                onChange={() => setChecked(!checked)}
            />
            <Paragraph className={styles[`fontweight-${fontWeight}`]}>{i18n._(t`${text}`)}</Paragraph>
        </div>
    )
}
