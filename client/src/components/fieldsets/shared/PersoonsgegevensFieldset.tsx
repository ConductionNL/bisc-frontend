import { t } from '@lingui/macro'
import { useLingui } from '@lingui/react'
import React from 'react'
import { GenericValidators } from '../../../utils/validators/GenericValidators'
import { InsertionValidators } from '../../../utils/validators/InsertionValidator'
import { PhoneNumberValidators } from '../../../utils/validators/PhoneNumberValidator'
import Input from '../../Core/DataEntry/Input'
import Field from '../../Core/Field/Field'
import Section from '../../Core/Field/Section'
import Column from '../../Core/Layout/Column/Column'

interface Props {}

const PersoonsgegevensFieldset: React.FunctionComponent<Props> = () => {
    const { i18n } = useLingui()
    
    return (
        <Section title={i18n._(t`Gegevens`)}>
            <Column spacing={4}>
                <Field label={i18n._(t`Achternaam`)} horizontal={true} required={true}>
                    <Input
                        required={true}
                        name="lastname"
                        placeholder={i18n._(t`Wit`)}
                        validators={[GenericValidators.required]}
                    />
                </Field>

                <Field label={i18n._(t`Tussenvoegsel`)} horizontal={true}>
                    <Input
                        name="insertion"
                        placeholder={i18n._(t`de`)}
                        validators={[GenericValidators.required, InsertionValidators.isValidInsertion]}
                    />
                </Field>

                <Field label={i18n._(t`Roepnaam`)} horizontal={true}>
                    <Input
                        name="callSign"
                        placeholder={i18n._(t`Peter`)}
                        validators={[GenericValidators.required]}
                    />
                </Field>

                <Field label={i18n._(t`Telefoonnummer`)} horizontal={true}>
                    <Input
                        name="phonenumber"
                        placeholder={i18n._(t`06 - 85 26 72 80`)}
                        validators={[PhoneNumberValidators.isPhoneNumber]}
                    />
                </Field>
            </Column>
        </Section>
    )
}

export default PersoonsgegevensFieldset
