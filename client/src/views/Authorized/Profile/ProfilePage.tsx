import React, { useState } from 'react'
import classNames from 'classnames'

import styles from './ProfilePage.module.scss'
import PageTitle, { PageTitleSize } from '../../../components/Core/Text/PageTitle'
import SectionTitle from '../../../components/Core/Text/SectionTitle'
import Field from '../../../components/Core/Field/Field'
import Password from '../../../components/Core/DataEntry/Password'
import PasswordStrengthBar from '../../../components/Core/Feedback/PasswordStrengthBar/PasswordStrengthBar'
import AuthorizedContentLayout from '../../../components/Core/PageLayout/AuthorizedContentLayout'
import { NotificationsManager } from '../../../components/Core/Feedback/Notifications/NotificationsManager'
import Button, { ButtonType } from '../../../components/Core/Button/Button'

interface Props {
    className?: string
    NavigationComponent: JSX.Element
}

const ProfilePage: React.FunctionComponent<Props> = ({ NavigationComponent, className }) => {
    const containerClassName = classNames(styles.container, className)
    const [password, setPassword] = useState<string>()

    return (
        <AuthorizedContentLayout NavigationComponent={NavigationComponent}>
            <div className={containerClassName}>
                <div className={styles.formInputContainer}>
                    <PageTitle title={'Daniella de Wit'} size={PageTitleSize.default} />
                    <div className={styles.passwordContainer}>
                        <div className={styles.titleContainer}>
                            <SectionTitle title="Wachtwoord aanpassen" heading="H4" />
                        </div>

                        <div className={styles.formContainer}>
                            <div className={styles.FieldContainer}>
                                <Field label={'Huidig wachtwoord'}>
                                    <Password placeholder={'Wachtwoord'} onChange={undefined} />
                                </Field>
                            </div>
                            <div className={styles.FieldContainer}>
                                <Field label={'Nieuw wachtwoord'}>
                                    <Password placeholder={'Wachtwoord'} onChange={value => setPassword(value)} />
                                </Field>
                            </div>
                            <div className={styles.FieldContainer}>
                                <PasswordStrengthBar value={password} />
                            </div>
                            <div className={styles.FieldContainer}>
                                <Field label={'Bevestig wachtwoord'}>
                                    <Password placeholder={'Wachtwoord'} onChange={undefined} />
                                </Field>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={styles.buttonContainer}>
                    <Button type={ButtonType.primary} onClick={() => NotificationsManager.success('title', 'test')}>
                        Wachtwoord wijzigen
                    </Button>
                </div>
            </div>
        </AuthorizedContentLayout>
    )
}

export default ProfilePage
