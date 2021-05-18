import { t } from '@lingui/macro'
import { useLingui } from '@lingui/react'
import Headline from 'components/Chrome/Headline'
import Actionbar from 'components/Core/Actionbar/Actionbar'
import Button, { ButtonType } from 'components/Core/Button/Button'
import { NotificationsManager } from 'components/Core/Feedback/Notifications/NotificationsManager'
import Form from 'components/Core/Form/Form'
import { IconType } from 'components/Core/Icon/IconType'
import Row from 'components/Core/Layout/Row/Row'
import Modal from 'components/Core/Modal/Modal'
import TaalhuizenDetailBreadcrumbs from 'components/Domain/Bisc/Taalhuizen/Breadcrumbs/TaalhuizenDetailBreadcrumbs'
import TaalhuisInformationFieldset, {
    TaalhuisInformationFieldsetModel,
} from 'components/fieldsets/taalhuis/TaalhuisInformationFieldset'
import {
    LanguageHouse,
    LanguageHouseEmployeeDocument,
    useLanguageHouseQuery,
    useUpdateLanguageHouseMutation,
} from 'generated/graphql'
import { AddressIterableType } from 'graphql/types'
import React, { useEffect, useState } from 'react'
import { RouteComponentProps, useHistory } from 'react-router-dom'
import { BiscTaalhuizenDetailRouteParams } from 'routes/bisc/biscRoutes'
import { routes } from 'routes/routes'
import { Forms } from 'utils/forms'
import TaalhuisDeleteModalView from '../../Modals/TaalhuisDeleteModalView'

interface Props extends RouteComponentProps<BiscTaalhuizenDetailRouteParams> {
    languageHouse: LanguageHouse
}

export interface FormModel extends TaalhuisInformationFieldsetModel {}

const DataUpdateView: React.FunctionComponent<Props> = props => {
    const { languageHouse } = props
    const { languageHouseId } = props.match.params
    const { i18n } = useLingui()
    const history = useHistory()

    const [modalIsVisible, setModalIsVisible] = useState<boolean>(false)

    const { refetch } = useLanguageHouseQuery({
        variables: { languageHouseId },
    })

    useEffect(() => {
        // running query once, just to get the latest info
        refetch({ languageHouseId })
    }, [languageHouseId])

    const [updateLanguageHouse, { loading: mutationLoading }] = useUpdateLanguageHouseMutation()

    const handleEdit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        const formData = Forms.getFormDataFromFormEvent<FormModel>(e)
        const response = await updateLanguageHouse({
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
            refetchQueries: [{ query: LanguageHouseEmployeeDocument, variables: { languageHouseId: languageHouseId } }],
        })

        if (response.errors?.length || !response.data) {
            return
        }

        NotificationsManager.success(
            i18n._(t`Taalhuis is aangemaakt`),
            i18n._(t`U word doorgestuurd naar de gegevens van het taalhuis`)
        )

        history.push(routes.authorized.bisc.taalhuizen.detail(languageHouseId).index)
    }

    return (
        <Form onSubmit={handleEdit}>
            <Headline title={languageHouse.name} TopComponent={<TaalhuizenDetailBreadcrumbs />} />
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
        const address: AddressIterableType = languageHouse.address && languageHouse.address[0]
        return (
            <>
                <TaalhuisInformationFieldset
                    prefillData={{
                        taalhuis: languageHouse.name,
                        street: address?.street,
                        houseNumber: address?.houseNumber,
                        houseNumberSuffix: address?.houseNumberSuffix,
                        postalCode: address?.postalCode,
                        city: address?.locality,
                        phoneNumber: languageHouse.phoneNumber || undefined,
                        email: languageHouse.email || undefined,
                    }}
                />
                <Modal isOpen={modalIsVisible} onRequestClose={() => setModalIsVisible(false)}>
                    <TaalhuisDeleteModalView
                        onClose={() => setModalIsVisible(false)}
                        taalhuis={languageHouse}
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
