import HorizontalRule from 'components/Core/HorizontalRule/HorizontalRule'
import AccountInformationFieldset, {
    AccountInformationFieldsetFormModel,
} from 'components/fieldsets/shared/AccountInformationFieldset'
import InformationFieldset, { InformationFieldsetModel } from 'components/fieldsets/shared/InformationFieldset'
import { LanguageHouseEmployeeQuery, UserRolesByLanguageHouseIdQuery } from 'generated/graphql'
import React from 'react'

interface Props {
    defaultFieldValues?: LanguageHouseEmployeeQuery
    userRoleValues?: UserRolesByLanguageHouseIdQuery
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
                    lastname: defaultFieldValues?.languageHouseEmployee.familyName,
                    insertion: defaultFieldValues?.languageHouseEmployee.additionalName,
                    callSign: defaultFieldValues?.languageHouseEmployee.givenName,
                    phonenumber: defaultFieldValues?.languageHouseEmployee.telephone,
                }}
                readOnly={!editable}
            />
            <HorizontalRule />
            <AccountInformationFieldset
                roleOptions={userRoleValues && userRoleValues.userRolesByLanguageHouseId.map(v => [v.name as string])}
                rolesLoading={userRolesLoading}
                rolesError={userRolesError}
                prefillData={{
                    email: defaultFieldValues?.languageHouseEmployee.email,
                    roles: defaultFieldValues?.languageHouseEmployee.userRoles.map(role => role.name),
                    createdAt: defaultFieldValues?.languageHouseEmployee.dateCreated,
                    updatedAt: defaultFieldValues?.languageHouseEmployee.dateModified,
                }}
                readOnly={!editable}
            />
        </>
    )
}
