import { t } from '@lingui/macro'
import { useLingui } from '@lingui/react'
import Headline from 'components/Chrome/Headline'
import Actionbar from 'components/Core/Actionbar/Actionbar'
import Button, { ButtonType } from 'components/Core/Button/Button'
import ErrorBlock from 'components/Core/Feedback/Error/ErrorBlock'
import { NotificationsManager } from 'components/Core/Feedback/Notifications/NotificationsManager'
import Spinner, { Animation } from 'components/Core/Feedback/Spinner/Spinner'
import Form from 'components/Core/Form/Form'
import { IconType } from 'components/Core/Icon/IconType'
import Center from 'components/Core/Layout/Center/Center'
import Row from 'components/Core/Layout/Row/Row'
import Modal from 'components/Core/Modal/Modal'
import TaalhuizenDetailBreadcrumbs from 'components/Domain/Bisc/Taalhuizen/Breadcrumbs/TaalhuizenDetailBreadcrumbs'
import TaalhuisInformationFieldset, {
    TaalhuisInformationFieldsetModel,
} from 'components/fieldsets/taalhuis/TaalhuisInformationFieldset'
import { useLanguageHouseQuery, useUpdateLanguageHouseMutation } from 'generated/graphql'
import { AddressIterableType } from 'graphql/types'
import React, { useState } from 'react'
import { RouteComponentProps, useHistory } from 'react-router-dom'
import { BiscTaalhuizenDetailRouteParams } from 'routes/bisc/biscRoutes'
import { routes } from 'routes/routes'
import { Forms } from 'utils/forms'
import TaalhuisDeleteModalView from '../../Modals/TaalhuisDeleteModalView'

interface Props extends RouteComponentProps<BiscTaalhuizenDetailRouteParams> {
}

export interface FormModel extends TaalhuisInformationFieldsetModel {}

const DataUpdateView: React.FunctionComponent<Props> = props => {
    const { languageHouseId } = props.match.params
    const { i18n } = useLingui()
    const history = useHistory()

    const [modalIsVisible, setModalIsVisible] = useState<boolean>(false)
    const { data, loading, error } = useLanguageHouseQuery({
        variables: { languageHouseId: languageHouseId },
    })
    const [updateCoworker, { loading: mutationLoading }] = useUpdateLanguageHouseMutation()

    const handleEdit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        const formData = Forms.getFormDataFromFormEvent<FormModel>(e)
        const response = await updateCoworker({
            variables: {
                input: {
                    id: languageHouseId,
                    address: {
                        street: formData.street || '',
                        houseNumber: formData.houseNumber || '',
                        houseNumberSuffix: formData.houseNumberSuffix,
                        postalCode: formData.postalCode || '',
                        locality: formData.city || '',
                    },
                    name: formData.taalhuis || '',
                    email: formData.email || '',
                    phoneNumber: formData.phoneNumber || '',
                },
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
            pathname: routes.authorized.bisc.taalhuizen.detail(languageHouseId).index,
            state: {
                taalhuisId: languageHouseId,
                taalhuisName: response.data.updateLanguageHouse?.languageHouse?.name,
            },
        })
    }

    return (
        <Form onSubmit={handleEdit}>
            <Headline title={'TODO_TAALHUIS_NAAM'} TopComponent={<TaalhuizenDetailBreadcrumbs />} />
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
                                history.push(routes.authorized.bisc.taalhuizen.detail(languageHouseId).data.index)
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
        if (error || !data || !data.languageHouse) {
            return (
                <ErrorBlock
                    title={i18n._(t`Er ging iets fout`)}
                    message={i18n._(t`Wij konden de gegevens niet ophalen, probeer het opnieuw`)}
                />
            )
        }

        const address: AddressIterableType = data.languageHouse.address && data.languageHouse.address[0]
        return (
            <>
                <TaalhuisInformationFieldset
                    prefillData={{
                        taalhuis: data.languageHouse.name,
                        street: address?.street,
                        houseNumber: address?.houseNumber,
                        houseNumberSuffix: address?.houseNumberSuffix,
                        postalCode: address?.postalCode,
                        city: address?.locality,
                        phoneNumber: data.languageHouse.phoneNumber || undefined,
                        email: data.languageHouse.email || undefined,
                    }}
                />
                <Modal isOpen={modalIsVisible} onRequestClose={() => setModalIsVisible(false)}>
                    <TaalhuisDeleteModalView
                        onClose={() => setModalIsVisible(false)}
                        taalhuis={data?.languageHouse}
                        onSuccess={() => {
                            history.push(routes.authorized.bisc.taalhuizen.index)
                        }}
                    />
                </Modal>
            </>
        )
    }
}

export default DataUpdateView
