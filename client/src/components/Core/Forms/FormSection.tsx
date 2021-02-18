import classNames from 'classnames'
import React from 'react'
import Field from '../Field/Field'
import Password from '../DataEntry/Password'
import PasswordStrengthBar from '../Feedback/PasswordStrengthBar/PasswordStrengthBar'
import SectionTitle from '../Text/SectionTitle'
import styles from './FormSection.module.scss'

interface Props {
    title: string
    className?: string
}

const FormSection: React.FunctionComponent<Props> = props => {
    const { children, className } = props

    const containerClassNames = classNames(styles.container, className)

    return (
        <div className={containerClassNames}>
            <div className={styles.titleContainer}>
                <SectionTitle title="Wachtwoord aanpassen" heading="H4" />
            </div>

            <div className={styles.formContainer}>
                <div className={styles.FieldContainer}>
                    <Field label={'Huidig wachtwoord'} horizontal={true}>
                        <Password placeholder={'Wachtwoord'} onChange={undefined} />
                    </Field>
                </div>
                <div className={styles.FieldContainer}>
                    <Field label={'Nieuw wachtwoord'} horizontal={true}>
                        <Password placeholder={'Wachtwoord'} />
                        <PasswordStrengthBar value={'rrrrr'} />
                    </Field>
                </div>
                <div className={styles.FieldContainer}>
                    <Field label={'Bevestig wachtwoord'} horizontal={true}>
                        <Password placeholder={'Wachtwoord'} onChange={undefined} />
                    </Field>
                </div>
            </div>
        </div>
    )
}

export default FormSection
