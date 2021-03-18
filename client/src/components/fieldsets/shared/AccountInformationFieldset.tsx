import { t } from '@lingui/macro'
import { useLingui } from '@lingui/react'
import isEqual from 'lodash/isEqual'
import React from 'react'
import { DateFormatters } from '../../../utils/formatters/Date/Date'
import { EmailValidators } from '../../../utils/validators/EmailValidators'
import { GenericValidators } from '../../../utils/validators/GenericValidators'
import RoleLabelTag from '../../Core/DataDisplay/LabelTag/RoleLabelTag'
import Input from '../../Core/DataEntry/Input'
import RadioButton from '../../Core/DataEntry/RadioButton'
import ErrorBlock from '../../Core/Feedback/Error/ErrorBlock'
import Spinner, { Animation } from '../../Core/Feedback/Spinner/Spinner'
import Field from '../../Core/Field/Field'
import Section from '../../Core/Field/Section'
import Center from '../../Core/Layout/Center/Center'
import Column from '../../Core/Layout/Column/Column'
import Row from '../../Core/Layout/Row/Row'
import Paragraph from '../../Core/Typography/Paragraph'

interface Props {
    // TODO: prefill data now has typing from the FormModel type, but it's not
    prefillData?: AccountInformationFieldsetModel
    readOnly?: boolean
    roleOptions?: Role[][]
    rolesLoading?: boolean
    rolesError?: boolean
}

export interface AccountInformationFieldsetModel {
    email?: string
    role?: string
    createdAt?: string
    updatedAt?: string
}

interface Role {
    id: string
    name: string
}

const AccountInformationFieldset: React.FunctionComponent<Props> = props => {
    const { prefillData, readOnly, roleOptions, rolesLoading, rolesError } = props
    const { i18n } = useLingui()

    const renderRoleOptions = (roleOption: Role[], index: number, roleOptions: Role[][]) => {
        return (
            <Row key={`${index}-${roleOptions.length}`}>
                <RadioButton
                    required={true}
                    name={'role'}
                    value={roleOption.map(i => i.name)}
                    defaultChecked={isEqual(
                        prefillData?.role?.split(', '),
                        roleOption.map(i => i.name)
                    )}
                />
                <Row spacing={1}>
                    {roleOption.map((role, i, a) => (
                        <RoleLabelTag key={`${i}-${a.length}`} role={role.name} />
                    ))}
                </Row>
            </Row>
        )
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
                            {prefillData?.role?.split(',').map((role, i, a) => (
                                <RoleLabelTag key={`${i}-${a.length}`} role={role} />
                            ))}
                        </Row>
                    </Field>

                    {prefillData?.createdAt && (
                        <Field label={'Aangemaakt'} horizontal={true}>
                            <Paragraph>{DateFormatters.formattedDate(prefillData.createdAt)}</Paragraph>
                        </Field>
                    )}
                    {prefillData?.updatedAt && (
                        <Field label={'Bewerkt'} horizontal={true}>
                            <Paragraph>{DateFormatters.formattedDate(prefillData.updatedAt)}</Paragraph>
                        </Field>
                    )}
                </Column>
            </Section>
        )
    }

    return (
        <Section title={i18n._(t`Accountgegevens`)}>
            <Column spacing={6}>
                <Field label={i18n._(t`Email`)} horizontal={true} required={true}>
                    <Input
                        name="email"
                        placeholder={i18n._(t`john@doe.com`)}
                        defaultValue={prefillData?.email}
                        required={true}
                        validators={[GenericValidators.required, EmailValidators.isEmailAddress]}
                    />
                </Field>
                {renderRoleField()}
            </Column>
        </Section>
    )

    function renderRoleField() {
        if (rolesLoading) {
            return (
                <Center grow={true}>
                    <Spinner type={Animation.simpleSpinner} />
                </Center>
            )
        }

        if (rolesError) {
            return (
                <ErrorBlock
                    title={i18n._(t`Er ging iets fout`)}
                    message={i18n._(t`Wij konden de gegevens niet ophalen, probeer het opnieuw`)}
                />
            )
        }

        if (roleOptions) {
            return (
                <Field label={i18n._(t`Rol`)} horizontal={true}>
                    <Column spacing={3}>{roleOptions.map(renderRoleOptions)}</Column>
                </Field>
            )
        }
    }
}

export default AccountInformationFieldset
