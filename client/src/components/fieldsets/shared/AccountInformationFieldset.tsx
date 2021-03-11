import { t } from '@lingui/macro'
import { useLingui } from '@lingui/react'
import isEqual from 'lodash/isEqual'
import React from 'react'
import { EmailValidators } from '../../../utils/validators/EmailValidators'
import { GenericValidators } from '../../../utils/validators/GenericValidators'
import LabelTag, { LabelColor } from '../../Core/DataDisplay/LabelTag/LabelTag'
import Input from '../../Core/DataEntry/Input'
import RadioButton from '../../Core/DataEntry/RadioButton'
import Field from '../../Core/Field/Field'
import Section from '../../Core/Field/Section'
import Column from '../../Core/Layout/Column/Column'
import Row from '../../Core/Layout/Row/Row'
import Paragraph from '../../Core/Typography/Paragraph'

interface Props {
    prefillData?: AccountInformationFieldsetModel
    readOnly?: boolean
    roleOptions?: Roles[][]
}

export interface AccountInformationFieldsetModel {
    email?: string
    roles?: Roles[]
    createdAt?: string
    updatedAt?: string
}

export enum Roles {
    coordinator = 'coordinator',
    mentor = 'mentor',
    volunteer = 'volunteer',
    coworker = 'coworker',
}

const AccountInformationFieldset: React.FunctionComponent<Props> = props => {
    const { prefillData, readOnly, roleOptions } = props
    const { i18n } = useLingui()
    const colorConfig = {
        [Roles.coordinator]: LabelColor.red,
        [Roles.mentor]: LabelColor.purple,
        [Roles.volunteer]: LabelColor.yellow,
        [Roles.coworker]: LabelColor.blue,
    }
    const roleTranslations = {
        [Roles.coordinator]: i18n._(t`Coördinator`),
        [Roles.mentor]: i18n._(t`Begeleider`),
        [Roles.volunteer]: i18n._(t`Vrijwilliger`),
        [Roles.coworker]: i18n._(t`Medewerker`),
    }

    if (readOnly) {
        return (
            <Section title={i18n._(t`Accountgegevens`)}>
                <Column spacing={6}>
                    <Field label={i18n._(t`Email`)} horizontal={true}>
                        <Paragraph>{prefillData?.email}</Paragraph>
                    </Field>
                    <Field label={i18n._(t`Rol`)} horizontal={true}>
                        <Row spacing={1}>
                            {prefillData?.roles?.map(role => (
                                <LabelTag label={role} color={colorConfig[role]} />
                            ))}
                        </Row>
                    </Field>
                    {prefillData?.createdAt && (
                        <Field label={'Aangemaakt'} horizontal={true}>
                            <Paragraph>{prefillData?.createdAt}</Paragraph>
                        </Field>
                    )}
                    {prefillData?.createdAt && (
                        <Field label={'Bewerkt'} horizontal={true}>
                            <Paragraph>{i18n._(t`${prefillData?.updatedAt}`)}</Paragraph>
                        </Field>
                    )}
                </Column>
            </Section>
        )
    }

    const renderRoleOptions = (item: Roles[]) => {
        return (
            <Row>
                <RadioButton
                    name={'role'}
                    value={[Roles.coordinator, Roles.mentor]}
                    defaultChecked={isEqual(prefillData?.roles, [Roles.coordinator, Roles.mentor])}
                />
                <Row spacing={1}>
                    {item.map(role => (
                        <LabelTag color={colorConfig[role]} label={roleTranslations[role]} />
                    ))}
                </Row>
            </Row>
        )
    }

    return (
        <Section title={i18n._(t`Accountgegevens`)}>
            <Column spacing={6}>
                <Field label={i18n._(t`Email`)} horizontal={true} required={true}>
                    <Input
                        name="email"
                        placeholder={i18n._(t`naam@aanbieder.nl`)}
                        defaultValue={prefillData?.email}
                        validators={[GenericValidators.required, EmailValidators.isEmailAddress]}
                    />
                </Field>
                {roleOptions && (
                    <Field label={i18n._(t`Rol`)} horizontal={true}>
                        <Column spacing={3}>{roleOptions.map(renderRoleOptions)}</Column>
                    </Field>
                )}
            </Column>
        </Section>
    )
}

export default AccountInformationFieldset
