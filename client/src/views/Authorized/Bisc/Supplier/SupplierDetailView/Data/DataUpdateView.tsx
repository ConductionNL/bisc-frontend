import { t } from '@lingui/macro'
import { useLingui } from '@lingui/react'
import Headline from 'components/Chrome/Headline'
import Actionbar from 'components/Core/Actionbar/Actionbar'
import { Breadcrumbs } from 'components/Core/Breadcrumbs/Breadcrumbs'
import Button, { ButtonType } from 'components/Core/Button/Button'
import { NotificationsManager } from 'components/Core/Feedback/Notifications/NotificationsManager'
import Form from 'components/Core/Form/Form'
import { IconType } from 'components/Core/Icon/IconType'
import Row from 'components/Core/Layout/Row/Row'
import Space from 'components/Core/Layout/Space/Space'
import Modal from 'components/Core/Modal/Modal'
import React, { useState } from 'react'
import { RouteComponentProps, useHistory } from 'react-router-dom'
import { routes } from 'routes/routes'
import { Forms } from 'utils/forms'
import { breadcrumbItems } from 'components/Core/Breadcrumbs/breadcrumbItems'
import { BiscSuppliersDetailRouteParams } from 'routes/bisc/biscRoutes'
import { useGetSupplier, usePutSupplier } from 'api/supplier/supplier'
import { getMappedSupplierFormFields } from 'components/Domain/Aanbieder/mappers/supplierFieldsMappers'
import { Supplier } from 'api/types/types'
import { BiscSupplierFieldset, BiscSupplierFieldsetModel } from 'components/Domain/Bisc/Supplier/BiscSupplierFieldset'
import { PageQuery } from 'components/Core/PageQuery/PageQuery'
import { MutationErrorProvider } from 'components/Core/MutationErrorProvider/MutationErrorProvider'
import { DeleteModalView } from './DeleteModalView'

interface Props extends RouteComponentProps<BiscSuppliersDetailRouteParams> {}

const DataUpdateView: React.FunctionComponent<Props> = props => {
    const { providerId } = props.match.params
    const { i18n } = useLingui()
    const history = useHistory()
    const [deleteModalOpen, setDeleteModalOpen] = useState<boolean>(false)
    const { mutate, loading, error } = usePutSupplier(providerId)

    // eslint-disable-next-line react-hooks/rules-of-hooks
    return <PageQuery queryHook={() => useGetSupplier(providerId)}>{data => renderPage(data)}</PageQuery>

    function renderPage(supplier: Supplier) {
        return (
            <Form onSubmit={handleUpdate(supplier)}>
                <Headline
                    title={i18n._(t`Aanbieder ${supplier.name}`)}
                    TopComponent={<Breadcrumbs breadcrumbItems={[breadcrumbItems.bisc.aanbieders.overview]} />}
                />
                {renderForm(supplier)}
                <Modal isOpen={deleteModalOpen} onRequestClose={() => setDeleteModalOpen(false)}>
                    <DeleteModalView
                        supplier={supplier}
                        onClose={() => setDeleteModalOpen(false)}
                        onSuccess={() => history.push(routes.authorized.bisc.suppliers.index)}
                    />
                </Modal>
            </Form>
        )
    }

    function handleUpdate(supplier: Supplier) {
        return async (e: React.FormEvent<HTMLFormElement>) => {
            e.preventDefault()
            const formData = Forms.getFormDataFromFormEvent<BiscSupplierFieldsetModel>(e)
            const input = getMappedSupplierFormFields(formData, supplier)

            try {
                await mutate(input)

                NotificationsManager.success(
                    i18n._(t`Aanbieder is bewerkt`),
                    i18n._(t`Je wordt doorgestuurd naar de gegevens van de aanbieder`)
                )

                history.push(routes.authorized.bisc.suppliers.detail(providerId).index)
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
            } catch (error: any) {
                if (error.data) {
                    NotificationsManager.error(
                        i18n._(t`Actie mislukt`),
                        i18n._(t`Er is een onverwachte fout opgetreden`)
                    )
                }
            }
        }
    }

    function renderForm(supplier: Supplier) {
        return (
            <>
                <MutationErrorProvider mutationError={error?.data}>
                    <BiscSupplierFieldset
                        prefillData={{
                            name: supplier.name,
                            'addresses[0].street': supplier.addresses?.[0].street,
                            'addresses[0].houseNumber': supplier.addresses?.[0].houseNumber,
                            'addresses[0].houseNumberSuffix': supplier.addresses?.[0].houseNumberSuffix,
                            'addresses[0].postalCode': supplier.addresses?.[0].postalCode,
                            'addresses[0].locality': supplier.addresses?.[0].locality,
                            'telephones[0].telephone': supplier.telephones?.[0].telephone,
                            'emails[0].email': supplier.emails?.[0].email,
                        }}
                    />
                </MutationErrorProvider>
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
                                disabled={loading}
                                onClick={() =>
                                    history.push(routes.authorized.bisc.suppliers.detail(providerId).data.index)
                                }
                            >
                                {i18n._(t`Annuleren`)}
                            </Button>

                            <Button type={ButtonType.primary} submit={true} loading={loading}>
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
