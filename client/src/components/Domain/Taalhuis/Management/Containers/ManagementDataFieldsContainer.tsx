import HorizontalRule from 'components/Core/HorizontalRule/HorizontalRule'
import BranchInformationFieldset, {
    BranchInformationFieldsetFormModel,
} from 'components/fieldsets/shared/BranchInformationFieldset'
import ContactInformationFieldset, {
    ContactInformationFieldsetFormModel,
} from 'components/fieldsets/shared/ContactInformationFieldset'
import { LanguageHouseQuery } from 'generated/graphql'
import React from 'react'

interface Props {
    defaultFieldValues?: LanguageHouseQuery
    editable?: boolean
}
export interface ManagementDataContainerFormModel
    extends BranchInformationFieldsetFormModel,
        ContactInformationFieldsetFormModel {}

export const ManagementDataContainer: React.FunctionComponent<Props> = props => {
    const { editable, defaultFieldValues } = props

    return (
        <>
            <BranchInformationFieldset
                prefillData={{
                    branch: defaultFieldValues?.languageHouse.name,
                    street: defaultFieldValues?.languageHouse.address?.street,
                    houseNumber: defaultFieldValues?.languageHouse.address?.houseNumber,
                    houseNumberSuffix: defaultFieldValues?.languageHouse.address?.houseNumberSuffix,
                    postalCode: defaultFieldValues?.languageHouse.address?.postalCode,
                    locality: defaultFieldValues?.languageHouse.address?.locality,
                }}
                readOnly={!editable}
            />
            <HorizontalRule />
            <ContactInformationFieldset
                prefillData={{
                    phone: defaultFieldValues?.languageHouse.telephone,
                    email: defaultFieldValues?.languageHouse.email,
                }}
                readOnly={!editable}
                fieldControls={{
                    address: {
                        hidden: true,
                    },
                    postalCode: {
                        hidden: true,
                    },
                    city: {
                        hidden: true,
                    },
                    phoneNumberContactPerson: {
                        hidden: true,
                    },
                    contactPreference: {
                        hidden: true,
                    },
                }}
            />
        </>
    )
}
