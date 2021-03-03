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
import Spinner, { Animation } from '../../../../../../components/Core/Feedback/Spinner/Spinner'
import HorizontalRule from '../../../../../../components/Core/HorizontalRule/HorizontalRule'
import Center from '../../../../../../components/Core/Layout/Center/Center'
import Row from '../../../../../../components/Core/Layout/Row/Row'
import Space from '../../../../../../components/Core/Layout/Space/Space'
import AccountInformationFieldset from '../../../../../../components/fieldsets/shared/AccountInformationFieldset'
import AvailabillityFieldset from '../../../../../../components/fieldsets/shared/AvailabillityFieldset'
import InformationFieldset from '../../../../../../components/fieldsets/shared/InformationFieldset'
import { useMockQuery } from '../../../../../../components/hooks/useMockQuery'
import { routes } from '../../../../../../routes'
import { coworkerDetailMock, CoworkerDetailResponseMock } from '../mocks/coworkers'

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
    
    const {loading, error, data} = useMockQuery<CoworkerDetailResponseMock, {}>(coworkerDetailMock, false)

    return (
        <>
            <Headline
                title={`${coworkername}`}
                TopComponent={
                    <Breadcrumbs>
                        <Breadcrumb text={i18n._(t`Aanbieders`)} to={routes.authorized.supplier.overview} />
                    </Breadcrumbs>
                }
            />
            {renderForm()}
        </>
    )

    function renderForm() {
        if (loading) {
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
                }} readOnly={true} />
                <HorizontalRule />
                <AvailabillityFieldset prefillData={{
                    available: data.available,
                    note: data.note
                }} readOnly={true}/>
                <HorizontalRule />
                <AccountInformationFieldset prefillData={{
                    email: data.email,
                    roles: data.roles,
                }} readOnly={true}/>
                <Space pushTop={true} />
                <Actionbar
                    RightComponent={
                        <Row>
                            <Button 
                            type={ButtonType.primary} 
                            onClick={() => history.push(routes.authorized.supplier.read.coworkers.detail.update(id, name, coworkername, coworkerid))}>
                                {i18n._(t`Bewerken`)}
                            </Button>
                        </Row>
                    }
                />
            </>
        )
    }
}

export default CoworkersCoordinatorDetailView
