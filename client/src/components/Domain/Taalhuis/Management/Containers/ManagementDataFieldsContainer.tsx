import HorizontalRule from 'components/Core/HorizontalRule/HorizontalRule'
import BranchInformationFieldset, {
    BranchInformationFieldsetFormModel,
} from 'components/fieldsets/shared/BranchInformationFieldset'
import ContactInformationFieldset, {
    ContactInformationFieldsetFormModel,
} from 'components/fieldsets/shared/ContactInformationFieldset'
import { TaalhuisQuery } from 'generated/graphql'
import React from 'react'

interface Props {
    defaultFieldValues?: TaalhuisQuery
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
                    branch: defaultFieldValues?.taalhuis.name,
                    street: defaultFieldValues?.taalhuis.address?.street,
                    streetNr: defaultFieldValues?.taalhuis.address?.houseNumber,
                    addition: defaultFieldValues?.taalhuis.address?.houseNumberSuffix,
                    postcode: defaultFieldValues?.taalhuis.address?.postalCode,
                    city: defaultFieldValues?.taalhuis.address?.locality,
                }}
                readOnly={!editable}
            />
            <HorizontalRule />
            <ContactInformationFieldset
                prefillData={{
                    phone: defaultFieldValues?.taalhuis.telephone,
                    email: defaultFieldValues?.taalhuis.email,
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
