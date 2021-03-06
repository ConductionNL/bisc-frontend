import { t } from '@lingui/macro'
import { useLingui } from '@lingui/react'
import { Maybe } from 'generated/graphql'
import React from 'react'
import Availabillity, { AvailabillityType } from '../../Core/Availabillity/Availabillity'
import TextArea from '../../Core/DataEntry/TextArea'
import Field from '../../Core/Field/Field'
import Section from '../../Core/Field/Section'
import Column from '../../Core/Layout/Column/Column'

interface Props {
    prefillData?: AvailabillityFieldsetPrefillData
    readOnly?: boolean
}

export interface AvailabillityFieldsetModel {
    available: string
    note: string
}

export interface AvailabillityFieldsetPrefillData {
    available?: Maybe<AvailabillityType>
    note?: Maybe<string>
}

const AvailabillityFieldset: React.FunctionComponent<Props> = props => {
    const { readOnly, prefillData } = props
    const { i18n } = useLingui()

    if (readOnly) {
        return (
            <Section title={i18n._(t`Beschikbaarheid`)}>
                <Column spacing={6}>
                    <Field label={i18n._(t`Beschikbaarheid`)} horizontal={true}>
                        {/* TODO: fix broken Availabillity */}
                        {/* <Availabillity defaultValue={prefillData?.available ?? undefined} readOnly={readOnly} /> */}
                    </Field>
                    <Field label={i18n._(t`Notities`)} horizontal={true}>
                        <p>{prefillData?.note}</p>
                    </Field>
                </Column>
            </Section>
        )
    }

    return (
        <Section title={i18n._(t`Beschikbaarheid`)}>
            <Column spacing={6}>
                <Field label={i18n._(t`Beschikbaarheid`)} horizontal={true}>
                    {/* TODO: fix broken Availabillity */}
                    {/* <Availabillity defaultValue={prefillData?.available ?? undefined} /> */}
                </Field>
                <Field label={i18n._(t`Notities`)} horizontal={true}>
                    <TextArea
                        name="note"
                        placeholder={i18n._(t`Notities met betrekking tot beschikbaarheid`)}
                        defaultValue={prefillData?.note ?? undefined}
                    />
                </Field>
            </Column>
        </Section>
    )
}

export default AvailabillityFieldset
