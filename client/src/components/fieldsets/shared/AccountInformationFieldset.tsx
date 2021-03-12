import { t } from '@lingui/macro'
import { useLingui } from '@lingui/react'
import isEqual from 'lodash/isEqual'
import React from 'react'
import { EmailValidators } from '../../../utils/validators/EmailValidators'
import { GenericValidators } from '../../../utils/validators/GenericValidators'
import LabelTag from '../../Core/DataDisplay/LabelTag/LabelTag'
import { LabelColor } from '../../Core/DataDisplay/LabelTag/types'
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
    role?: Roles[]
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
                            {prefillData?.role?.map(role => (
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
                    defaultChecked={isEqual(prefillData?.role, [Roles.coordinator, Roles.mentor])}
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
                        required={true}
                        validators={[GenericValidators.required, EmailValidators.isEmailAddress]}
                    />
                </Field>
                <Field label={i18n._(t`Rol`)} horizontal={true} required={true}>
                    <Column spacing={3}>
                        <Row>
                            <RadioButton
                                name={'role'}
                                value={[Roles.coordinator]}
                                defaultChecked={isEqual(prefillData?.role, [Roles.coordinator])}
                            />
                            <LabelTag color={colorConfig[Roles.coordinator]} label={i18n._(t`Coördinator`)} />
                        </Row>
                        <Row>
                            <RadioButton
                                name={'role'}
                                value={[Roles.mentor]}
                                defaultChecked={isEqual(prefillData?.role, [Roles.mentor])}
                            />
                            <LabelTag color={colorConfig[Roles.mentor]} label={i18n._(t`Begeleider`)} />
                        </Row>
                        <Row>
                            <RadioButton
                                name={'role'}
                                value={[Roles.coordinator, Roles.mentor]}
                                defaultChecked={isEqual(prefillData?.role, [Roles.coordinator, Roles.mentor])}
                            />
                            <Row spacing={1}>
                                <LabelTag color={colorConfig[Roles.coordinator]} label={i18n._(t`Coördinator`)} />
                                <LabelTag color={colorConfig[Roles.mentor]} label={i18n._(t`Begeleider`)} />
                            </Row>
                        </Row>
                        <Row>
                            <RadioButton
                                name={'role'}
                                value={[Roles.volunteer]}
                                defaultChecked={isEqual(prefillData?.role, [Roles.volunteer])}
                            />
                            <LabelTag color={colorConfig[Roles.volunteer]} label={i18n._(t`Vrijwilliger`)} />
                        </Row>
                    </Column>
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
