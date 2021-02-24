import { t } from '@lingui/macro'
import { useLingui } from '@lingui/react'
import React, { useState } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import Actionbar from '../../../../../../components/Core/Actionbar/Actionbar'
import Breadcrumb from '../../../../../../components/Core/Breadcrumb/Breadcrumb'
import Breadcrumbs from '../../../../../../components/Core/Breadcrumb/Breadcrumbs'
import Button, { ButtonType } from '../../../../../../components/Core/Button/Button'
import LabelTag, { LabelColor } from '../../../../../../components/Core/DataDisplay/LabelTag/LabelTag'
import Input from '../../../../../../components/Core/DataEntry/Input'
import RadioButton from '../../../../../../components/Core/DataEntry/RadioButton'
import { NotificationsManager } from '../../../../../../components/Core/Feedback/Notifications/NotificationsManager'
import Field from '../../../../../../components/Core/Field/Field'
import Section from '../../../../../../components/Core/Field/Section'
import Form from '../../../../../../components/Core/Form/Form'
import HorizontalRule from '../../../../../../components/Core/HorizontalRule/HorizontalRule'
import { IconType } from '../../../../../../components/Core/Icon/IconType'
import Column from '../../../../../../components/Core/Layout/Column/Column'
import Row from '../../../../../../components/Core/Layout/Row/Row'
import Space from '../../../../../../components/Core/Layout/Space/Space'
import Modal from '../../../../../../components/Core/Modal/Modal'
import ModalView from '../../../../../../components/Core/Modal/ModalView'
import PageTitle, { PageTitleSize } from '../../../../../../components/Core/Text/PageTitle'
import SectionTitle from '../../../../../../components/Core/Text/SectionTitle'
import Paragraph from '../../../../../../components/Core/Typography/Paragraph'
import { useMockMutation } from '../../../../../../hooks/UseMockMutation'
import { routes } from '../../../../../../routes'
import { Forms } from '../../../../../../utils/forms'
import { medewerkerCreateResponse } from './medewerkers'
import { FormModel } from './MedewerkersOverviewView'

interface Props {}
interface Params {
    id: string
    name: string
}

const MedewerkersOverviewUpdateView: React.FunctionComponent<Props> = () => {
    const [modalIsVisible, setModalIsVisible] = useState<boolean>(false)
    const { i18n } = useLingui()
    const history = useHistory()
    const { id, name } = useParams<Params>()
    const [updateMedewerker, { data, loading }] = useMockMutation<FormModel, FormModel>(medewerkerCreateResponse, false)

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
                            <Input required={true} name="achternaam" placeholder={i18n._(t`Wit`)} />
                        </Field>

                        <Field label={i18n._(t`Tussenvoegsel`)} horizontal={true}>
                            <Input name="tussenvoegsel" placeholder={i18n._(t`de`)} />
                        </Field>

                        <Field label={i18n._(t`Roepnaam`)} horizontal={true} required={true}>
                            <Input name="roepnaam" placeholder={i18n._(t`Peter`)} required={true} />
                        </Field>

                        <Field label={i18n._(t`Telefoonnummer`)} horizontal={true}>
                            <Input name="telefoonnummer" placeholder={i18n._(t`030 - 123 45 67`)} />
                        </Field>
                    </Column>
                </Section>
            </Column>
            <HorizontalRule />
            <Column spacing={12}>
                <Section title={i18n._(t`Accountgegevens`)}>
                    <Column spacing={4}>
                        <Field label={i18n._(t`E-mailadres`)} horizontal={true} required={true}>
                            <Input name="email" placeholder={i18n._(t`taalhuis@email.nl`)} required={true} />
                        </Field>
                        <Field label={'Rol'} horizontal={true} required={true}>
                            <Column spacing={4}>
                                <Row>
                                    <RadioButton name={'radio1'} />
                                    <LabelTag label="Coördinator" color={LabelColor.red} />
                                </Row>
                                <Row>
                                    <RadioButton name={'radio1'} />
                                    <LabelTag label="Medewerker" color={LabelColor.blue} />
                                </Row>
                            </Column>
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
                        <Button type={ButtonType.secondary} onClick={() => history.goBack()}>
                            {i18n._(t`Annuleren`)}
                        </Button>

                        <Button type={ButtonType.primary} icon={IconType.send} submit={true} loading={loading}>
                            {i18n._(t`Uitnodigen`)}
                        </Button>
                    </Row>
                }
            />
            <Modal isOpen={modalIsVisible} onRequestClose={() => setModalIsVisible(false)}>
                <ModalView
                    onClose={() => setModalIsVisible(false)}
                    ContentComponent={
                        <Column spacing={6}>
                            <SectionTitle title={i18n._(t`'Taalhuis X verwijderen'`)} heading="H4" />
                            <Paragraph>
                                {i18n._(t`
                                Weet je zeker dat je het taalhuis wil verwijderen? Hiermee worden ook alle onderliggende
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
        e.preventDefault()
        try {
            const formData = Forms.getFormDataFromFormEvent<FormModel>(e)
            await updateMedewerker(formData)

            if (data) {
                const medewerker = data as FormModel
                NotificationsManager.success(
                    i18n._(t`Aanbieder is bijgewerkt`),
                    i18n._(t`U word teruggestuurd naar het overzicht`)
                )
                history.push(routes.authorized.taalhuis.medewerkers.read(medewerker.id, medewerker.roepnaam))
            }
        } catch (error) {
            NotificationsManager.error(
                i18n._(t`Het is niet gelukt om een aanbieder aan te maken`),
                i18n._(t`Probeer het later opnieuw`)
            )
        }
    }
}

export default MedewerkersOverviewUpdateView
