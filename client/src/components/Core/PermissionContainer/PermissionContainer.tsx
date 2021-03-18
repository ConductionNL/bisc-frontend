import { i18n } from '@lingui/core'
import { t } from '@lingui/macro'
import classNames from 'classnames'
import React, { useState } from 'react'
import Checkbox, { CheckboxColor } from '../DataEntry/Checkbox'
import Icon from '../Icon/Icon'
import { IconType } from '../Icon/IconType'
import Paragraph from '../Typography/Paragraph'
import styles from './permissionContainer.module.scss'

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
    readOnly?: boolean
}

export const PermissionContainer: React.FC<Props> = ({
    name,
    text,
    fontWeight,
    checkboxColor,
    className,
    readOnly,
}) => {
    const [checked, setChecked] = useState(false)
    const containerClassNames = classNames(styles.container, className, {
        [styles.grey]: !checked,
        [styles.green]: checked,
    })

    return renderPermissionContainer()

    function renderPermissionContainer() {
        if (readOnly) {
            if (checked) {
                return (
                    <div className={containerClassNames}>
                        <div className={styles.iconContainer}>
                            <Icon className={styles.checkmark} type={IconType.checkmark} />
                        </div>
                        <Paragraph className={styles[`fontweight-${fontWeight}`]}>{i18n._(t`${text}`)}</Paragraph>
                    </div>
                )
            }

            return (
                <div className={containerClassNames}>
                    <div className={styles.iconContainer}>
                        <Icon className={styles.checkmark} type={IconType.checkmark} />
                    </div>
                    <Paragraph className={styles[`fontweight-${fontWeight}`]}>{i18n._(t`${text}`)}</Paragraph>
                </div>
            )
        }

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
}
