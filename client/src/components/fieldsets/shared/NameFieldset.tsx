import { t } from '@lingui/macro'
import { useLingui } from '@lingui/react'
import React from 'react'
import { GenericValidators } from '../../../utils/validators/GenericValidators'
import { InsertionValidators } from '../../../utils/validators/InsertionValidator'
import Input from '../../Core/DataEntry/Input'
import Field from '../../Core/Field/Field'
import Section from '../../Core/Field/Section'
import Column from '../../Core/Layout/Column/Column'

interface Props {
    prefillData?: InformationFieldsetModel
    readOnly?: true
}

export interface InformationFieldsetModel {
    lastname?: string
    firstname?: string
    insertion?: string
}

const NameFieldset: React.FunctionComponent<Props> = props => {
    const { prefillData, readOnly } = props
    const { i18n } = useLingui()

    if (readOnly) {
        return (
            <Section title={i18n._(t`Gegevens`)}>
                <Column spacing={4}>
                    <Field label={i18n._(t`Voornaam`)} horizontal={true}>
                        <p>{prefillData?.firstname}</p>
                    </Field>

                    <Field label={i18n._(t`Tussenvoegsel`)} horizontal={true}>
                        <p>{prefillData?.insertion}</p>
                    </Field>

                    <Field label={i18n._(t`Achternaam`)} horizontal={true}>
                        <p>{prefillData?.lastname}</p>
                    </Field>
                </Column>
            </Section>
        )
    }

    return (
        <Section title={i18n._(t`Gegevens`)}>
            <Column spacing={4}>
                <Field label={i18n._(t`Voornaam`)} horizontal={true} required={true}>
                    <Input
                        required={true}
                        name="firstname"
                        placeholder={i18n._(t`Voornaam`)}
                        validators={[GenericValidators.required]}
                        defaultValue={prefillData?.firstname}
                    />
                </Field>

                <Field label={i18n._(t`Tussenvoegsel`)} horizontal={true}>
                    <Input
                        name="insertion"
                        placeholder={i18n._(t`Tussenvoegsel`)}
                        validators={[InsertionValidators.isValidInsertion]}
                        defaultValue={prefillData?.insertion}
                    />
                </Field>

                <Field label={i18n._(t`Achternaam`)} horizontal={true} required={true}>
                    <Input
                        name="lastname"
                        placeholder={i18n._(t`Achternaam`)}
                        validators={[GenericValidators.required]}
                        defaultValue={prefillData?.lastname}
                    />
                </Field>
            </Column>
        </Section>
    )
}

export default NameFieldset
