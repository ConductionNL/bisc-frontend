import { t } from '@lingui/macro'
import { useLingui } from '@lingui/react'
import Field from 'components/Core/Field/Field'
import Section from 'components/Core/Field/Section'
import HorizontalRule from 'components/Core/HorizontalRule/HorizontalRule'
import Column from 'components/Core/Layout/Column/Column'
import Paragraph from 'components/Core/Typography/Paragraph'
import React from 'react'
import { AanbiederManagementProfile } from 'views/Authorized/Supplier/AanbiederView/mocks'

interface Props {
    isEditing: boolean
    defaultValues?: AanbiederManagementProfile
}

export const AanbiederManagementDataContainer: React.FunctionComponent<Props> = props => {
    const { i18n } = useLingui()
    const { name, address, phone, email } = getDefaultValues()

    return (
        <Column spacing={4}>
            <Section title={i18n._(t`Vestiging`)}>
                <Column spacing={4}>{renderEstablishmentFields()}</Column>
            </Section>
            <HorizontalRule />
            <Section title={i18n._(t`Contactgegevens`)}>
                <Column spacing={4}>{renderContactFields()}</Column>
            </Section>
        </Column>
    )

    // TODO
    function renderEstablishmentFields() {
        const { isEditing } = props
        const { street, building, apartment, postcode, city } = address

        const labels = {
            name: 'Naam aanbieder',
            street: 'Straat en huisnr.',
            postcode: 'Postcode',
            city: 'Plaats',
        }

        // TODO
        if (isEditing) {
            return null
        }

        return (
            <>
                <Field label={i18n._(t`${labels.name}`)} horizontal={true}>
                    <Paragraph>{name}</Paragraph>
                </Field>
                <Field label={i18n._(t`${labels.street}`)} horizontal={true}>
                    <Paragraph>
                        {street}&nbsp;{building}&nbsp;{apartment}
                    </Paragraph>
                </Field>
                <Field label={i18n._(t`${labels.postcode}`)} horizontal={true}>
                    <Paragraph>{postcode}</Paragraph>
                </Field>
                <Field label={i18n._(t`${labels.city}`)} horizontal={true}>
                    <Paragraph>{city}</Paragraph>
                </Field>
            </>
        )
    }

    // TODO
    function renderContactFields() {
        const { isEditing } = props

        const labels = {
            phone: 'Telefoonnummer',
            email: 'E-mailadres',
        }

        // TODO
        if (isEditing) {
            return null
        }

        return (
            <>
                <Field label={i18n._(t`${labels.phone}`)} horizontal={true}>
                    <Paragraph>{phone}</Paragraph>
                </Field>
                <Field label={i18n._(t`${labels.email}`)} horizontal={true}>
                    <Paragraph>{email}</Paragraph>
                </Field>
            </>
        )
    }

    function getDefaultValues() {
        const { defaultValues } = props

        if (!defaultValues) {
            return {
                name: '',
                address: {
                    street: '',
                    building: '',
                    apartment: '',
                    postcode: '',
                    city: '',
                },
                phone: '',
                email: '',
            }
        }

        return defaultValues
    }
}
