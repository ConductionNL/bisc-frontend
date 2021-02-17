import React, { useState } from 'react'
import classNames from 'classnames'

import styles from './ProfilePage.module.scss'
import Icon from '../../components/Core/Icon/Icon'
import { IconType } from '../../components/Core/Icon/IconType'
import PageTitle, { PageTitleSize } from '../../components/Core/Text/PageTitle'
import SectionTitle from '../../components/Core/Text/SectionTitle'
import FormField from '../../components/Core/DataEntry/FormField'
import Password from '../../components/Core/DataEntry/Password'
import Notification from '../../components/Core/Feedback/Notifications/Notification'
import { NotificationType } from '../../components/Core/Feedback/Notifications/types'
import PasswordStrengthBar from '../../components/Core/Feedback/PasswordStrengthBar/PasswordStrengthBar'
import Button, { ButtonType } from '../../components/Core/Button/Button'
import AuthorizedContentLayout from '../../components/Core/PageLayout/AuthorizedContentLayout'

interface Props {
    className?: string
    NavigationComponent: JSX.Element
}

const ProfilePage: React.FunctionComponent<Props> = ({ NavigationComponent, className }) => {
    const containerClassName = classNames(styles.container, className)
    const [password, setPassword] = useState<string>()

    return (
        <AuthorizedContentLayout NavigationComponent={NavigationComponent}>
            <div className={styles.formInputContainer}>
                <PageTitle title={'Test'} size={PageTitleSize.large} className={styles.greeting} />
                <div className={styles.passwordContainer}>
                    <SectionTitle title="Wachtwoord aanpassen" heading="H4" />

                    <div className={styles.formContainer}>
                        <div className={styles.formFieldContainer}>
                            <FormField label={'Huidig wachtwoord'}>
                                <Password placeholder={'Wachtwoord'} onChange={undefined} />
                            </FormField>
                        </div>
                        <div className={styles.formFieldContainer}>
                            <FormField label={'Nieuw wachtwoord'}>
                                <Password placeholder={'Wachtwoord'} onChange={value => setPassword(value)} />
                            </FormField>
                        </div>
                        <div className={styles.formFieldContainer}>
                            <PasswordStrengthBar value={password} />
                        </div>
                        <div className={styles.formFieldContainer}>
                            <FormField label={'Bevestig wachtwoord'}>
                                <Password placeholder={'Wachtwoord'} onChange={undefined} />
                            </FormField>
                        </div>
                    </div>
                </div>
            </div>
            <div className={styles.notification}>
                <Notification title="test" message="test" type={NotificationType.success} />
            </div>
            <div className={styles.buttonContainer}>
                <Button type={ButtonType.primary}>Wachtwoord wijzigen</Button>
            </div>
        </AuthorizedContentLayout>
    )
}

export default ProfilePage
