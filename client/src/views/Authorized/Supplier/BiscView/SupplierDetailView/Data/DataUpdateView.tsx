import { t } from '@lingui/macro'
import { useLingui } from '@lingui/react'
import React, { useState } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import Headline from 'components/Chrome/Headline'
import Actionbar from 'components/Core/Actionbar/Actionbar'
import Breadcrumb from 'components/Core/Breadcrumb/Breadcrumb'
import Breadcrumbs from 'components/Core/Breadcrumb/Breadcrumbs'
import Button, { ButtonType } from 'components/Core/Button/Button'
import ErrorBlock from 'components/Core/Feedback/Error/ErrorBlock'
import { NotificationsManager } from 'components/Core/Feedback/Notifications/NotificationsManager'
import Spinner, { Animation } from 'components/Core/Feedback/Spinner/Spinner'
import Form from 'components/Core/Form/Form'
import HorizontalRule from 'components/Core/HorizontalRule/HorizontalRule'
import { IconType } from 'components/Core/Icon/IconType'
import Center from 'components/Core/Layout/Center/Center'
import Row from 'components/Core/Layout/Row/Row'
import Space from 'components/Core/Layout/Space/Space'
import Modal from 'components/Core/Modal/Modal'
import BranchInformationFieldset, {
    BranchInformationFieldsetFormModel,
} from 'components/fieldsets/shared/BranchInformationFieldset'
import ContactInformationFieldset, {
    ContactInformationFieldsetModel,
} from 'components/fieldsets/shared/ContactInformationFieldset'
import { useAanbiederQuery, useUpdateAanbiederMutation } from 'generated/graphql'
import { routes } from 'routes/routes'
import { SupplierDetailParams } from 'routes/supplier/types'
import { Forms } from 'utils/forms'
import AanbiederDeleteModalView from 'components/Domain/Bisc/Suppliers/DeleteSupplierModal'

interface FormModel extends BranchInformationFieldsetFormModel, ContactInformationFieldsetModel {}

interface Props {}

const DataUpdateView: React.FunctionComponent<Props> = () => {
    const { i18n } = useLingui()
    const history = useHistory()
    const params = useParams<SupplierDetailParams>()
    const [deleteModalOpen, setDeleteModalOpen] = useState<boolean>(false)
    const decodedSupplierId = decodeURIComponent(params.supplierid)
    const { data, loading: queryLoading, error } = useAanbiederQuery({ variables: { id: decodedSupplierId } })
    const [updateSupplier, { loading: updateLoading }] = useUpdateAanbiederMutation()

    const handleUpdate = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        try {
            const formData = Forms.getFormDataFromFormEvent<FormModel>(e)
            const response = await updateSupplier({
                variables: {
                    id: decodedSupplierId,
                    address: {
                        street: formData.street || '',
                        houseNumber: formData.streetNr || '',
                        houseNumberSuffix: formData.addition,
                        postalCode: formData.postcode || '',
                        locality: formData.city || '',
                    },
                    name: formData.branch || '',
                    email: formData.email || '',
                    phoneNumber: formData.phone || '',
                },
            })

            if (response.errors?.length || !response.data) {
                throw new Error()
            }

            if (response) {
                NotificationsManager.success(
                    i18n._(t`Aanbieder is bewerkt`),
                    i18n._(t`U word doorgestuurd naar de gegevens van de aanbieder`)
                )

                history.push(
                    routes.authorized.supplier.read.index({
                        supplierid: encodeURIComponent(response.data.updateAanbieder.id),
                        suppliername: response.data.updateAanbieder.name,
                    })
                )
            }
        } catch (error) {
            NotificationsManager.error(
                i18n._(t`Het is niet gelukt om de aanbieder te bewerken`),
                i18n._(t`Probeer het later opnieuw`)
            )
        }
    }

    return (
        <Form onSubmit={handleUpdate}>
            <Headline
                title={i18n._(t`Aanbieder ${params.suppliername}`)}
                TopComponent={
                    <Breadcrumbs>
                        <Breadcrumb text={i18n._(t`Aanbieders`)} to={routes.authorized.supplier.overview} />
                    </Breadcrumbs>
                }
            />
            {renderForm()}
            <Modal isOpen={deleteModalOpen} onRequestClose={() => setDeleteModalOpen(false)}>
                <AanbiederDeleteModalView
                    supplierid={decodedSupplierId}
                    suppliername={params.suppliername}
                    onClose={() => setDeleteModalOpen(false)}
                />
            </Modal>
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
        if (error) {
            return (
                <ErrorBlock
                    title={i18n._(t`Er ging iets fout`)}
                    message={i18n._(t`Wij konden de gegevens niet ophalen, probeer het opnieuw`)}
                />
            )
        }
        return (
            <>
                <BranchInformationFieldset
                    fieldNaming={{
                        branch: {
                            label: i18n._(t`Naam aanbieder`),
                            placeholder: i18n._(t`Naam`),
                        },
                    }}
                    prefillData={{
                        branch: data?.aanbieder.name,
                        street: data?.aanbieder.address?.street,
                        streetNr: data?.aanbieder.address?.houseNumber,
                        addition: data?.aanbieder.address?.houseNumberSuffix,
                        postcode: data?.aanbieder.address?.postalCode,
                        city: data?.aanbieder.address?.locality,
                    }}
                />
                <HorizontalRule />
                <ContactInformationFieldset
                    prefillData={{
                        phone: data?.aanbieder.telephone,
                        email: data?.aanbieder.email,
                    }}
                    fieldControls={{
                        postalCode: {
                            hidden: true,
                        },
                        city: {
                            hidden: true,
                        },
                        phoneNumberContactPerson: {
                            hidden: true,
                        },
                        contactPreference: {
                            hidden: true,
                        },
                    }}
                />
                <Space pushTop={true} />
                <Actionbar
                    LeftComponent={
                        <Button
                            type={ButtonType.secondary}
                            icon={IconType.delete}
                            danger={true}
                            onClick={() => setDeleteModalOpen(true)}
                        >
                            {i18n._(t`Aanbieder verwijderen`)}
                        </Button>
                    }
                    RightComponent={
                        <Row>
                            <Button
                                type={ButtonType.secondary}
                                onClick={() => history.push(routes.authorized.supplier.read.data(params))}
                            >
                                {i18n._(t`Annuleren`)}
                            </Button>

                            <Button type={ButtonType.primary} submit={true} loading={updateLoading}>
                                {i18n._(t`Bewerken`)}
                            </Button>
                        </Row>
                    }
                />
            </>
        )
    }
}

export default DataUpdateView
