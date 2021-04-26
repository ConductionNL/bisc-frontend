import { i18n } from '@lingui/core'
import { t } from '@lingui/macro'
import { UserContext } from 'components/Providers/UserProvider/context'
import React, { useContext } from 'react'
import { useHistory } from 'react-router-dom'
import Button, { ButtonType } from '../../../../../components/Core/Button/Button'
import { NotificationsManager } from '../../../../../components/Core/Feedback/Notifications/NotificationsManager'
import { IconType } from '../../../../../components/Core/Icon/IconType'
import Column from '../../../../../components/Core/Layout/Column/Column'
import ModalView from '../../../../../components/Core/Modal/ModalView'
import SectionTitle from '../../../../../components/Core/Text/SectionTitle'
import Paragraph from '../../../../../components/Core/Typography/Paragraph'
import { RegistrationsDocument, useDeleteRegistrationMutation } from '../../../../../generated/graphql'
import { routes } from '../../../../../routes/routes'

interface Props {
    studentName: string
    id: string
    onClose: () => void
}

export const RegistrationDeleteModal: React.FC<Props> = ({ studentName, id, onClose }) => {
    const history = useHistory()
    const [deleteRegistration, { loading }] = useDeleteRegistrationMutation()
    const userContext = useContext(UserContext)

    const handleDelete = async () => {
        const response = await deleteRegistration({
            variables: {
                studentId: id,
            },
            refetchQueries: [{ query: RegistrationsDocument, variables: { languageHouseId: userContext.user?.organizationId } }],
        })

        if (response.errors?.length || !response.data) {
            throw new Error()
        }

        NotificationsManager.success(
            i18n._(t`Registratie is verwijderd`),
            i18n._(t`Je wordt teruggestuurd naar het overzicht`)
        )
        history.push(routes.authorized.participants.taalhuis.registrations.index)
    }

    return (
        <ModalView
            onClose={onClose}
            ContentComponent={
                <Column spacing={6}>
                    <SectionTitle title={i18n._(t`Aanmelding van ${studentName} verwijderen?`)} heading="H4" />
                    <Paragraph>
                        {i18n._(t`
                                Weet je zeker dat je de aanmelding wil verwijderen?`)}
                    </Paragraph>
                </Column>
            }
            BottomComponent={
                <>
                    <Button type={ButtonType.secondary} onClick={onClose}>
                        {i18n._(t`Annuleren`)}
                    </Button>
                    <Button
                        danger={true}
                        type={ButtonType.primary}
                        icon={IconType.delete}
                        onClick={handleDelete}
                        loading={loading}
                    >
                        {i18n._(t`Verwijderen`)}
                    </Button>
                </>
            }
        />
    )
}
