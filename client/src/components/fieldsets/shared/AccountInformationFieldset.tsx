import { t } from '@lingui/macro'
import { useLingui } from '@lingui/react'
import isEqual from 'lodash/isEqual'
import React from 'react'
import LabelTag, { LabelColor } from '../../Core/DataDisplay/LabelTag/LabelTag'
import Input from '../../Core/DataEntry/Input'
import RadioButton from '../../Core/DataEntry/RadioButton'
import Field from '../../Core/Field/Field'
import Section from '../../Core/Field/Section'
import Column from '../../Core/Layout/Column/Column'
import Row from '../../Core/Layout/Row/Row'

interface Props {
    prefillData?: AccountInformationFieldsetModel
    readOnly?: boolean
}

export interface AccountInformationFieldsetModel {
    email: string
    roles: Roles[]
}

export enum Roles {
    coordinator = 'coordinator',
    mentor = 'mentor',
    volunteer = 'volunteer',
}

const AccountInformationFieldset: React.FunctionComponent<Props> = props => {
    const { prefillData, readOnly } = props
    const { i18n } = useLingui()
    const colorConfig = {
        [Roles.coordinator]: LabelColor.red,
        [Roles.mentor]: LabelColor.purple,
        [Roles.volunteer]: LabelColor.yellow,
    }

    if (readOnly) {
        return (
            <Section title={i18n._(t`Accountgegevens`)}>
                <Column spacing={6}>
                    <Field label={i18n._(t`Email`)} horizontal={true}>
                        <p>{prefillData?.email}</p>
                    </Field>
                    <Field label={i18n._(t`Rol`)} horizontal={true}>
                        <Row spacing={1}>
                            {prefillData?.roles.map(role => (
                                <LabelTag label={role} color={colorConfig[role]} />
                            ))}
                        </Row>
                    </Field>
                </Column>
            </Section>
        )
    }

    return (
        <Section title={i18n._(t`Accountgegevens`)}>
            <Column spacing={6}>
                <Field label={i18n._(t`Email`)} horizontal={true}>
                    <Input name="email" placeholder={i18n._(t`naam@aanbieder.nl`)} defaultValue={prefillData?.email} />
                </Field>
                <Field label={i18n._(t`Rol`)} horizontal={true}>
                    <Column spacing={3}>
                        <Row>
                            <RadioButton
                                name={'role'}
                                value={[Roles.coordinator]}
                                defaultChecked={isEqual(prefillData?.roles, [Roles.coordinator])}
                            />
                            <LabelTag color={colorConfig[Roles.coordinator]} label={i18n._(t`Coördinator`)} />
                        </Row>
                        <Row>
                            <RadioButton
                                name={'role'}
                                value={[Roles.mentor]}
                                defaultChecked={isEqual(prefillData?.roles, [Roles.mentor])}
                            />
                            <LabelTag color={colorConfig[Roles.mentor]} label={i18n._(t`Begeleider`)} />
                        </Row>
                        <Row>
                            <RadioButton
                                name={'role'}
                                value={[Roles.coordinator, Roles.mentor]}
                                defaultChecked={isEqual(prefillData?.roles, [Roles.coordinator, Roles.mentor])}
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
                                defaultChecked={isEqual(prefillData?.roles, [Roles.volunteer])}
                            />
                            <LabelTag color={colorConfig[Roles.volunteer]} label={i18n._(t`Vrijwilliger`)} />
                        </Row>
                    </Column>
                </Field>
            </Column>
        </Section>
    )
}

export default AccountInformationFieldset
