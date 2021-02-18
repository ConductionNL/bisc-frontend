import classNames from 'classnames'
import React from 'react'
import Field from './Field'
import Password from '../DataEntry/Password'
import PasswordStrengthBar from '../Feedback/PasswordStrengthBar/PasswordStrengthBar'
import SectionTitle from '../Text/SectionTitle'
import styles from './Section.module.scss'
import Column from '../Layout/Column/Column'
import Space from '../Layout/Space/Space'

interface Props {
    title: string
    className?: string
}

const Section: React.FunctionComponent<Props> = props => {
    const { children, className } = props

    const containerClassNames = classNames(styles.container, className)

    return (
        <div className={containerClassNames}>
            <div className={styles.titleContainer}>
                <SectionTitle title="Wachtwoord aanpassen" heading="H4" />
            </div>

            <div className={styles.formContainer}>{children}</div>
        </div>
    )
}

export default Section
