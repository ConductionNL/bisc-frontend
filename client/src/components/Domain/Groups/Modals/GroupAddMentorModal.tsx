import { t } from '@lingui/macro'
import { useLingui } from '@lingui/react'
import ErrorBlock from 'components/Core/Feedback/Error/ErrorBlock'
import Spinner, { Animation } from 'components/Core/Feedback/Spinner/Spinner'
import HorizontalRule from 'components/Core/HorizontalRule/HorizontalRule'
import Center from 'components/Core/Layout/Center/Center'
import { ModalViewBig } from 'components/Core/Modal/ModalViewBig'
import InformationFieldset from 'components/fieldsets/shared/InformationFieldset'
import { useMockQuery } from 'components/hooks/useMockQuery'
import { AanbiederEmployeeType, UserRoleEnum } from 'generated/graphql'
import times from 'lodash/times'
import React, { useState } from 'react'
import { GroupMentorsList } from '../Lists/GroupsMentorsList'

interface Props {
    onClose: () => void
}

export const GroupAddMentorModal: React.FunctionComponent<Props> = props => {
    const { onClose } = props
    const [selectedAanbiederEmployee, setSelectedAanbiederEmployee] = useState<AanbiederEmployeeType | null>(null)

    const { data, loading, error } = useMockQuery<AanbiederEmployeeType[]>(
        times(20, () => ({
            __typename: 'AanbiederEmployeeType',
            id: 'id',
            givenName: 'givenName',
            additionalName: 'den',
            familyName: 'failnae',
            email: 'email',
            telephone: 'telephone',
            dateCreated: new Date().toString(),
            dateModified: new Date().toString(),
            userRoles: [
                {
                    __typename: 'AanbiederUserRoleType',
                    id: '',
                    name: UserRoleEnum.AanbiederCoordinator,
                },
            ],
        }))
    )
    const { i18n } = useLingui()

    return <ModalViewBig title={i18n._(t`Begeleider toevoegen`)} onClose={onClose} ContentComponent={renderContent()} />

    function renderContent() {
        if (loading) {
            return (
                <Center>
                    <Spinner type={Animation.simpleSpinner} />
                </Center>
            )
        }

        if (error || !data) {
            return (
                <ErrorBlock
                    title={i18n._(t`Er ging iets fout`)}
                    message={i18n._(t`Wij konden de gegevens niet ophalen, probeer het opnieuw`)}
                />
            )
        }

        if (!selectedAanbiederEmployee) {
            return (
                <GroupMentorsList
                    onAddMentor={() => alert('add mentor')}
                    onView={item => setSelectedAanbiederEmployee(item)}
                    data={data}
                />
            )
        }
        return (
            <>
                <InformationFieldset
                    prefillData={{
                        lastname: selectedAanbiederEmployee.familyName,
                        insertion: selectedAanbiederEmployee.additionalName,
                        phonenumber: selectedAanbiederEmployee.telephone,
                        callSign: selectedAanbiederEmployee.givenName,
                    }}
                />
                <HorizontalRule />
            </>
        )
    }
}
