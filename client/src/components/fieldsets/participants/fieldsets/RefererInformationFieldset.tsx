import React, { useEffect, useState } from 'react'
import { t } from '@lingui/macro'
import { useLingui } from '@lingui/react'
import classNames from 'classnames'

import { EmailValidators } from 'utils/validators/EmailValidators'
import Input from 'components/Core/DataEntry/Input'
import Select, { OptionsType } from 'components/Core/DataEntry/Select'
import Field from 'components/Core/Field/Field'
import Section from 'components/Core/Field/Section'
import Column from 'components/Core/Layout/Column/Column'
import styles from './RefererInformationFieldset.module.scss'
import Paragraph from 'components/Core/Typography/Paragraph'
import { GenericValidators } from 'utils/validators/GenericValidators'
import { studentReferringOrganizationEnumTranslations } from 'components/Domain/Participation/translations/translations'
import { Maybe, IntakeReferringOrganization } from 'api/types/types'

interface Props {
    prefillData?: RefererInformationPrefillData
    readOnly?: boolean
    className?: string
}

export interface RefererInformationFieldsetModel extends RefererInformationPrefillData {}

export interface RefererInformationPrefillData {
    'intake.referringOrganization'?: Maybe<IntakeReferringOrganization>
    'intake.referringOrganizationOther'?: Maybe<string>
    'intake.referringOrganizationEmail'?: Maybe<string>
}

export const RefererInformationFieldset: React.FunctionComponent<Props> = props => {
    const { prefillData, readOnly, className } = props
    const { i18n } = useLingui()
    const [referringOrganization, setreferringOrganization] = useState<IntakeReferringOrganization | undefined>(
        undefined
    )
    const containerClassName = classNames(styles, className)
    const options = getStudentReferringOrganizationEnumOptions()

    useEffect(() => {
        setreferringOrganization(prefillData?.['intake.referringOrganization'] ?? undefined)
    }, [prefillData?.['intake.referringOrganization']])

    if (readOnly) {
        return (
            <Section className={containerClassName} title={i18n._(t`Verwijzer`)}>
                <Column spacing={4}>
                    <Field label={i18n._(t`Verwijzende instantie`)} horizontal={true}>
                        <Paragraph className={styles.paragraph}>
                            {
                                options.find(option => option.value === prefillData?.['intake.referringOrganization'])
                                    ?.label
                            }
                        </Paragraph>
                        {prefillData?.['intake.referringOrganization'] === IntakeReferringOrganization.Other && (
                            <Paragraph italic={true}>{prefillData?.['intake.referringOrganizationOther']}</Paragraph>
                        )}
                    </Field>

                    <Field label={i18n._(t`E-mailadres verwijzer`)} horizontal={true}>
                        <Paragraph className={styles.paragraph}>
                            {prefillData?.['intake.referringOrganizationEmail']}
                        </Paragraph>
                    </Field>
                </Column>
            </Section>
        )
    }

    return (
        <Section title={i18n._(t`Verwijzer`)}>
            <Column spacing={4}>
                <Field label={i18n._(t`Aanmeldende instantie`)} horizontal={true}>
                    <Select
                        onChangeValue={value => setreferringOrganization(value as IntakeReferringOrganization)}
                        list="intake.referringOrganization"
                        name="intake.referringOrganization"
                        placeholder={i18n._(t`Selecteer verwijzer`)}
                        options={options}
                        defaultValue={prefillData?.['intake.referringOrganization'] ?? undefined}
                        validators={[value => GenericValidators.selectedOptionFromOptions(value, options)]}
                    />
                </Field>
                {referringOrganization === IntakeReferringOrganization.Other && (
                    <Field label={i18n._(t`Verwijzer anders`)} horizontal={true}>
                        <Input
                            name="intake.referringOrganizationOther"
                            placeholder={i18n._(t`Anders`)}
                            defaultValue={prefillData?.['intake.referringOrganizationOther'] ?? undefined}
                            validators={[GenericValidators.required]}
                        />
                    </Field>
                )}
                <Field label={i18n._(t`E-mailadres verwijzer`)} horizontal={true}>
                    <Input
                        name="intake.referringOrganizationEmail"
                        placeholder={i18n._(t`instantie@email.nl`)}
                        defaultValue={prefillData?.['intake.referringOrganizationEmail'] ?? undefined}
                        validators={[EmailValidators.isEmailAddress]}
                    />
                </Field>
            </Column>
        </Section>
    )

    function getStudentReferringOrganizationEnumOptions(): OptionsType[] {
        return Object.values(IntakeReferringOrganization).map(value => ({
            label: studentReferringOrganizationEnumTranslations[value] ?? 'TRANSLATION MISSING',
            value: value,
        }))
    }
}
