import { t } from '@lingui/macro'
import { useLingui } from '@lingui/react'
import ErrorBlock from 'components/Core/Feedback/Error/ErrorBlock'
import Spinner, { Animation } from 'components/Core/Feedback/Spinner/Spinner'
import HorizontalRule from 'components/Core/HorizontalRule/HorizontalRule'
import Center from 'components/Core/Layout/Center/Center'
import BranchInformationFieldset from 'components/fieldsets/shared/BranchInformationFieldset'
import ContactInformationFieldset from 'components/fieldsets/shared/ContactInformationFieldset'
import { TaalhuisQuery } from 'generated/graphql'
import React from 'react'

interface Props {
    defaultFieldValues?: TaalhuisQuery
    loading: boolean
    error: boolean
    editable?: boolean
}

const ManagementDataContainer: React.FunctionComponent<Props> = props => {
    const { editable, loading, error, defaultFieldValues } = props
    const { i18n } = useLingui()

    if (loading) {
        return (
            <Center grow={true}>
                <Spinner type={Animation.pageSpinner} />
            </Center>
        )
    }
    if (error) {
        return (
            <ErrorBlock
                title={i18n._(t`Er ging iets fout`)}
                message={i18n._(t`Wij konden de gegevens niet ophalen, probeer het opnieuw`)}
            />
        )
    }

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

export default ManagementDataContainer
