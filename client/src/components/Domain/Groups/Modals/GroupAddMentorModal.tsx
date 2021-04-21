import { t } from '@lingui/macro'
import { useLingui } from '@lingui/react'
import Actionbar from 'components/Core/Actionbar/Actionbar'
import Button, { ButtonType } from 'components/Core/Button/Button'
import ErrorBlock from 'components/Core/Feedback/Error/ErrorBlock'
import Spinner, { Animation } from 'components/Core/Feedback/Spinner/Spinner'
import HorizontalRule from 'components/Core/HorizontalRule/HorizontalRule'
import { IconType } from 'components/Core/Icon/IconType'
import Center from 'components/Core/Layout/Center/Center'
import Row from 'components/Core/Layout/Row/Row'
import { ModalViewBig } from 'components/Core/Modal/ModalViewBig'
import { AvailabillityCompare } from 'components/Domain/Shared/components/AvailabillityCompare/AvailabillityCompare'
import InformationFieldset from 'components/fieldsets/shared/InformationFieldset'
import { useMockQuery } from 'components/hooks/useMockQuery'
import { UserRoleEnum } from 'generated/graphql'
import times from 'lodash/times'
import React, { useState } from 'react'
import { AanbiederEmployeeType } from 'temp/TEMPORARYgraphql'
import { GroupMentorsList } from '../Lists/GroupsMentorsList'
import { GroupMentorDetailModalSectionView } from './GroupMentorDetailModalSectionView'

interface Props {
    onClose: () => void
    onSubmit: (data: AanbiederEmployeeType) => void
}

export const GroupAddMentorModal: React.FunctionComponent<Props> = props => {
    const { onClose, onSubmit } = props
    const [selectedAanbiederEmployee, setSelectedAanbiederEmployee] = useState<AanbiederEmployeeType | null>(null)

    const { data: list, loading: listLoading, error: listError } = useMockQuery<AanbiederEmployeeType[]>(
        times(20, () => ({
            __typename: 'AanbiederEmployeeType',
            userId: '',
            id: `${Math.random()}`,
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

    return (
        <ModalViewBig
            title={i18n._(t`Begeleider toevoegen`)}
            onClose={onClose}
            ContentComponent={renderContent()}
            BottomComponent={renderBottomComponent()}
        />
    )

    function renderContent() {
        if (!selectedAanbiederEmployee) {
            return renderList()
        }

        return <GroupMentorDetailModalSectionView selectedAanbiederEmployee={selectedAanbiederEmployee} />
    }
    function renderList() {
        if (listLoading) {
            return (
                <Center>
                    <Spinner type={Animation.simpleSpinner} />
                </Center>
            )
        }

        if (listError || !list) {
            return (
                <ErrorBlock
                    title={i18n._(t`Er ging iets fout`)}
                    message={i18n._(t`Wij konden de gegevens niet ophalen, probeer het opnieuw`)}
                />
            )
        }

        return (
            <>
                <GroupMentorsList
                    onAddMentor={item => handleOnAddMentor(item)}
                    onView={item => setSelectedAanbiederEmployee(item)}
                    data={list}
                />
            </>
        )
    }

    function renderBottomComponent() {
        if (!selectedAanbiederEmployee) {
            return undefined // undefined because check is already done in modalView and ts did not like null
        }
        return (
            <Row justifyContent={'space-between'} grow={true}>
                <Button
                    icon={IconType.arrowLeft}
                    type={ButtonType.secondary}
                    onClick={() => setSelectedAanbiederEmployee(null)}
                >
                    {i18n._(t`Terug naar begeleidersoverzicht`)}
                </Button>
                <Row spacing={1}>
                    <Button type={ButtonType.secondary} onClick={() => onClose()}>
                        {i18n._(t`Annuleren`)}
                    </Button>

                    <Button
                        type={ButtonType.primary}
                        icon={IconType.send}
                        onClick={() => handleOnAddMentor(selectedAanbiederEmployee)}
                    >
                        {i18n._(t`Begeleider toevoegen`)}
                    </Button>
                </Row>
            </Row>
        )
    }

    function handleOnAddMentor(item: AanbiederEmployeeType) {
        onSubmit(item)
        onClose()
    }
}
