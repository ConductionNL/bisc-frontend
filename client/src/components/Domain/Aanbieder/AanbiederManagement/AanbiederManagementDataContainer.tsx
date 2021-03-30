import React from 'react'
import { t } from '@lingui/macro'
import { useLingui } from '@lingui/react'

import HorizontalRule from 'components/Core/HorizontalRule/HorizontalRule'
import Column from 'components/Core/Layout/Column/Column'
import ContactInformationFieldset from 'components/fieldsets/shared/ContactInformationFieldset'
import BranchInformationFieldset from 'components/fieldsets/shared/BranchInformationFieldset'
import { AanbiederQuery } from 'generated/graphql'

interface Props {
    isEditing: boolean
    queryResult: AanbiederQuery
}

export const AanbiederManagementDataContainer: React.FunctionComponent<Props> = props => {
    const { i18n } = useLingui()
    const { name, address, telephone, email } = props.queryResult.aanbieder

    return (
        <Column spacing={4}>
            {renderEstablishmentFields()}
            <HorizontalRule />
            {renderContactFields()}
        </Column>
    )

    function renderEstablishmentFields() {
        const { isEditing } = props
        const { street, houseNumber, houseNumberSuffix, postalCode, locality } = getAddressDefaultValues()

        return (
            <BranchInformationFieldset
                readOnly={!isEditing}
                fieldNaming={{
                    branch: {
                        label: i18n._(t`Naam aanbieder`),
                        placeholder: i18n._(t`Naam aanbieder`),
                    },
                }}
                prefillData={{
                    branch: name,
                    postcode: postalCode,
                    city: locality,
                    street,
                    streetNr: houseNumber,
                    addition: houseNumberSuffix,
                }}
            />
        )
    }

    function renderContactFields() {
        const { isEditing } = props

        return (
            <ContactInformationFieldset
                readOnly={!isEditing}
                prefillData={{ email, phone: telephone }}
                fieldControls={{
                    postalCode: { hidden: true },
                    city: { hidden: true },
                    phoneNumberContactPerson: { hidden: true },
                    contactPreference: { hidden: true },
                    address: { hidden: true },
                }}
            />
        )
    }

    function getAddressDefaultValues() {
        if (!address) {
            return { street: '', houseNumber: '', houseNumberSuffix: '', postalCode: '', locality: '' }
        }

        return address
    }
}
