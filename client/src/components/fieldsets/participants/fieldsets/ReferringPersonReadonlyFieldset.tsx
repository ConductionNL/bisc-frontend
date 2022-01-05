import React from 'react'
import { t } from '@lingui/macro'
import { useLingui } from '@lingui/react'
import classNames from 'classnames'

import Field from 'components/Core/Field/Field'
import Section from 'components/Core/Field/Section'
import Column from 'components/Core/Layout/Column/Column'
import styles from './RefererInformationFieldset.module.scss'
import Paragraph from 'components/Core/Typography/Paragraph'
import { Maybe } from 'api/types/types'

import { NameFormatters } from 'utils/formatters/name/Name'

interface Props {
    prefillData?: ReferringPersonData
    className?: string
}

export interface ReferringPersonData {
    'intake.referringPerson.familyName'?: Maybe<string>
    'intake.referringPerson.additionalName'?: Maybe<string>
    'intake.referringPerson.givenName'?: Maybe<string>
    'intake.referringPerson.emails[0].email'?: Maybe<string>
    'intake.referringPerson.telephones[0].telephone'?: Maybe<string>
}

export const ReferringPersonReadonlyFieldset: React.FunctionComponent<Props> = props => {
    const { prefillData, className } = props
    const { i18n } = useLingui()
    const containerClassName = classNames(styles, className)

    return (
        <Section className={containerClassName} title={i18n._(t`Contactpersoon`)}>
            <Column spacing={4}>
                <Field label={i18n._(t`Naam`)} horizontal={true}>
                    <Paragraph>
                        {NameFormatters.formattedFullname({
                            givenName: prefillData?.['intake.referringPerson.givenName'] || undefined,
                            additionalName: prefillData?.['intake.referringPerson.additionalName'] || undefined,
                            familyName: prefillData?.['intake.referringPerson.familyName'] || undefined,
                        })}
                    </Paragraph>
                </Field>

                <Field label={i18n._(t`E-mailadres`)} horizontal={true}>
                    <Paragraph className={styles.paragraph}>
                        {prefillData?.['intake.referringPerson.emails[0].email']}
                    </Paragraph>
                </Field>

                <Field label={i18n._(t`Telefoonnummer`)} horizontal={true}>
                    <Paragraph className={styles.paragraph}>
                        {prefillData?.['intake.referringPerson.telephones[0].telephone']}
                    </Paragraph>
                </Field>
            </Column>
        </Section>
    )
}
