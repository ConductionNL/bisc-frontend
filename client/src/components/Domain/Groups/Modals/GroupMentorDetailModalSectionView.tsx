import { t } from '@lingui/macro'
import { useLingui } from '@lingui/react'
import { AvailabillityType } from 'components/Core/Availabillity/Availabillity'
import ErrorBlock from 'components/Core/Feedback/Error/ErrorBlock'
import Spinner, { Animation } from 'components/Core/Feedback/Spinner/Spinner'
import HorizontalRule from 'components/Core/HorizontalRule/HorizontalRule'
import Center from 'components/Core/Layout/Center/Center'
import { AvailabillityCompare } from 'components/Domain/Shared/components/AvailabillityCompare/AvailabillityCompare'
import { roleTranslations } from 'components/Domain/Shared/components/RoleLabelTag/constants'
import InformationFieldset from 'components/fieldsets/shared/InformationFieldset'
import { ProviderEmployeeType, useProviderEmployeeQuery } from 'generated/graphql'
import React from 'react'
import { NameFormatters } from 'utils/formatters/name/Name'

interface Props {
    group?: GroupMentorDetailModalGroup
    selectedAanbiederEmployee: ProviderEmployeeType
}

export interface GroupMentorDetailModalGroup {
    availabillity?: AvailabillityType
    note?: string
    name?: string
}

export const GroupMentorDetailModalSectionView: React.FunctionComponent<Props> = props => {
    const { i18n } = useLingui()
    const { selectedAanbiederEmployee, group } = props
    const { data: userA, loading: userALoading, error: userAError } = useProviderEmployeeQuery({
        variables: { userId: selectedAanbiederEmployee.userId },
    })

    if (userALoading) {
        return (
            <Center>
                <Spinner type={Animation.simpleSpinner} />
            </Center>
        )
    }

    if (userAError || !userA || !selectedAanbiederEmployee) {
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
                readOnly={true}
                prefillData={{
                    familyName: selectedAanbiederEmployee.familyName,
                    additionalName: selectedAanbiederEmployee.additionalName,
                    phonenumber: selectedAanbiederEmployee.telephone,
                    callSign: selectedAanbiederEmployee.givenName,
                }}
            />
            <HorizontalRule />
            <AvailabillityCompare
                userA={{
                    name: NameFormatters.formattedFullname(userA.providerEmployee),
                    availabillity: userA.providerEmployee.availability,
                    note: userA.providerEmployee.availabilityNotes,
                    roles: userA.providerEmployee.userRoles.map(role => roleTranslations[role.name]),
                }}
                userB={{
                    name: group?.name,
                    availabillity: group?.availabillity,
                    note: group?.note,
                    roles: [i18n._(t`Groep`)],
                }}
            />
        </>
    )
}
