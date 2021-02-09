import classNames from 'classnames'
import React from 'react'
import Icon from '../Icon/Icon'
import { IconType } from '../Icon/IconType'
import styles from './Checkbox.module.scss'

export enum BackgroundColor {
    orange = 'orange',
    white = 'white',
}

interface Props {
    className?: string
    value?: string
    background: BackgroundColor
    checked?: boolean
    disabled?: boolean
}

const Checkbox: React.FunctionComponent<Props> = ({ disabled, checked, background }) => {
    return (
        <div className={classNames(styles.container, getBackgroundClass(background))}>
            <input className={styles.inputField} type="checkbox" disabled={disabled} checked={checked} />
            <Icon className={styles.checkmark} type={IconType.checkmark} />
        </div>
    )

    function getBackgroundClass(background: string) {
        const className = background === 'orange' ? styles.orangeBackground : styles.whiteBackground

        return className
    }
}

export default Checkbox
