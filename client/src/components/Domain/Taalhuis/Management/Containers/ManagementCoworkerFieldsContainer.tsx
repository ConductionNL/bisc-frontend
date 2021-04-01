import { t } from '@lingui/macro'
import { useLingui } from '@lingui/react'
import ErrorBlock from 'components/Core/Feedback/Error/ErrorBlock'
import Spinner, { Animation } from 'components/Core/Feedback/Spinner/Spinner'
import HorizontalRule from 'components/Core/HorizontalRule/HorizontalRule'
import Center from 'components/Core/Layout/Center/Center'
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
    loading?: boolean
    error?: boolean
    editable?: boolean
}

export interface ManagementCoworkersFieldsContainerFormModel
    extends InformationFieldsetModel,
        AccountInformationFieldsetFormModel {}

export const ManagementCoworkerFieldsContainer: React.FunctionComponent<Props> = props => {
    const { editable, loading, error, defaultFieldValues, userRolesLoading, userRoleValues, userRolesError } = props
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
