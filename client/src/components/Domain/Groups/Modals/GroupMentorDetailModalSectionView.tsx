import { t } from '@lingui/macro'
import { useLingui } from '@lingui/react'
import ErrorBlock from 'components/Core/Feedback/Error/ErrorBlock'
import Spinner, { Animation } from 'components/Core/Feedback/Spinner/Spinner'
import HorizontalRule from 'components/Core/HorizontalRule/HorizontalRule'
import Center from 'components/Core/Layout/Center/Center'
import { AvailabillityCompare } from 'components/Domain/Shared/components/AvailabillityCompare/AvailabillityCompare'
import InformationFieldset from 'components/fieldsets/shared/InformationFieldset'
import { useMockQuery } from 'components/hooks/useMockQuery'
import { UserRoleEnum } from 'generated/graphql'
import React from 'react'
import { ProviderEmployeeType } from 'generated/graphql'

interface Props {
    selectedAanbiederEmployee: ProviderEmployeeType
}

export const GroupMentorDetailModalSectionView: React.FunctionComponent<Props> = props => {
    const { i18n } = useLingui()
    const { selectedAanbiederEmployee } = props
    const { data: userA, loading: userALoading, error: userAError } = useMockQuery<ProviderEmployeeType>({
        __typename: 'ProviderEmployeeType',
        userId: '',
        dateCreated: '',
        dateModified: '',
        userRoles: [{ id: '', name: UserRoleEnum.TaalhuisEmployee }],
        givenName: 'Rick',
        additionalName: 'den',
        familyName: 'Woltheus',
        telephone: '',
        availability: {
            monday: {
                morning: true,
                evening: false,
                afternoon: false,
            },
            tuesday: {
                morning: false,
                evening: false,
                afternoon: false,
            },
            wednesday: {
                morning: true,
                evening: false,
                afternoon: false,
            },
            thursday: {
                morning: false,
                evening: false,
                afternoon: false,
            },
            friday: {
                morning: false,
                evening: false,
                afternoon: false,
            },
            saturday: { morning: false, evening: false, afternoon: false },
            sunday: { morning: false, evening: false, afternoon: false },
        },
        availabilityNotes: 'yes',
        email: '',
    })
    const { data: userB, loading: userBLoading, error: userBError } = useMockQuery<ProviderEmployeeType>({
        __typename: 'ProviderEmployeeType',
        userId: '',
        dateCreated: '',
        dateModified: '',
        userRoles: [
            { id: '', name: UserRoleEnum.AanbiederMentor },
            { id: '', name: UserRoleEnum.AanbiederCoordinator },
        ],
        givenName: 'Jan',
        additionalName: '',
        familyName: 'Wortel',
        telephone: '',
        availability: {
            monday: {
                morning: true,
                evening: false,
                afternoon: false,
            },
            tuesday: {
                morning: false,
                evening: false,
                afternoon: false,
            },
            wednesday: {
                morning: true,
                evening: false,
                afternoon: false,
            },
            thursday: {
                morning: false,
                evening: false,
                afternoon: false,
            },
            friday: {
                morning: false,
                evening: false,
                afternoon: false,
            },
            saturday: { morning: false, evening: false, afternoon: false },
            sunday: { morning: false, evening: false, afternoon: false },
        },
        availabilityNotes: 'testing this wonderfull application',
        email: '',
    }) // fetch mentor

    if (userALoading || userBLoading) {
        return (
            <Center>
                <Spinner type={Animation.simpleSpinner} />
            </Center>
        )
    }

    if (userAError || userBError || !userA || !userB || !selectedAanbiederEmployee) {
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
                    lastname: selectedAanbiederEmployee.familyName,
                    insertion: selectedAanbiederEmployee.additionalName,
                    phonenumber: selectedAanbiederEmployee.telephone,
                    callSign: selectedAanbiederEmployee.givenName,
                }}
            />
            <HorizontalRule />
            <AvailabillityCompare UserA={userA} UserB={userB} />
        </>
    )
}
