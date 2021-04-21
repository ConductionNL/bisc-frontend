import { t } from '@lingui/macro'
import { useLingui } from '@lingui/react'
import ErrorBlock from 'components/Core/Feedback/Error/ErrorBlock'
import Spinner, { Animation } from 'components/Core/Feedback/Spinner/Spinner'
import Center from 'components/Core/Layout/Center/Center'
import { ModalViewBig } from 'components/Core/Modal/ModalViewBig'
import { useMockQuery } from 'components/hooks/useMockQuery'
import { AanbiederEmployeeType, UserRoleEnum } from 'generated/graphql'
import React from 'react'
import { GroupMentorsList } from '../Lists/GroupsMentorsList'

interface Props {
    onClose: () => void
}

export const GroupAddMentorModal: React.FunctionComponent<Props> = props => {
    const { onClose } = props
    const { data, loading, error } = useMockQuery<AanbiederEmployeeType[]>([
        {
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
        },
    ])
    const { i18n } = useLingui()

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

    return (
        <ModalViewBig
            title={i18n._(t`Begeleider toevoegen`)}
            onClose={onClose}
            ContentComponent={<GroupMentorsList data={data} />}
        />
    )
}
