import { t } from '@lingui/macro'
import { useLingui } from '@lingui/react'
import React from 'react'
import { useHistory, useParams } from 'react-router-dom'
import Headline from '../../../../../../components/Chrome/Headline'
import Actionbar from '../../../../../../components/Core/Actionbar/Actionbar'
import Breadcrumb from '../../../../../../components/Core/Breadcrumb/Breadcrumb'
import Breadcrumbs from '../../../../../../components/Core/Breadcrumb/Breadcrumbs'
import Button, { ButtonType } from '../../../../../../components/Core/Button/Button'
import ErrorBlock from '../../../../../../components/Core/Feedback/Error/ErrorBlock'
import { NotificationsManager } from '../../../../../../components/Core/Feedback/Notifications/NotificationsManager'
import Spinner, { Animation } from '../../../../../../components/Core/Feedback/Spinner/Spinner'
import Form from '../../../../../../components/Core/Form/Form'
import HorizontalRule from '../../../../../../components/Core/HorizontalRule/HorizontalRule'
import Center from '../../../../../../components/Core/Layout/Center/Center'
import Row from '../../../../../../components/Core/Layout/Row/Row'
import Space from '../../../../../../components/Core/Layout/Space/Space'
import AccountInformationFieldset from '../../../../../../components/fieldsets/shared/AccountInformationFieldset'
import AvailabillityFieldset from '../../../../../../components/fieldsets/shared/AvailabillityFieldset'
import InformationFieldset from '../../../../../../components/fieldsets/shared/InformationFieldset'
import { useMockQuery } from '../../../../../../components/hooks/useMockQuery'
import { useMockMutation } from '../../../../../../hooks/UseMockMutation'
import { routes } from '../../../../../../routes'
import { Forms } from '../../../../../../utils/forms'
import { coworkerDetailMock, CoworkerDetailResponseMock, coworkerDetailUpdateResponseMock, CoworkerDetailVariablesMock } from '../mocks/coworkers'

interface Params {
    id: string
    name: string
    coworkername: string
    coworkerid: string
}

interface Props {}

const CoworkersCoordinatorDetailView: React.FunctionComponent<Props> = () => {
    const { i18n } = useLingui()
    const history = useHistory()
    const { id, name, coworkername, coworkerid } = useParams<Params>()
    
    const {loading: queryLoading, error, data} = useMockQuery<CoworkerDetailResponseMock, {}>(coworkerDetailMock, false)
    const [updateCoworkerCoordinator, { loading: mutationLoading }] = useMockMutation<CoworkerDetailResponseMock, CoworkerDetailVariablesMock>(coworkerDetailUpdateResponseMock, false)

    const handleCreate = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        try {
            const data = Forms.getFormDataFromFormEvent<CoworkerDetailResponseMock>(e)
            await updateCoworkerCoordinator(data)

            NotificationsManager.success(
                i18n._(t`Coordinator medewerker is aangemaakt`),
                i18n._(t`U word teruggestuurd naar de detail pagina`)
            )
            history.push(
                routes.authorized.supplier.read.coworkers.detail.index(id, name, coworkername, coworkerid)
            )
        } catch (error) {
            NotificationsManager.error(
                i18n._(t`Het is niet gelukt om een coordinator medewerker aan te maken`),
                i18n._(t`Probeer het later opnieuw`)
            )
        }
    }

    return (
        <Form onSubmit={handleCreate}>
            <Headline
                title={`${coworkername}`}
                TopComponent={
                    <Breadcrumbs>
                        <Breadcrumb text={i18n._(t`Aanbieders`)} to={routes.authorized.supplier.overview} />
                    </Breadcrumbs>
                }
            />
            {renderForm()}
        </Form>
    )

    function renderForm() {
        if (queryLoading) {
            return (
                <Center grow={true}>
                    <Spinner type={Animation.pageSpinner} />
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
            <>
                <InformationFieldset prefillData={{
                    lastname: data.lastname,
                    insertion: data.insertion,
                    callSign: data.callSign,
                    phonenumber: data.phonenumber,
                }}  />
                <HorizontalRule />
                <AvailabillityFieldset prefillData={{
                    available: data.available,
                    note: data.note
                }} />
                <HorizontalRule />
                <AccountInformationFieldset prefillData={{
                    email: data.email,
                    roles: data.roles,
                }} />
                <Space pushTop={true} />
                <Actionbar
                    RightComponent={
                        <Row>
                            <Button
                                type={ButtonType.secondary}
                                onClick={() => routes.authorized.supplier.read.coworkers.detail.index(id, name, coworkername, coworkerid)}
                            >
                                {i18n._(t`Annuleren`)}
                            </Button>
                            <Button 
                                type={ButtonType.primary} 
                                submit={true}
                                loading={mutationLoading}
                            >
                                {i18n._(t`Opslaan`)}
                            </Button>
                        </Row>
                    }
                />
            </>
        )
    }
}

export default CoworkersCoordinatorDetailView
