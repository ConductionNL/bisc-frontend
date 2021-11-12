import { t } from '@lingui/macro'
import { useLingui } from '@lingui/react'
import { Availability as AvailabilityEnum, Maybe } from 'api/types/types'
import { NewAvailability } from 'components/Core/Availabillity/NewAvailability'
import Paragraph from 'components/Core/Typography/Paragraph'
import React from 'react'
import TextArea from '../../Core/DataEntry/TextArea'
import Field from '../../Core/Field/Field'
import Section from '../../Core/Field/Section'
import Column from '../../Core/Layout/Column/Column'
import nl2br from 'react-nl2br'

interface Props {
    prefillData?: AvailabilityFieldsetPrefillData
    readOnly?: boolean
}

export interface AvailabilityFieldsetModel {
    'person.availability'?: Maybe<AvailabilityEnum[]>
    'person.availabilityNotes'?: Maybe<string>
}

export interface AvailabilityFieldsetPrefillData {
    'person.availability'?: Maybe<AvailabilityEnum[]>
    'person.availabilityNotes'?: Maybe<string>
}

export const AvailabilityFieldset: React.FunctionComponent<Props> = props => {
    const { readOnly, prefillData } = props
    const { i18n } = useLingui()

    if (readOnly) {
        return (
            <Section title={i18n._(t`Beschikbaarheid`)}>
                <Column spacing={4}>
                    <Field label={i18n._(t`Beschikbaarheid`)} horizontal={true}>
                        <NewAvailability
                            defaultValue={prefillData?.['person.availability'] ?? undefined}
                            readOnly={readOnly}
                        />
                    </Field>
                    <Field label={i18n._(t`Notities`)} horizontal={true}>
                        <Paragraph>{nl2br(prefillData?.['person.availabilityNotes'])}</Paragraph>
                    </Field>
                </Column>
            </Section>
        )
    }

    return (
        <Section title={i18n._(t`Beschikbaarheid`)}>
            <Column spacing={4}>
                <Field label={i18n._(t`Beschikbaarheid`)} horizontal={true}>
                    <NewAvailability
                        name={'person.availability[]'}
                        defaultValue={prefillData?.['person.availability'] ?? undefined}
                    />
                </Field>
                <Field label={i18n._(t`Notities`)} horizontal={true}>
                    <TextArea
                        name="person.availabilityNotes"
                        placeholder={i18n._(t`Notities met betrekking tot beschikbaarheid`)}
                        defaultValue={prefillData?.['person.availabilityNotes'] ?? undefined}
                    />
                </Field>
            </Column>
        </Section>
    )
}
