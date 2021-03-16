import { i18n } from '@lingui/core'
import { t } from '@lingui/macro'
import classNames from 'classnames'
import React from 'react'
import Checkbox from '../DataEntry/Checkbox'
import Paragraph from '../Typography/Paragraph'
import styles from './permissionCheckbox.module.scss'

export enum FontWeight {
    bold = 'bold',
    normal = 'normal',
}

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
    text: string
    fontWeight: FontWeight
}

export const PermissionCheckbox: React.FC<Props> = ({ name, text, fontWeight }) => {
    return (
        <div className={styles.container}>
            <Checkbox className={styles.checkboxContainer} name={name} />

            <Paragraph className={styles[`fontweight-${fontWeight}`]}>{i18n._(t`${text}`)}</Paragraph>
        </div>
    )
}
