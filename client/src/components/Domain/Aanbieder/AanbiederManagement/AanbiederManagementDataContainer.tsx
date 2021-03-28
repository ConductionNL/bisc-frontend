import { t } from '@lingui/macro'
import { useLingui } from '@lingui/react'
import Section from 'components/Core/Field/Section'
import HorizontalRule from 'components/Core/HorizontalRule/HorizontalRule'
import Column from 'components/Core/Layout/Column/Column'
import React from 'react'
import { AanbiederManagementProfile } from 'views/Authorized/Supplier/AanbiederView/mocks'

interface Props {
    isEditing: boolean
    defaultValues?: AanbiederManagementProfile
}

export const AanbiederManagementDataContainer: React.FunctionComponent<Props> = props => {
    const { isEditing, defaultValues } = props
    const { i18n } = useLingui()

    return (
        <Column spacing={4}>
            <Section title={i18n._(t`Vestiging`)}>
                <Column spacing={4}>
                    {isEditing ? renderEstablishmentFormFields() : renderEstablishmentViewFields()}
                </Column>
            </Section>
            <HorizontalRule />
            <Section title={i18n._(t`Contactgegevens`)}>
                <Column spacing={4}>{isEditing ? renderContactFormFields() : renderContactViewFields()}</Column>
            </Section>
        </Column>
    )

    // TODO
    function renderEstablishmentFormFields() {
        return null
    }

    // TODO
    function renderEstablishmentViewFields() {
        return null
    }

    // TODO
    function renderContactFormFields() {
        return null
    }

    // TODO
    function renderContactViewFields() {
        return null
    }
}
