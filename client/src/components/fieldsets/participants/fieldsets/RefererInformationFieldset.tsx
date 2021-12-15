import React, { useEffect, useState } from 'react'
import { t } from '@lingui/macro'
import { useLingui } from '@lingui/react'
import classNames from 'classnames'

import Input from 'components/Core/DataEntry/Input'
import Field from 'components/Core/Field/Field'
import Section from 'components/Core/Field/Section'
import Column from 'components/Core/Layout/Column/Column'
import styles from './RefererInformationFieldset.module.scss'
import Paragraph from 'components/Core/Typography/Paragraph'
import { studentReferringOrganizationEnumTranslations } from 'components/Domain/Participation/translations/translations'
import { Maybe, IntakeReferringOrganization } from 'api/types/types'
import { DefaultSelectOption, Select } from 'components/Core/DataEntry/Select'

interface Props {
    prefillData?: RefererInformationPrefillData
    readOnly?: boolean
    className?: string
}

export interface RefererInformationFieldsetModel extends RefererInformationPrefillData {}

export interface RefererInformationPrefillData {
    'intake.referringOrganization'?: Maybe<IntakeReferringOrganization>
    'intake.referringOrganizationOther'?: Maybe<string>
    'intake.referringPerson.emails[0].email'?: Maybe<string>
}

export const RefererInformationFieldset: React.FunctionComponent<Props> = props => {
    const { prefillData, readOnly, className } = props
    const { i18n } = useLingui()
    const [referringOrganization, setReferringOrganization] = useState<IntakeReferringOrganization | undefined>(
        undefined
    )
    const containerClassName = classNames(styles, className)
    const referringOrganizationOptions = getStudentReferringOrganizationEnumOptions()
    const defaultReferringOrganization = prefillData?.['intake.referringOrganization']

    useEffect(() => {
        setReferringOrganization(prefillData?.['intake.referringOrganization'] ?? undefined)
    }, [prefillData?.['intake.referringOrganization']])

    if (readOnly) {
        return (
            <Section className={containerClassName} title={i18n._(t`Aanmelder`)}>
                <Column spacing={4}>
                    <Field label={i18n._(t`Aanmeldende instantie`)} horizontal={true}>
                        <Paragraph className={styles.paragraph}>
                            {
                                referringOrganizationOptions.find(
                                    option => option.value === prefillData?.['intake.referringOrganization']
                                )?.label
                            }
                        </Paragraph>
                        {prefillData?.['intake.referringOrganization'] === IntakeReferringOrganization.Other && (
                            <Paragraph italic={true}>{prefillData?.['intake.referringOrganizationOther']}</Paragraph>
                        )}
                    </Field>

                    <Field label={i18n._(t`E-mailadres aanmelder`)} horizontal={true}>
                        <Paragraph className={styles.paragraph}>
                            {prefillData?.['intake.referringPerson.emails[0].email']}
                        </Paragraph>
                    </Field>
                </Column>
            </Section>
        )
    }

    return (
        <Section title={i18n._(t`Aanmelder`)}>
            <Column spacing={4}>
                <Field label={i18n._(t`Aanmeldende instantie`)} horizontal={true}>
                    <Select
                        options={referringOrganizationOptions}
                        name="intake.referringOrganization"
                        defaultValue={
                            defaultReferringOrganization
                                ? {
                                      value: defaultReferringOrganization,
                                      label: studentReferringOrganizationEnumTranslations[defaultReferringOrganization],
                                  }
                                : undefined
                        }
                        onChangeValue={option => {
                            setReferringOrganization(option ? (option.value as IntakeReferringOrganization) : undefined)
                        }}
                        placeholder={i18n._(t`Selecteer aanmelder`)}
                    />
                </Field>
                {referringOrganization === IntakeReferringOrganization.Other && (
                    <Field label={i18n._(t`Aanmelder anders`)} horizontal={true}>
                        <Input
                            name="intake.referringOrganizationOther"
                            placeholder={i18n._(t`Anders`)}
                            defaultValue={prefillData?.['intake.referringOrganizationOther'] ?? undefined}
                        />
                    </Field>
                )}
                <Field label={i18n._(t`E-mailadres aanmelder`)} horizontal={true}>
                    <Input
                        name="intake.referringPerson.emails[0].email"
                        placeholder={i18n._(t`instantie@email.nl`)}
                        defaultValue={prefillData?.['intake.referringPerson.emails[0].email'] ?? undefined}
                    />
                </Field>
            </Column>
        </Section>
    )

    function getStudentReferringOrganizationEnumOptions(): DefaultSelectOption[] {
        return Object.values(IntakeReferringOrganization).map(value => ({
            label: studentReferringOrganizationEnumTranslations[value] ?? 'TRANSLATION MISSING',
            value: value,
        }))
    }
}
