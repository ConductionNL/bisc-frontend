import { t } from '@lingui/macro'
import { useLingui } from '@lingui/react'
import classNames from 'classnames'
import Availabillity from 'components/Core/Availabillity/Availabillity'
import Field from 'components/Core/Field/Field'
import Paragraph from 'components/Core/Typography/Paragraph'
import React from 'react'
import { ProviderEmployeeType } from 'generated/graphql'
import { NameFormatters } from 'utils/formatters/name/Name'
import { roleTranslations } from '../RoleLabelTag/constants'
import styles from './AvailabillityCompare.module.scss'

interface Props {
    className?: string
    UserA: ProviderEmployeeType
    UserB: ProviderEmployeeType
}

export const AvailabillityCompare: React.FunctionComponent<Props> = props => {
    const { i18n } = useLingui()
    const { className, UserA: availabillityA, UserB: availabillityB } = props
    const containerClassNames = classNames(styles.container, className)

    return (
        <div className={containerClassNames}>
            {renderAvailabillity(availabillityA, availabillityB)}
            {renderAvailabillity(availabillityB, availabillityA)}
        </div>
    )

    function renderAvailabillity(user: ProviderEmployeeType, compareUser: ProviderEmployeeType) {
        const name = NameFormatters.formattedFullname({
            givenName: user.givenName,
            additionalName: user.additionalName,
            familyName: user.familyName,
        })
        const note = user.availabilityNotes

        return (
            <div className={styles.section}>
                {user.userRoles.map(role => (
                    <p className={styles.roleLabel}>{roleTranslations[role.name]}</p>
                ))}
                <p className={styles.label}>{name}</p>
                <Availabillity
                    readOnly={true}
                    defaultValue={user.availability ?? undefined}
                    compareValue={compareUser.availability ?? undefined}
                />
                <Field className={styles.notes} label={i18n._(t`Notities`)} horizontal={true}>
                    <Paragraph>{note}</Paragraph>
                </Field>
            </div>
        )
    }
}
