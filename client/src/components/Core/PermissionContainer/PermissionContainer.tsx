import { t } from '@lingui/macro'
import { useLingui } from '@lingui/react'
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
    checked?: boolean
}

export const PermissionContainer: React.FC<Props> = props => {
    const { i18n } = useLingui()
    const { name, text, fontWeight, checkboxColor, className, readOnly, checked = false } = props
    const [isChecked, setIsChecked] = useState(checked)
    const containerClassNames = classNames(styles.container, className, {
        [styles.grey]: !isChecked,
        [styles.green]: isChecked,
    })

    return renderPermissionContainer()

    function renderPermissionContainer() {
        if (readOnly) {
            if (isChecked) {
                return (
                    <div className={containerClassNames}>
                        <div className={classNames(styles.iconContainer, styles.checked)}>
                            <Icon className={styles.icon} type={IconType.checkmark} />
                        </div>
                        <Paragraph className={styles[`fontweight-${fontWeight}`]}>{i18n._(t`${text}`)}</Paragraph>
                    </div>
                )
            }

            return (
                <div className={containerClassNames}>
                    <div className={styles.iconContainer}>
                        <Icon className={styles.icon} type={IconType.close} />
                    </div>

                    <Paragraph className={styles[`fontweight-${fontWeight}`]}>{i18n._(t`${text}`)}</Paragraph>
                </div>
            )
        }

        return (
            <div className={containerClassNames}>
                <div className={styles.checkboxContainer}>
                    <Checkbox
                        color={checkboxColor}
                        name={name}
                        checked={isChecked}
                        onChange={() => setIsChecked(!isChecked)}
                    />
                </div>
                <Paragraph className={styles[`fontweight-${fontWeight}`]}>{i18n._(t`${text}`)}</Paragraph>
            </div>
        )
    }
}
