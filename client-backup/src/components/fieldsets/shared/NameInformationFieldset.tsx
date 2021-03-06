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
    prefillData?: InformationFieldsetPrefillModel
    readOnly?: boolean
}

export interface InformationFieldsetModel {
    familyName: string
    firstname: string
    additionalName?: string
}

export interface InformationFieldsetPrefillModel {
    familyName: string
    firstname: string
    additionalName?: string | null
}

const NameInformationFieldset: React.FunctionComponent<Props> = props => {
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
                        <p>{prefillData?.additionalName}</p>
                    </Field>

                    <Field label={i18n._(t`Achternaam`)} horizontal={true}>
                        <p>{prefillData?.familyName}</p>
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
                        name="additionalName"
                        placeholder={i18n._(t`Tussenvoegsel`)}
                        validators={[InsertionValidators.isValidInsertion]}
                        defaultValue={prefillData?.additionalName ?? undefined}
                    />
                </Field>

                <Field label={i18n._(t`Achternaam`)} horizontal={true} required={true}>
                    <Input
                        name="familyName"
                        placeholder={i18n._(t`Achternaam`)}
                        validators={[GenericValidators.required]}
                        defaultValue={prefillData?.familyName}
                    />
                </Field>
            </Column>
        </Section>
    )
}

export default NameInformationFieldset
