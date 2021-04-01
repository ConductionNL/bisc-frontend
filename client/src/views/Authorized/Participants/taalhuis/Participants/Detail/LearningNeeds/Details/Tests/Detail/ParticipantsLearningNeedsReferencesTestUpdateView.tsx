import { t } from '@lingui/macro'
import { useLingui } from '@lingui/react'
import Headline, { SpacingType } from 'components/Chrome/Headline'
import Actionbar from 'components/Core/Actionbar/Actionbar'
import Breadcrumb from 'components/Core/Breadcrumb/Breadcrumb'
import Breadcrumbs from 'components/Core/Breadcrumb/Breadcrumbs'
import Button, { ButtonType } from 'components/Core/Button/Button'
import ErrorBlock from 'components/Core/Feedback/Error/ErrorBlock'
import { NotificationsManager } from 'components/Core/Feedback/Notifications/NotificationsManager'
import Spinner, { Animation } from 'components/Core/Feedback/Spinner/Spinner'
import Form from 'components/Core/Form/Form'
import { IconType } from 'components/Core/Icon/IconType'
import Center from 'components/Core/Layout/Center/Center'
import Column from 'components/Core/Layout/Column/Column'
import Row from 'components/Core/Layout/Row/Row'
import Modal from 'components/Core/Modal/Modal'
import ModalView from 'components/Core/Modal/ModalView'
import SectionTitle from 'components/Core/Text/SectionTitle'
import Paragraph from 'components/Core/Typography/Paragraph'
import { TaalhuisParticipantLearningNeedReferenceFields } from 'components/Domain/Taalhuis/TaalhuisLearningNeedsReferenceCreateFields'
import { TaalhuisParticipantLearningNeedReferenceTestFields } from 'components/Domain/Taalhuis/TaalhuisLearningNeedsReferenceTestFields'
import { LearningOutcomeOfferFieldsetModel } from 'components/fieldsets/participants/learningNeeds/fieldsets/LearningOutcomeOfferFieldset'
import { useMockQuery } from 'components/hooks/useMockQuery'
import { useMockMutation } from 'hooks/UseMockMutation'
import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import { routes } from 'routes/routes'
import { Forms } from 'utils/forms'
import { ParticipantDetailLocationStateProps } from '../../../../ParticipantsDetailView'
import { LearningNeedsReferenceDetailsResponse } from '../../../mocks/learningNeeds'

interface Props {
    routeState: ParticipantDetailLocationStateProps
}

interface FormModel extends LearningOutcomeOfferFieldsetModel {}

export const ParticipantsLearningNeedsReferencesTestUpdateView: React.FC<Props> = ({ routeState }) => {
    const history = useHistory()
    const { i18n } = useLingui()
    const { data, loading, error } = useMockQuery(LearningNeedsReferenceDetailsResponse)
    const [modalIsVisible, setModalIsVisible] = useState<boolean>(false)
    const [updateLearningNeedReference, { loading: updateLoading }] = useMockMutation({}, false)
    const [deleteLearningNeedReference, { loading: deleteLoading }] = useMockMutation({}, false)

    return (
        <Form onSubmit={handleUpdate}>
            <Headline
                title={i18n._(t`Toetsresultaat`)}
                subtitle={'André Willemse'}
                spacingType={SpacingType.small}
                TopComponent={
                    <Breadcrumbs>
                        <Breadcrumb
                            text={i18n._(t`Deelnemers`)}
                            to={routes.authorized.participants.taalhuis.participants.overview}
                        />
                        <Breadcrumb
                            text={i18n._(t`Leervragen`)}
                            to={routes.authorized.participants.taalhuis.participants.detail.goals.overview}
                        />
                        <Breadcrumb
                            text={i18n._(t`Met computers leren werken`)}
                            to={routes.authorized.participants.taalhuis.participants.detail.goals.detail.read}
                        />
                    </Breadcrumbs>
                }
            />
            {renderSection()}
            <Actionbar
                LeftComponent={
                    <Button type={ButtonType.secondary} icon={IconType.delete} onClick={() => setModalIsVisible(true)}>
                        {i18n._(t`Toetsresultaat verwijderen`)}
                    </Button>
                }
                RightComponent={
                    <Row>
                        <Button type={ButtonType.secondary} onClick={() => history.goBack()}>
                            {i18n._(t`Annuleren`)}
                        </Button>

                        <Button type={ButtonType.primary} icon={IconType.send} submit={true} loading={updateLoading}>
                            {i18n._(t`Verwijzen`)}
                        </Button>
                    </Row>
                }
            />
            <Modal isOpen={modalIsVisible} onRequestClose={() => setModalIsVisible(false)}>
                <ModalView
                    onClose={() => setModalIsVisible(false)}
                    ContentComponent={
                        <Column spacing={6}>
                            <SectionTitle title={i18n._(t`Toetsresultaat verwijderen`)} heading="H4" />
                            <Paragraph>
                                {i18n._(t`
                                Weet je zeker dat je het toetsresultaat wilt verwijderen?`)}
                            </Paragraph>
                        </Column>
                    }
                    BottomComponent={
                        <>
                            <Button type={ButtonType.secondary} onClick={() => setModalIsVisible(false)}>
                                {i18n._(t`Annuleren`)}
                            </Button>
                            <Button
                                danger={true}
                                type={ButtonType.primary}
                                icon={IconType.delete}
                                onClick={handleDelete}
                                loading={deleteLoading}
                            >
                                {i18n._(t`Verwijderen`)}
                            </Button>
                        </>
                    }
                />
            </Modal>
        </Form>
    )

    function renderSection() {
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

        if (data) {
            return (
                <Column spacing={4}>
                    <TaalhuisParticipantLearningNeedReferenceTestFields defaultValues={data} />
                </Column>
            )
        }
    }

    async function handleUpdate(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()

        const formData = Forms.getFormDataFromFormEvent<FormModel>(e)
        const response = await updateLearningNeedReference(formData)

        if (response?.data) {
            NotificationsManager.success(
                i18n._(t`Deelnemer is bijgewerkt`),
                i18n._(t`U word teruggestuurd naar het overzicht`)
            )
            return
        }
    }

    async function handleDelete() {
        const response = await deleteLearningNeedReference(true)

        if (!response) {
            NotificationsManager.error(
                i18n._(t`Het is niet gelukt om een medewerker te verwijderen`),
                i18n._(t`Probeer het later opnieuw`)
            )
        }

        NotificationsManager.success(
            i18n._(t`Medewerker is verwijderd`),
            i18n._(t`U word teruggestuurd naar het overzicht`)
        )

        history.push(routes.authorized.management.bisc.overview)
    }
}
