import { t } from '@lingui/macro'
import { useLingui } from '@lingui/react'
import React, { useState } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import Actionbar from '../../../../components/Core/Actionbar/Actionbar'
import Breadcrumb from '../../../../components/Core/Breadcrumb/Breadcrumb'
import Breadcrumbs from '../../../../components/Core/Breadcrumb/Breadcrumbs'
import Button, { ButtonType } from '../../../../components/Core/Button/Button'
import Input from '../../../../components/Core/DataEntry/Input'
import { NotificationsManager } from '../../../../components/Core/Feedback/Notifications/NotificationsManager'
import Field from '../../../../components/Core/Field/Field'
import Section from '../../../../components/Core/Field/Section'
import Form from '../../../../components/Core/Form/Form'
import HorizontalRule from '../../../../components/Core/HorizontalRule/HorizontalRule'
import { IconType } from '../../../../components/Core/Icon/IconType'
import Column from '../../../../components/Core/Layout/Column/Column'
import Row from '../../../../components/Core/Layout/Row/Row'
import Space from '../../../../components/Core/Layout/Space/Space'
import Modal from '../../../../components/Core/Modal/Modal'
import ModalView from '../../../../components/Core/Modal/ModalView'
import PageTitle, { PageTitleSize } from '../../../../components/Core/Text/PageTitle'
import SectionTitle from '../../../../components/Core/Text/SectionTitle'
import Paragraph from '../../../../components/Core/Typography/Paragraph'
import { useMockMutation } from '../../../../hooks/UseMockMutation'
import { routes } from '../../../../routes'
import { Forms } from '../../../../utils/forms'
import { EmailValidators } from '../../../../utils/validators/EmailValidators'
import { GenericValidators } from '../../../../utils/validators/GenericValidators'
import { PhoneNumberValidators } from '../../../../utils/validators/PhoneNumberValidator'
import { FormModel } from '../ManagementOverviewView'
import { coworkersCreateResponse } from './coworkers'

interface Props {}
interface Params {
    id: string
    name: string
}

const ManagementMedewerkersUpdate: React.FunctionComponent<Props> = () => {
    const [modalIsVisible, setModalIsVisible] = useState<boolean>(false)
    const { i18n } = useLingui()
    const history = useHistory()
    const { id, name } = useParams<Params>()
    const [updateMedewerker, { loading }] = useMockMutation<FormModel, FormModel>(coworkersCreateResponse, false)
    const [deleteCoworker, { loading: loadingDelete }] = useMockMutation<boolean, boolean>(true, false)

    if (!id) {
        return null
    }

    return (
        <Form onSubmit={handleEdit}>
            <Column spacing={12}>
                <Breadcrumbs>
                    <Breadcrumb text={i18n._(t`test 1`)} to={routes.authorized.kitchensink} />
                    <Breadcrumb text={i18n._(t`test 1`)} />
                    <Breadcrumb text={i18n._(t`test 1`)} />
                    <Breadcrumb text={i18n._(t`test 1`)} />
                </Breadcrumbs>
                <PageTitle title={i18n._(t`Medewerker ${name}`)} size={PageTitleSize.default} />
                <Section title={i18n._(t`Gegevens`)}>
                    <Column spacing={4}>
                        <Field label={i18n._(t`Achternaam`)} horizontal={true} required={true}>
                            <Input
                                required={true}
                                name="achternaam"
                                placeholder={i18n._(t`Wit`)}
                                validators={[GenericValidators.required]}
                            />
                        </Field>

                        <Field label={i18n._(t`Tussenvoegsel`)} horizontal={true}>
                            <Input name="tussenvoegsel" placeholder={i18n._(t`de`)} />
                        </Field>

                        <Field label={i18n._(t`Roepnaam`)} horizontal={true} required={true}>
                            <Input
                                name="roepnaam"
                                placeholder={i18n._(t`Peter`)}
                                required={true}
                                validators={[GenericValidators.required]}
                            />
                        </Field>

                        <Field label={i18n._(t`Telefoonnummer`)} horizontal={true}>
                            <Input
                                name="telefoonnummer"
                                placeholder={i18n._(t`030 - 123 45 67`)}
                                validators={[PhoneNumberValidators.isPhoneNumber]}
                            />
                        </Field>
                    </Column>
                </Section>
            </Column>
            <HorizontalRule />
            <Column spacing={12}>
                <Section title={i18n._(t`Accountgegevens`)}>
                    <Column spacing={4}>
                        <Field label={i18n._(t`E-mailadres`)} horizontal={true} required={true}>
                            <Input
                                name="email"
                                placeholder={i18n._(t`medewerker@email.nl`)}
                                required={true}
                                validators={[GenericValidators.required, EmailValidators.isEmailAddress]}
                            />
                        </Field>
                    </Column>
                </Section>
            </Column>
            <Space pushTop={true} />
            <Actionbar
                LeftComponent={
                    <Row>
                        <Button
                            type={ButtonType.secondary}
                            danger={true}
                            icon={IconType.delete}
                            onClick={() => setModalIsVisible(true)}
                        >
                            {i18n._(t`medewerker verwijderen`)}
                        </Button>
                    </Row>
                }
                RightComponent={
                    <Row>
                        <Button type={ButtonType.secondary} onClick={() => history.goBack()}>
                            {i18n._(t`Annuleren`)}
                        </Button>

                        <Button type={ButtonType.primary} icon={IconType.send} submit={true} loading={loading}>
                            {i18n._(t`Opslaan`)}
                        </Button>
                    </Row>
                }
            />
            <Modal isOpen={modalIsVisible} onRequestClose={() => setModalIsVisible(false)}>
                <ModalView
                    onClose={() => setModalIsVisible(false)}
                    ContentComponent={
                        <Column spacing={6}>
                            <SectionTitle title={i18n._(t`'Medewerker X verwijderen'`)} heading="H4" />
                            <Paragraph>
                                {i18n._(t`
                                Weet je zeker dat je de medewerker wil verwijderen? Hiermee worden ook alle onderliggende
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
                                loading={loadingDelete}
                            >
                                Verwijderen
                            </Button>
                        </>
                    }
                />
            </Modal>
        </Form>
    )

    async function handleDelete() {
        const response = await deleteCoworker(true)

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

        history.push(routes.authorized.management.overview)
    }

    async function handleEdit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()
        try {
            const formData = Forms.getFormDataFromFormEvent<FormModel>(e)
            const response = await updateMedewerker(formData)

            if (!response) {
                NotificationsManager.error(
                    i18n._(t`Het is niet gelukt om een medewerker aan te maken`),
                    i18n._(t`Probeer het later opnieuw`)
                )
            }

            const medewerker = response as FormModel
            NotificationsManager.success(
                i18n._(t`Medewerker is bijgewerkt`),
                i18n._(t`U word teruggestuurd naar het overzicht`)
            )
            history.push(routes.authorized.management.coworkers.read(medewerker.id, medewerker.roepnaam))
        } catch (error) {
            NotificationsManager.error(
                i18n._(t`Het is niet gelukt om een medewerker aan te maken`),
                i18n._(t`Probeer het later opnieuw`)
            )
        }
    }
}

export default ManagementMedewerkersUpdate
