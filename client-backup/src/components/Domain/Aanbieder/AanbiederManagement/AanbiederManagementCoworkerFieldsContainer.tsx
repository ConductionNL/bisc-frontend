import HorizontalRule from 'components/Core/HorizontalRule/HorizontalRule'
import AccountInformationFieldset, {
    AccountInformationFieldsetFormModel,
} from 'components/fieldsets/shared/AccountInformationFieldset'
import InformationFieldset, { InformationFieldsetModel } from 'components/fieldsets/shared/InformationFieldset'
import { ProviderEmployeeQuery, UserRolesByProvidersQuery } from 'generated/graphql'
import React from 'react'

interface Props {
    defaultFieldValues?: ProviderEmployeeQuery
    userRoleValues?: UserRolesByProvidersQuery
    userRolesLoading?: boolean
    userRolesError?: boolean
    editable?: boolean
}

export interface ManagementCoworkersFieldsContainerFormModel
    extends InformationFieldsetModel,
        AccountInformationFieldsetFormModel {}

export const AanbiederManagementCoworkerFieldsContainer: React.FunctionComponent<Props> = props => {
    const { editable, defaultFieldValues, userRolesLoading, userRoleValues, userRolesError } = props

    console.log(userRoleValues && userRoleValues.userRolesByProviders)

    return (
        <>
            <InformationFieldset
                prefillData={{
                    familyName: defaultFieldValues?.employee?.familyName,
                    additionalName: defaultFieldValues?.employee?.additionalName,
                    callSign: defaultFieldValues?.employee?.givenName,
                    phonenumber: defaultFieldValues?.employee?.telephone,
                }}
                readOnly={!editable}
            />
            <HorizontalRule />
            <AccountInformationFieldset
                // roleOptions={userRoleValues && userRoleValues.userRolesByProvider?.map(v => [v.name as string])}
                rolesLoading={userRolesLoading}
                rolesError={userRolesError}
                prefillData={{
                    email: defaultFieldValues?.employee?.email,
                    // roles: defaultFieldValues?.employee?.userRoles.map(role => role.name),
                    // createdAt: defaultFieldValues?.employee?.dateCreated,
                    // updatedAt: defaultFieldValues?.employee?.dateModified,
                }}
                readOnly={!editable}
            />
        </>
    )
}
