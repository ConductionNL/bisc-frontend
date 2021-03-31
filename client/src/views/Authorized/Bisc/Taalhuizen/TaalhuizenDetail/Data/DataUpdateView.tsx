import { t } from '@lingui/macro'
import { useLingui } from '@lingui/react'
import Headline from 'components/Chrome/Headline'
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
import Row from 'components/Core/Layout/Row/Row'
import Modal from 'components/Core/Modal/Modal'
import TaalhuisInformationFieldset, {
    TaalhuisInformationFieldsetModel,
} from 'components/fieldsets/taalhuis/TaalhuisInformationFieldset'
import { useTaalhuisQuery, useUpdateTaalhuisMutation } from 'generated/graphql'
import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import { routes } from 'routes/routes'
import { Forms } from 'utils/forms'
import TaalhuisDeleteModalView from '../../Modals/TaalhuisDeleteModalView'
import { TaalhuizenDetailLocationStateProps } from '../TaalhuizenDetailView'

interface Props {
    routeState: TaalhuizenDetailLocationStateProps
}

export interface FormModel extends TaalhuisInformationFieldsetModel {}

const DataUpdateView: React.FunctionComponent<Props> = props => {
    const { routeState } = props
    const { i18n } = useLingui()
    const history = useHistory()

    const [modalIsVisible, setModalIsVisible] = useState<boolean>(false)
    const { data, loading, error } = useTaalhuisQuery({
        variables: { taalhuisId: routeState.taalhuisId },
    })
    const [updateCoworker, { loading: mutationLoading }] = useUpdateTaalhuisMutation()

    const handleEdit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        const formData = Forms.getFormDataFromFormEvent<FormModel>(e)
        const response = await updateCoworker({
            variables: {
                id: routeState.taalhuisId,
                address: {
                    street: formData.street || '',
                    houseNumber: formData.streetNr || '',
                    houseNumberSuffix: formData.addition,
                    postalCode: formData.postalCode || '',
                    locality: formData.city || '',
                },
                name: formData.taalhuis || '',
                email: formData.email || '',
                phoneNumber: formData.phoneNumber || '',
            },
        })

        if (response.errors?.length || !response.data) {
            return
        }

        NotificationsManager.success(
            i18n._(t`Taalhuis is aangemaakt`),
            i18n._(t`U word doorgestuurd naar de gegevens van het taalhuis`)
        )

        history.push({
            pathname: routes.authorized.bisc.taalhuizen.detail.index,
            state: {
                taalhuisId: response.data.updateTaalhuis.id,
                taalhuisName: response.data.updateTaalhuis.name,
            },
        })
    }

    return (
        <Form onSubmit={handleEdit}>
            <Headline
                title={i18n._(t`${routeState.taalhuisName}`)}
                TopComponent={
                    <Breadcrumbs>
                        <Breadcrumb text={i18n._(t`Taalhuizen`)} to={routes.authorized.bisc.taalhuizen.overview} />
                    </Breadcrumbs>
                }
            />
            {renderViews()}
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
                                history.push({
                                    pathname: routes.authorized.bisc.taalhuizen.detail.data.index,
                                    state: routeState,
                                })
                            }
                        >
                            {i18n._(t`Annuleren`)}
                        </Button>

                        <Button loading={mutationLoading} type={ButtonType.primary} submit={true}>
                            {i18n._(t`Opslaan`)}
                        </Button>
                    </Row>
                }
            />
            <Modal isOpen={modalIsVisible} onRequestClose={() => setModalIsVisible(false)}>
                <TaalhuisDeleteModalView
                    onClose={() => setModalIsVisible(false)}
                    taalhuisid={routeState.taalhuisId}
                    taalhuisname={routeState.taalhuisName}
                    onSuccess={() => {
                        history.push({
                            pathname: routes.authorized.bisc.taalhuizen.detail.index,
                            state: routeState,
                        })
                    }}
                />
            </Modal>
        </Form>
    )

    function renderViews() {
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
            <TaalhuisInformationFieldset
                prefillData={{
                    taalhuis: data.taalhuis.name,
                    street: data.taalhuis.address?.street,
                    streetNr: data.taalhuis.address?.houseNumber,
                    addition: data.taalhuis.address?.houseNumberSuffix,
                    postalCode: data.taalhuis.address?.postalCode,
                    city: data.taalhuis.address?.locality,
                    phoneNumber: data.taalhuis.telephone || undefined,
                    email: data.taalhuis.email || undefined,
                }}
            />
        )
    }
}

export default DataUpdateView
