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

import { DateFormatters } from 'utils/formatters/Date/Date'

interface Props {
    prefillData?: ReferringOrganizationData
    className?: string
}

export interface ReferringOrganizationData {
    '@dateCreated'?: Maybe<string>
    'intake.referringOrganizationOther'?: Maybe<string>
    'intake.referringPerson.team'?: Maybe<string>
}

export const ReferringOrganizationReadonlyFieldset: React.FunctionComponent<Props> = props => {
    const { prefillData, className } = props
    const { i18n } = useLingui()
    const containerClassName = classNames(styles, className)

    return (
        <Section className={containerClassName} title={i18n._(t`Organisatie`)}>
            <Column spacing={4}>
                <Field label={i18n._(t`Datum`)} horizontal={true}>
                    <Paragraph>
                        {prefillData?.['@dateCreated'] && DateFormatters.formattedDate(prefillData?.['@dateCreated'])}
                    </Paragraph>
                </Field>

                <Field label={i18n._(t`Aanmeldende organisatie`)} horizontal={true}>
                    <Paragraph>{prefillData?.['intake.referringOrganizationOther']}</Paragraph>
                </Field>

                <Field label={i18n._(t`Team`)} horizontal={true}>
                    <Paragraph className={styles.paragraph}>{prefillData?.['intake.referringPerson.team']}</Paragraph>
                </Field>
            </Column>
        </Section>
    )
}
