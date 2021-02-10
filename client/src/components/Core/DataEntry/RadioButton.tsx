import classNames from 'classnames'
import React from 'react'
import styles from './RadioButton.module.scss'

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

const RadioButton: React.FunctionComponent<Props> = ({ disabled, checked, background }) => {
    return (
        <div className={classNames(styles.container, getBackgroundClass(background))}>
            <input className={styles.inputField} type="radio" disabled={disabled} checked={checked} />
            <div className={styles.radio} />
        </div>
    )

    function getBackgroundClass(background: string) {
        const className = background === 'orange' ? styles.orangeBackground : styles.whiteBackground

        return className
    }
}

export default RadioButton
