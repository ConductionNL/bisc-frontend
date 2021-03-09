import { t } from '@lingui/macro'
import { useLingui } from '@lingui/react'
import React, { useState } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import Headline from '../../../../../../../components/Chrome/Headline'
import Actionbar from '../../../../../../../components/Core/Actionbar/Actionbar'
import Breadcrumb from '../../../../../../../components/Core/Breadcrumb/Breadcrumb'
import Breadcrumbs from '../../../../../../../components/Core/Breadcrumb/Breadcrumbs'
import Button, { ButtonType } from '../../../../../../../components/Core/Button/Button'
import LabelTag, { LabelColor } from '../../../../../../../components/Core/DataDisplay/LabelTag/LabelTag'
import Input from '../../../../../../../components/Core/DataEntry/Input'
import RadioButton from '../../../../../../../components/Core/DataEntry/RadioButton'
import { NotificationsManager } from '../../../../../../../components/Core/Feedback/Notifications/NotificationsManager'
import Field from '../../../../../../../components/Core/Field/Field'
import Section from '../../../../../../../components/Core/Field/Section'
import Form from '../../../../../../../components/Core/Form/Form'
import HorizontalRule from '../../../../../../../components/Core/HorizontalRule/HorizontalRule'
import { IconType } from '../../../../../../../components/Core/Icon/IconType'
import Column from '../../../../../../../components/Core/Layout/Column/Column'
import Row from '../../../../../../../components/Core/Layout/Row/Row'
import Space from '../../../../../../../components/Core/Layout/Space/Space'
import Modal from '../../../../../../../components/Core/Modal/Modal'
import ModalView from '../../../../../../../components/Core/Modal/ModalView'
import SectionTitle from '../../../../../../../components/Core/Text/SectionTitle'
import Paragraph from '../../../../../../../components/Core/Typography/Paragraph'
import TaalhuisCoworkersInformationFieldset from '../../../../../../../components/fieldsets/shared/TaalhuisCoworkersInformationFieldset'
import { useMockMutation } from '../../../../../../../hooks/UseMockMutation'
import { routes } from '../../../../../../../routes'
import { Forms } from '../../../../../../../utils/forms'
import { EmailValidators } from '../../../../../../../utils/validators/EmailValidators'
import { GenericValidators } from '../../../../../../../utils/validators/GenericValidators'
import { PhoneNumberValidators } from '../../../../../../../utils/validators/PhoneNumberValidator'
import { coworkerCreateResponse } from '../mocks/coworkers'
import { TaalhuisCoworkersFormModel } from '../TaalhuisCoworkersOverviewView'

interface Props {}
interface Params {
    id: string
    name: string
}

const TaalhuisCoworkersUpdateView: React.FunctionComponent<Props> = () => {
    const [modalIsVisible, setModalIsVisible] = useState<boolean>(false)
    const { i18n } = useLingui()
    const history = useHistory()
    const { id, name } = useParams<Params>()
    const [updateCoworker, { loading, data }] = useMockMutation<TaalhuisCoworkersFormModel, TaalhuisCoworkersFormModel>(
        coworkerCreateResponse,
        false
    )
    const [deleteCoworker, { loading: loadingDelete }] = useMockMutation<boolean, boolean>(true, false)

    if (!id) {
        return null
    }

    return (
        <Form onSubmit={handleEdit}>
            <Headline
                title={i18n._(t`Medewerker ${name}`)}
                TopComponent={
                    <Breadcrumbs>
                        <Breadcrumb text={i18n._(t`Taalhuizen`)} to={routes.authorized.taalhuis.overview} />
                        <Breadcrumb text={i18n._(t`${name}`)} to={routes.authorized.taalhuis.read.data(id, name)} />
                    </Breadcrumbs>
                }
            />
            <TaalhuisCoworkersInformationFieldset
                prefillData={{
                    lastName: 'Wit',
                    insertion: 'De',
                    nickName: 'Peter',
                    phoneNumber: 'string',
                    rol: 'string',
                    email: 'string',
                    createdAt: 'string',
                    updatedAt: 'string',
                }}
            />
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
                            <SectionTitle title={i18n._(t`'Medewerker ${name} verwijderen'`)} heading="H4" />
                            <Paragraph>
                                {i18n._(t`
                                Weet je zeker dat je het medewerker wil verwijderen? Hiermee worden ook alle onderliggende
                                medewerkers en deelnemers verwijderd.`)}
                            </Paragraph>
                        </Column>
                    }
                    BottomComponent={
                        <>
                            <Button type={ButtonType.secondary} onClick={() => setModalIsVisible(false)}>
                                i18n._(t`Annuleren`)
                            </Button>
                            <Button
                                danger={true}
                                type={ButtonType.primary}
                                icon={IconType.delete}
                                onClick={handleDelete}
                                loading={loadingDelete}
                            >
                                i18n._(t`Verwijderen`)
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

        history.push(routes.authorized.taalhuis.overview)
    }

    async function handleEdit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()
        try {
            const formData = Forms.getFormDataFromFormEvent<TaalhuisCoworkersFormModel>(e)
            const response = await updateCoworker(formData)

            if (response) {
                const coworker = response as TaalhuisCoworkersFormModel
                NotificationsManager.success(
                    i18n._(t`Medewerker is bijgewerkt`),
                    i18n._(t`U word teruggestuurd naar het overzicht`)
                )
                history.push(routes.authorized.taalhuis.read.detail.data(id, name, coworker.id))
            }
        } catch (error) {
            NotificationsManager.error(
                i18n._(t`Het is niet gelukt om een medewerker aan te maken`),
                i18n._(t`Probeer het later opnieuw`)
            )
        }
    }
}

export default TaalhuisCoworkersUpdateView
