import { t } from '@lingui/macro'
import { useLingui } from '@lingui/react'
import Headline from 'components/Chrome/Headline'
import Actionbar from 'components/Core/Actionbar/Actionbar'
import { Breadcrumbs } from 'components/Core/Breadcrumbs/Breadcrumbs'
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
    ContactInformationFieldsetFormModel,
} from 'components/fieldsets/shared/ContactInformationFieldset'
import { useProviderQuery, useUpdateProviderMutation } from 'generated/graphql'
import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import { routes } from 'routes/routes'
import { Forms } from 'utils/forms'
import { breadcrumbItems } from 'components/Core/Breadcrumbs/breadcrumbItems'
import { SupplierDetailLocationStateProps } from '../SupplierDetailView'
import { AddressIterableType } from 'graphql/types'

interface FormModel
    extends BranchInformationFieldsetFormModel,
        Pick<ContactInformationFieldsetFormModel, 'email' | 'telephone'> {}

interface Props {
    routeState: SupplierDetailLocationStateProps
}

const DataUpdateView: React.FunctionComponent<Props> = props => {
    const { routeState } = props
    const { i18n } = useLingui()
    const history = useHistory()
    const [deleteModalOpen, setDeleteModalOpen] = useState<boolean>(false)
    const { data, loading: queryLoading, error } = useProviderQuery({ variables: { id: routeState.supplierId } })
    const [updateSupplier, { loading: updateLoading }] = useUpdateProviderMutation()

    const handleUpdate = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const formData = Forms.getFormDataFromFormEvent<FormModel>(e)
        const response = await updateSupplier({
            variables: {
                input: {
                    id: routeState.supplierId,
                    address: {
                        street: formData.branchStreet,
                        houseNumber: formData.branchHouseNumber,
                        houseNumberSuffix: formData.branchHouseNumberSuffix,
                        postalCode: formData.branchPostalCode,
                        locality: formData.branchLocality,
                    },
                    name: formData.branch,
                    email: formData.email,
                    phoneNumber: formData.telephone,
                },
            },
        })

        if (response.errors?.length || !response.data) {
            return
        }

        NotificationsManager.success(
            i18n._(t`Aanbieder is bewerkt`),
            i18n._(t`U word doorgestuurd naar de gegevens van de aanbieder`)
        )

        history.push({
            pathname: routes.authorized.supplier.bisc.read.index,
            state: {
                supplierId: response.data.updateProvider?.provider?.id,
                supplierName: response.data.updateProvider?.provider?.name,
            } as SupplierDetailLocationStateProps,
        })
    }

    return (
        <Form onSubmit={handleUpdate}>
            <Headline
                title={i18n._(t`Aanbieder ${routeState.supplierName}`)}
                TopComponent={<Breadcrumbs breadcrumbItems={[breadcrumbItems.bisc.aanbieders.overview]} />}
            />
            {renderForm()}
            <Modal isOpen={deleteModalOpen} onRequestClose={() => setDeleteModalOpen(false)}>
                {/* <DeleteSupplierModal
                    supplierid={routeState.supplierId}
                    suppliername={routeState.supplierName}
                    onClose={() => setDeleteModalOpen(false)}
                /> */}
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
        if (error || !data || !data.provider) {
            return (
                <ErrorBlock
                    title={i18n._(t`Er ging iets fout`)}
                    message={i18n._(t`Wij konden de gegevens niet ophalen, probeer het opnieuw`)}
                />
            )
        }
        const address: AddressIterableType = data.provider.address && data.provider.address[0]
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
                        branch: data?.provider?.name,
                        branchStreet: address.street,
                        branchHouseNumber: address.houseNumber,
                        branchHouseNumberSuffix: address.houseNumberSuffix,
                        branchPostalCode: address.postalCode,
                        branchLocality: address.locality,
                    }}
                />
                <HorizontalRule />
                <ContactInformationFieldset
                    prefillData={{
                        telephone: data?.provider?.phoneNumber,
                        email: data?.provider?.email,
                    }}
                    fieldControls={{
                        postalCode: {
                            hidden: true,
                        },
                        locality: {
                            hidden: true,
                        },
                        contactPersonTelephone: {
                            hidden: true,
                        },
                        contactPreference: {
                            hidden: true,
                        },
                        address: {
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
                                onClick={() =>
                                    history.push({
                                        pathname: routes.authorized.supplier.bisc.read.data,
                                        state: routeState,
                                    })
                                }
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
