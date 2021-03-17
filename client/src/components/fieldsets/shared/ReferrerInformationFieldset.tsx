import { t } from '@lingui/macro'
import { useLingui } from '@lingui/react'
import React from 'react'
import Input from '../../Core/DataEntry/Input'
import Select from '../../Core/DataEntry/Select'
import Field from '../../Core/Field/Field'
import Section from '../../Core/Field/Section'
import Column from '../../Core/Layout/Column/Column'

interface Props {
    prefillData?: RefererInformationFieldsetModel
    readOnly?: true
}

export interface RefererInformationFieldsetModel {
    notifyingParty?: string
    referrerEmailAddress: string
}

const RefererInformationFieldset: React.FunctionComponent<Props> = props => {
    const { prefillData, readOnly } = props
    const { i18n } = useLingui()

    if (readOnly) {
        return (
            <Section title={i18n._(t`Verwijzer`)}>
                <Column spacing={4}>
                    <Field label={i18n._(t`Verwijzende instantie`)} horizontal={true}>
                        <p style={{ maxWidth: '279px' }}>{prefillData?.notifyingParty}</p>
                    </Field>

                    <Field label={i18n._(t`E-mailadres verwijzer`)} horizontal={true}>
                        <p style={{ maxWidth: '279px' }}>{prefillData?.referrerEmailAddress}</p>
                    </Field>
                </Column>
            </Section>
        )
    }

    return (
        <Section title={i18n._(t`Verwijzer`)}>
            <Column spacing={4}>
                <Field label={i18n._(t`Aanmeldende instantie`)} horizontal={true}>
                    <Select name="notifyingParty" placeholder={i18n._(t`Selecteer verwijzer`)} options={['test']} />
                </Field>
                <Field label={i18n._(t`E-mailadres verwijzer`)} horizontal={true}>
                    <Input
                        name="referrerEmailAddress"
                        placeholder={i18n._(t`instantie@email.nl`)}
                        defaultValue={prefillData?.notifyingParty}
                    />
                </Field>
            </Column>
        </Section>
    )
}

export default RefererInformationFieldset
