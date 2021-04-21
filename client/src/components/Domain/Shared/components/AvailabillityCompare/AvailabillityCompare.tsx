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
    availabillityA: AvailabillityType
    availabillityB: AvailabillityType
}

export const AvailabillityCompare: React.FunctionComponent<Props> = props => {
    const { i18n } = useLingui()
    const { className, availabillityA, availabillityB } = props
    const containerClassNames = classNames(styles.container, className)

    return (
        <div className={containerClassNames}>
            {renderAvailabillity(availabillityA, availabillityB)}
            {renderAvailabillity(availabillityB, availabillityA)}
        </div>
    )

    function renderAvailabillity(availabillity: AvailabillityType, compareAvailabillity: AvailabillityType) {
        const role = 'BEGELEIDER'
        const name = 'Nahia Colunga'
        const note = 'note'

        return (
            <div className={styles.section}>
                <p className={styles.roleLabel}>{role}</p>
                <p className={styles.label}>{name}</p>
                <Availabillity readOnly={true} defaultValue={availabillity} compareValue={compareAvailabillity} />
                <Field className={styles.notes} label={i18n._(t`Notities`)} horizontal={true}>
                    <Paragraph>{note}</Paragraph>
                </Field>
            </div>
        )
    }
}
