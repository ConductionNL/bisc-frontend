

import { t } from '@lingui/macro'
import { useLingui } from '@lingui/react'
import React from 'react'
import Availabillity from '../../Core/Availabillity/Availabillity'
import Input from '../../Core/DataEntry/Input'
import Field from '../../Core/Field/Field'
import Section from '../../Core/Field/Section'
import Column from '../../Core/Layout/Column/Column'

interface Props {}

const AvailabillityFieldset: React.FunctionComponent<Props> = () => {
    const { i18n } = useLingui()
    
    return (
        <Section title={i18n._(t`Beschikbaarheid`)}>
            <Column spacing={6}>
                <Field label={i18n._(t`Beschikbaarheid`)} horizontal={true}>
                    <Availabillity />
                </Field>
                <Field label={i18n._(t`Notities`)} horizontal={true}>
                    <Input name="note" placeholder={i18n._(t`Notities met betrekking tot beschikbaarheid`)} />
                </Field>
            </Column>
        </Section>
    )
}

export default AvailabillityFieldset
