import { t } from '@lingui/macro'
import { useLingui } from '@lingui/react'
import classNames from 'classnames'
import Availabillity, { AvailabillityType } from 'components/Core/Availabillity/Availabillity'
import Field from 'components/Core/Field/Field'
import Paragraph from 'components/Core/Typography/Paragraph'
import React from 'react'
import styles from './AvailabillityCompare.module.scss'

interface Props {
    className?: string
    userA: User
    userB: User
}

interface User {
    availabillity?: AvailabillityType | null
    name?: string
    roles?: string[] | null
    note?: string | null
}

export const AvailabillityCompare: React.FunctionComponent<Props> = props => {
    const { i18n } = useLingui()
    const { className, userA, userB } = props
    const containerClassNames = classNames(styles.container, className)

    return (
        <div className={containerClassNames}>
            {renderAvailabillity(userA, userB)}
            {renderAvailabillity(userB, userA)}
        </div>
    )

    function renderAvailabillity(user: User, compareUser: User) {
        return (
            <div className={styles.section}>
                {user.roles?.map((role, index, array) => (
                    <p key={`${index}-${array.length}`} className={styles.roleLabel}>
                        {role}
                    </p>
                ))}
                <p className={styles.label}>{user.name ?? i18n._(t`Naam onbekend`)}</p>
                <Availabillity
                    readOnly={true}
                    defaultValue={user.availabillity ?? undefined}
                    compareValue={compareUser.availabillity ?? undefined}
                />
                <Field className={styles.notes} label={i18n._(t`Notities`)} horizontal={true}>
                    <Paragraph>{user.note}</Paragraph>
                </Field>
            </div>
        )
    }
}
