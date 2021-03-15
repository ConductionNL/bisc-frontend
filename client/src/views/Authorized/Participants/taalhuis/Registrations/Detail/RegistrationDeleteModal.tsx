import { i18n } from '@lingui/core'
import { t } from '@lingui/macro'
import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import Button, { ButtonType } from '../../../../../../components/Core/Button/Button'
import ErrorBlock from '../../../../../../components/Core/Feedback/Error/ErrorBlock'
import { NotificationsManager } from '../../../../../../components/Core/Feedback/Notifications/NotificationsManager'
import { IconType } from '../../../../../../components/Core/Icon/IconType'
import Column from '../../../../../../components/Core/Layout/Column/Column'
import Modal from '../../../../../../components/Core/Modal/Modal'
import ModalView from '../../../../../../components/Core/Modal/ModalView'
import SectionTitle from '../../../../../../components/Core/Text/SectionTitle'
import Paragraph from '../../../../../../components/Core/Typography/Paragraph'
import { useMockMutation } from '../../../../../../hooks/UseMockMutation'
import { RegistrationsDetailParams } from '../../../../../../routes/participants/types'
import { routes } from '../../../../../../routes/routes'
import { RegistrationsMock, taalhuisRegistrationsCreateResponse } from '../../../mocks/registrations'

interface Props {
    registratorDetails: RegistrationsDetailParams
}

export const RegistrationDeleteModal: React.FC<Props> = ({ registratorDetails }) => {
    const history = useHistory()
    const [modalIsVisible, setModalIsVisible] = useState<boolean>(true)
    const [
        taalhuisRegistrationDelete,
        { loading: deleteRegistratorLoading, error: deleteRegistratorError, data: deleteRegistratorData },
    ] = useMockMutation<RegistrationsMock, {}>(taalhuisRegistrationsCreateResponse, false)

    return (
        <Modal isOpen={modalIsVisible} onRequestClose={() => setModalIsVisible(false)}>
            <ModalView
                onClose={() => setModalIsVisible(false)}
                ContentComponent={
                    <Column spacing={6}>
                        <SectionTitle
                            title={i18n._(t`Aanmelding ${registratorDetails.registrationname} verwijderen`)}
                            heading="H4"
                        />
                        <Paragraph>
                            {i18n._(t`
                                Weet je zeker dat je de aanmelding wil verwijderen? Hiermee worden ook alle onderliggende
                                medewerkers en deelnemers verwijderd.`)}
                        </Paragraph>
                    </Column>
                }
                BottomComponent={
                    <>
                        <Button type={ButtonType.secondary} onClick={() => setModalIsVisible(false)}>
                            Annuleren
                        </Button>
                        <Button
                            danger={true}
                            type={ButtonType.primary}
                            icon={IconType.delete}
                            onClick={handleDelete}
                            loading={deleteRegistratorLoading}
                        >
                            Verwijderen
                        </Button>
                    </>
                }
            />
        </Modal>
    )

    async function handleDelete() {
        await taalhuisRegistrationDelete(taalhuisRegistrationsCreateResponse)

        if (deleteRegistratorError) {
            return (
                <ErrorBlock
                    title={i18n._(t`Er ging iets fout`)}
                    message={i18n._(t`Wij konden de gegevens niet verwijderen, probeer het opnieuw`)}
                />
            )
        }

        if (deleteRegistratorData) {
            NotificationsManager.success(
                i18n._(t`Aanmelder is verwijderd`),
                i18n._(t`Je wordt teruggestuurd naar de overzichtspagina`)
            )
            history.push(routes.authorized.participants.taalhuis.registrations.overview)
        }
    }
}
