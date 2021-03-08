import { t } from '@lingui/macro'
import { useLingui } from '@lingui/react'
import React from 'react'
import { GenericValidators } from '../../../utils/validators/GenericValidators'
import Input from '../../Core/DataEntry/Input'
import Field from '../../Core/Field/Field'
import Section from '../../Core/Field/Section'
import Column from '../../Core/Layout/Column/Column'

interface Props {
    prefillData?: BranchInformationFieldsetModel
    readOnly?: true
}

export interface BranchInformationFieldsetModel {
    nameTaalhuis: string
    street: string
    streetNo: number | string
    streetNoAddition?: string
    postcode: string
    city: string
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
                        required={true}
                        name="nameTaalhuis"
                        placeholder={i18n._(t`Naam taalhuis`)}
                        validators={[GenericValidators.required]}
                        defaultValue={prefillData?.nameTaalhuis}
                    />
                </Field>

                <Field label={i18n._(t`Straat en huisnr.`)} horizontal={true}>
                    <Input
                        name="street"
                        placeholder={i18n._(t`Straatnaam`)}
                        validators={[GenericValidators.required]}
                        defaultValue={prefillData?.street}
                    />
                    <Input
                        name="streetNr"
                        placeholder={i18n._(t`Nr.`)}
                        validators={[GenericValidators.required]}
                        defaultValue={prefillData?.streetNo}
                    />
                    <Input
                        name="addition"
                        placeholder={i18n._(t`A`)}
                        validators={[GenericValidators.required]}
                        defaultValue={prefillData?.streetNoAddition}
                    />
                </Field>

                <Field label={i18n._(t`Postcode`)} horizontal={true}>
                    <Input
                        name="postcode"
                        placeholder={i18n._(t`Postcode`)}
                        validators={[GenericValidators.required]}
                        defaultValue={prefillData?.postcode}
                    />
                </Field>

                <Field label={i18n._(t`Plaats`)} horizontal={true}>
                    <Input
                        name="city"
                        placeholder={i18n._(t`Plaats`)}
                        validators={[GenericValidators.required]}
                        defaultValue={prefillData?.city}
                    />
                </Field>
            </Column>
        </Section>
    )
}

export default BranchInformationFieldset
