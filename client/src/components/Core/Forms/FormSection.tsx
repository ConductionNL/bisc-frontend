import classNames from 'classnames'
import React from 'react'
import Field from '../Field/Field'
import Password from '../DataEntry/Password'
import PasswordStrengthBar from '../Feedback/PasswordStrengthBar/PasswordStrengthBar'
import SectionTitle from '../Text/SectionTitle'
import styles from './FormSection.module.scss'
import Column from '../Layout/Column/Column'
import Space from '../Layout/Space/Space'

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
                <Column spacing={4}>
                    <Field label={'Huidig wachtwoord'} horizontal={true}>
                        <Password placeholder={'Wachtwoord'} onChange={undefined} />
                    </Field>

                    <Field label={'Nieuw wachtwoord'} horizontal={true}>
                        <Column spacing={4}>
                            <Password placeholder={'Wachtwoord'} />
                            <PasswordStrengthBar value={'rrrrr'} />
                            <Space />
                        </Column>
                    </Field>

                    <Field label={'Bevestig wachtwoord'} horizontal={true}>
                        <Password placeholder={'Wachtwoord'} onChange={undefined} />
                    </Field>
                </Column>
            </div>
        </div>
    )
}

export default FormSection
