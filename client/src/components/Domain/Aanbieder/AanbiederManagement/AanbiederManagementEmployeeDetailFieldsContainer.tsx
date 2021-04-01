import React from 'react'

import HorizontalRule from 'components/Core/HorizontalRule/HorizontalRule'
import Column from 'components/Core/Layout/Column/Column'
import AccountInformationFieldset, {
    AccountInformationFieldsetFormModel,
} from 'components/fieldsets/shared/AccountInformationFieldset'
import { AanbiederEmployeeQuery, UserRoleEnum } from 'generated/graphql'
import InformationFieldset, { InformationFieldsetModel } from 'components/fieldsets/shared/InformationFieldset'

export type AanbiederManagementEmployeeDetailForm = Omit<InformationFieldsetModel, 'insertion'> &
    AccountInformationFieldsetFormModel

interface Props {
    isEditing: boolean
    employee: AanbiederEmployeeQuery['aanbiederEmployee']
}

export const AanbiederManagementEmployeeDetailFieldsContainer: React.FunctionComponent<Props> = props => {
    const { isEditing, employee } = props

    return (
        <Column spacing={4}>
            {renderPersonalInfoFields()}
            <HorizontalRule />
            {/* TODO: add availability fields (not part of current sprint) */}
            {renderAccountInfoFields()}
        </Column>
    )

    function renderPersonalInfoFields() {
        const { familyName, givenName, telephone } = employee

        return (
            <InformationFieldset
                readOnly={!isEditing}
                hideInsertion={true}
                prefillData={{
                    lastname: familyName,
                    callSign: givenName,
                    phonenumber: telephone,
                }}
            />
        )
    }

    function renderAccountInfoFields() {
        const { email, userRoles, dateCreated, dateModified } = employee
        const prefillData = {
            email,
            roles: userRoles.map(r => r.name),
            createdAt: dateCreated,
            updatedAt: dateModified,
        }

        return (
            <AccountInformationFieldset
                readOnly={!isEditing}
                prefillData={prefillData}
                roleOptions={[
                    [UserRoleEnum.AanbiederCoordinator],
                    [UserRoleEnum.AanbiederMentor],
                    [UserRoleEnum.AanbiederMentor, UserRoleEnum.AanbiederCoordinator],
                    [UserRoleEnum.AanbiederVolunteer],
                ]}
            />
        )
    }
}
