import { t } from '@lingui/macro'
import { useLingui } from '@lingui/react'
import React from 'react'
import { AdressValidators } from '../../../utils/validators/AddressValidators'
import { GenericValidators } from '../../../utils/validators/GenericValidators'
import Input from '../../Core/DataEntry/Input'
import StreetNumberAdditionField from '../../Core/DataEntry/StreetNumberAdditionField'
import Field from '../../Core/Field/Field'
import Section from '../../Core/Field/Section'
import Column from '../../Core/Layout/Column/Column'

interface Props {
    prefillData?: BranchInformationFieldsetModel
    readOnly?: true
}

export interface BranchInformationFieldsetModel {
    nameTaalhuis: string
    street?: string
    streetNo?: number | string
    streetNoAddition?: string
    postcode: string
    city?: string
}

const BranchInformationFieldset: React.FunctionComponent<Props> = props => {
    const { prefillData, readOnly } = props
    const { i18n } = useLingui()

    if (readOnly) {
        return (
            <Section title={i18n._(t`Vestiging`)}>
                <Column spacing={4}>
                    <Field label={i18n._(t`Naam taalhuis`)} horizontal={true}>
                        <p>{prefillData?.nameTaalhuis}</p>
                    </Field>

                    <Field label={i18n._(t`Straat en huisnr.`)} horizontal={true}>
                        <p>{`${prefillData?.street} ${prefillData?.streetNo} ${
                            prefillData?.streetNoAddition ? prefillData?.streetNoAddition : ''
                        }`}</p>
                    </Field>

                    <Field label={i18n._(t`Postcode`)} horizontal={true}>
                        <p>{prefillData?.postcode}</p>
                    </Field>

                    <Field label={i18n._(t`Plaats`)} horizontal={true}>
                        <p>{prefillData?.city}</p>
                    </Field>
                </Column>
            </Section>
        )
    }

    return (
        <Section title={i18n._(t`Vestiging`)}>
            <Column spacing={4}>
                <Field label={i18n._(t`Naam taalhuis`)} horizontal={true} required={true}>
                    <Input
                        name="nameTaalhuis"
                        placeholder={i18n._(t`Naam taalhuis`)}
                        validators={[GenericValidators.required]}
                        defaultValue={prefillData?.nameTaalhuis}
                    />
                </Field>

                <Field label={i18n._(t`Straat en huisnr.`)} horizontal={true}>
                    <StreetNumberAdditionField
                        prefillData={{
                            street: prefillData?.street,
                            streetNr: prefillData?.streetNo,
                            addition: prefillData?.streetNoAddition,
                        }}
                    />
                </Field>

                <Field label={i18n._(t`Postcode`)} horizontal={true}>
                    <Input
                        name="postcode"
                        placeholder={i18n._(t`Postcode`)}
                        validators={[AdressValidators.isValidZipcode]}
                        defaultValue={prefillData?.postcode}
                    />
                </Field>

                <Field label={i18n._(t`Plaats`)} horizontal={true}>
                    <Input name="city" placeholder={i18n._(t`Plaats`)} defaultValue={prefillData?.city} />
                </Field>
            </Column>
        </Section>
    )
}

export default BranchInformationFieldset
