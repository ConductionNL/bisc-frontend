import { t } from '@lingui/macro'
import { useLingui } from '@lingui/react'
import React, { useState } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import Headline from '../../../../components/Chrome/Headline'
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
import { taalhuisCreateResponse, TaalhuisFormModel } from './mocks/taalhuizen'

interface Props {}
interface Params {
    id: string
    name: string
}

const TaalhuizenOverviewUpdateView: React.FunctionComponent<Props> = () => {
    const { i18n } = useLingui()
    const history = useHistory()
    const { id, name } = useParams<Params>()
    const [modalIsVisible, setModalIsVisible] = useState<boolean>(false)
    const [updateCoworker, { loading }] = useMockMutation<TaalhuisFormModel, TaalhuisFormModel>(
        taalhuisCreateResponse,
        false
    )

    return (
        <Form onSubmit={handleEdit}>
            <Headline
                title={i18n._(t`${name}`)}
                TopComponent={
                    <Breadcrumbs>
                        <Breadcrumb text={i18n._(t`Taalhuizen`)} to={routes.authorized.taalhuis.overview} />
                    </Breadcrumbs>
                }
            />
            <Section title={i18n._(t`Vestiging`)}>
                <Column spacing={4}>
                    <Field label={i18n._(t`Naam Taalhuis`)} horizontal={true} required={true}>
                        <Input
                            required={true}
                            name="taalhuis"
                            placeholder={i18n._(t`Taalhuis X`)}
                            defaultValue={i18n._(t`Taalhuis X`)}
                            validators={[GenericValidators.required]}
                        />
                    </Field>

                    <Field label={i18n._(t`Straat en huisnr.`)} horizontal={true}>
                        <Input
                            name="straatnaam"
                            placeholder={i18n._(t`Straatnaam`)}
                            defaultValue={i18n._(t`Straatnaam`)}
                        />
                    </Field>

                    <Field label={i18n._(t`Postcode`)} horizontal={true}>
                        <Input name="postcode" placeholder={i18n._(t`1234AB`)} defaultValue={i18n._(t`1234AB`)} />
                    </Field>

                    <Field label={i18n._(t`Plaats`)} horizontal={true}>
                        <Input name="plaatsnaam" placeholder={i18n._(t`Utrecht`)} defaultValue={i18n._(t`Utrecht`)} />
                    </Field>
                </Column>
            </Section>

            <HorizontalRule />
            <Column spacing={12}>
                <Section title={i18n._(t`Contactgegevens`)}>
                    <Column spacing={4}>
                        <Field label={i18n._(t`Telefoonnummer`)} horizontal={true}>
                            <Input
                                name="telefoonnummer"
                                placeholder={i18n._(t`030 - 123 45 67`)}
                                validators={[GenericValidators.required, PhoneNumberValidators.isPhoneNumber]}
                                defaultValue={i18n._(t`030 - 123 45 67`)}
                            />
                        </Field>
                        <Field label={i18n._(t`E-mailadres`)} horizontal={true}>
                            <Input
                                name="email"
                                placeholder={i18n._(t`Taalhuis@email.nl`)}
                                validators={[GenericValidators.required, EmailValidators.isEmailAddress]}
                                defaultValue={i18n._(t`taalhuis@email.nl`)}
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
                            {i18n._(t`Taalhuis verwijderen`)}
                        </Button>
                    </Row>
                }
                RightComponent={
                    <Row>
                        <Button
                            type={ButtonType.secondary}
                            onClick={() => history.push(routes.authorized.taalhuis.overview)}
                        >
                            {i18n._(t`Annuleren`)}
                        </Button>

                        <Button loading={loading} type={ButtonType.primary} submit={true}>
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
                            <SectionTitle title={'Taalhuis X verwijderen'} heading="H4" />
                            <Paragraph>
                                Weet je zeker dat je het taalhuis wil verwijderen? Hiermee worden ook alle onderliggende
                                medewerkers en deelnemers verwijderd.
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
                            >
                                Verwijderen
                            </Button>
                        </>
                    }
                />
            </Modal>
        </Form>
    )

    function handleDelete() {
        alert('deleted')
    }

    async function handleEdit(e: React.FormEvent<HTMLFormElement>) {
        try {
            const formData = Forms.getFormDataFromFormEvent<TaalhuisFormModel>(e)
            const response = await updateCoworker(formData)

            if (!response) {
                NotificationsManager.error('Oops..', 'Er is iets fout gegaan')
                return
            }
            NotificationsManager.success('Succes', 'succeeded')
            history.push(routes.authorized.taalhuis.overview)
        } catch (e) {
            console.log(e)
        }
    }
}

export default TaalhuizenOverviewUpdateView
