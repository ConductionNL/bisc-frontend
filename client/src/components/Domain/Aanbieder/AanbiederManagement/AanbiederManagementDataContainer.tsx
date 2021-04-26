import React from 'react'
import { t } from '@lingui/macro'
import { useLingui } from '@lingui/react'

import HorizontalRule from 'components/Core/HorizontalRule/HorizontalRule'
import Column from 'components/Core/Layout/Column/Column'
import ContactInformationFieldset, {
    ContactInformationFieldsetFormModel,
} from 'components/fieldsets/shared/ContactInformationFieldset'
import BranchInformationFieldset, {
    BranchInformationFieldsetFormModel,
} from 'components/fieldsets/shared/BranchInformationFieldset'
import { ProviderQuery } from 'generated/graphql'

export type AanbiederManagementDataFormModel = BranchInformationFieldsetFormModel &
    Pick<ContactInformationFieldsetFormModel, 'phone' | 'email'>

interface Props {
    isEditing: boolean
    queryResult: ProviderQuery
}

export const AanbiederManagementDataContainer: React.FunctionComponent<Props> = props => {
    const { i18n } = useLingui()
    const { name, address, telephone, email } = props.queryResult.provider

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
                    postalCode: postalCode,
                    locality: locality,
                    street,
                    houseNumber: houseNumber,
                    houseNumberSuffix: houseNumberSuffix,
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
