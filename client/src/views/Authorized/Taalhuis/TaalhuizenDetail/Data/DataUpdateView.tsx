import { t } from '@lingui/macro'
import { useLingui } from '@lingui/react'
import React, { useState } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import Headline from '../../../../../components/Chrome/Headline'
import Actionbar from '../../../../../components/Core/Actionbar/Actionbar'
import Breadcrumb from '../../../../../components/Core/Breadcrumb/Breadcrumb'
import Breadcrumbs from '../../../../../components/Core/Breadcrumb/Breadcrumbs'
import Button, { ButtonType } from '../../../../../components/Core/Button/Button'
import { NotificationsManager } from '../../../../../components/Core/Feedback/Notifications/NotificationsManager'
import Form from '../../../../../components/Core/Form/Form'
import { IconType } from '../../../../../components/Core/Icon/IconType'
import Column from '../../../../../components/Core/Layout/Column/Column'
import Row from '../../../../../components/Core/Layout/Row/Row'
import Modal from '../../../../../components/Core/Modal/Modal'
import ModalView from '../../../../../components/Core/Modal/ModalView'
import SectionTitle from '../../../../../components/Core/Text/SectionTitle'
import Paragraph from '../../../../../components/Core/Typography/Paragraph'
import TaalhuisInformationFieldset, {
    TaalhuisInformationFieldsetModel,
} from '../../../../../components/fieldsets/taalhuis/TaalhuisInformationFieldset'
import { useMockMutation } from '../../../../../hooks/UseMockMutation'
import { routes } from '../../../../../routes/routes'
import { TaalhuisDetailParams } from '../../../../../routes/taalhuis/types'
import { Forms } from '../../../../../utils/forms'
import { taalhuisCreateResponse } from '../mocks/taalhuizen'

interface Props {}
export interface FormModel extends TaalhuisInformationFieldsetModel {}

const DataUpdateView: React.FunctionComponent<Props> = () => {
    const { i18n } = useLingui()
    const history = useHistory()
    const { taalhuisid, taalhuisname } = useParams<TaalhuisDetailParams>()
    const [modalIsVisible, setModalIsVisible] = useState<boolean>(false)
    const [updateCoworker, { loading }] = useMockMutation<any, any>(taalhuisCreateResponse, false)

    return (
        <Form onSubmit={handleEdit}>
            <Headline
                title={i18n._(t`${taalhuisname}`)}
                TopComponent={
                    <Breadcrumbs>
                        <Breadcrumb text={i18n._(t`Taalhuizen`)} to={routes.authorized.taalhuis.overview} />
                    </Breadcrumbs>
                }
            />
            <TaalhuisInformationFieldset
            // prefillData={{
            //     taalhuis: 'Taalhuis x',
            //     street: 'xxx',
            //     postalCode: '1234AB',
            //     city: 'Utrecht',
            //     phoneNumber: '012345678',
            //     email: 'taalhuis@taalhuis.nl',
            // }}
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
                            {i18n._(t`Taalhuis verwijderen`)}
                        </Button>
                    </Row>
                }
                RightComponent={
                    <Row>
                        <Button
                            type={ButtonType.secondary}
                            onClick={() =>
                                history.push(routes.authorized.taalhuis.read.index({ taalhuisid, taalhuisname }))
                            }
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
            const formData = Forms.getFormDataFromFormEvent<FormModel>(e)
            const response = await updateCoworker(formData)

            if (!response) {
                NotificationsManager.error('Oops..', 'Er is iets fout gegaan')
                return
            }
            NotificationsManager.success('Succes', 'succeeded')
            history.push(routes.authorized.taalhuis.read.data({ taalhuisid, taalhuisname }))
        } catch (e) {
            console.log(e)
        }
    }
}

export default DataUpdateView
