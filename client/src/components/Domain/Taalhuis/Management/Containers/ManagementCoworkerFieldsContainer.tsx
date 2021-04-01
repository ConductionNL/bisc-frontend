import { useLingui } from '@lingui/react'
import HorizontalRule from 'components/Core/HorizontalRule/HorizontalRule'
import AccountInformationFieldset, {
    AccountInformationFieldsetFormModel,
} from 'components/fieldsets/shared/AccountInformationFieldset'
import InformationFieldset, { InformationFieldsetModel } from 'components/fieldsets/shared/InformationFieldset'
import { TaalhuisEmployeeQuery, UserRolesByTaalhuisIdQuery } from 'generated/graphql'
import React from 'react'

interface Props {
    defaultFieldValues?: TaalhuisEmployeeQuery
    userRoleValues?: UserRolesByTaalhuisIdQuery
    userRolesLoading?: boolean
    userRolesError?: boolean
    editable?: boolean
}

export interface ManagementCoworkersFieldsContainerFormModel
    extends InformationFieldsetModel,
        AccountInformationFieldsetFormModel {}

export const ManagementCoworkerFieldsContainer: React.FunctionComponent<Props> = props => {
    const { editable, defaultFieldValues, userRolesLoading, userRoleValues, userRolesError } = props

    return (
        <>
            <InformationFieldset
                prefillData={{
                    lastname: defaultFieldValues?.taalhuisEmployee.familyName,
                    insertion: defaultFieldValues?.taalhuisEmployee.additionalName,
                    callSign: defaultFieldValues?.taalhuisEmployee.givenName,
                    phonenumber: defaultFieldValues?.taalhuisEmployee.telephone,
                }}
                readOnly={!editable}
            />
            <HorizontalRule />
            <AccountInformationFieldset
                roleOptions={userRoleValues && userRoleValues.userRolesByTaalhuisId.map(v => [v.name as string])}
                rolesLoading={userRolesLoading}
                rolesError={userRolesError}
                prefillData={{
                    email: defaultFieldValues?.taalhuisEmployee.email,
                    roles: defaultFieldValues?.taalhuisEmployee.userRoles.map(role => role.name),
                    createdAt: defaultFieldValues?.taalhuisEmployee.dateCreated,
                    updatedAt: defaultFieldValues?.taalhuisEmployee.dateModified,
                }}
                readOnly={!editable}
            />
        </>
    )
}
