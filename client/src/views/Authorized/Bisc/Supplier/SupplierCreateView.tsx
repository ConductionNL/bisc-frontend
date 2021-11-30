import { t } from '@lingui/macro'
import { useLingui } from '@lingui/react'
import React from 'react'
import { useHistory } from 'react-router-dom'
import Headline from 'components/Chrome/Headline'
import Actionbar from 'components/Core/Actionbar/Actionbar'
import { Breadcrumbs } from 'components/Core/Breadcrumbs/Breadcrumbs'
import Button, { ButtonType } from 'components/Core/Button/Button'
import { NotificationsManager } from 'components/Core/Feedback/Notifications/NotificationsManager'
import Form from 'components/Core/Form/Form'
import Row from 'components/Core/Layout/Row/Row'
import Space from 'components/Core/Layout/Space/Space'
import { routes } from 'routes/routes'
import { Forms } from 'utils/forms'
import { breadcrumbItems } from 'components/Core/Breadcrumbs/breadcrumbItems'
import { BiscSupplierFieldset, BiscSupplierFieldsetModel } from 'components/Domain/Bisc/Supplier/BiscSupplierFieldset'
import { MutationErrorProvider } from 'components/Core/MutationErrorProvider/MutationErrorProvider'
import { usePostSupplier } from 'api/supplier/supplier'
import { getMappedSupplierFormFields } from 'components/Domain/Aanbieder/mappers/supplierFieldsMappers'

interface Props {}

const SupplierCreateView: React.FunctionComponent<Props> = () => {
    const { i18n } = useLingui()
    const history = useHistory()
    const { mutate, loading, error } = usePostSupplier()

    return (
        <Form onSubmit={handleCreate()}>
            <Headline
                title={i18n._(t`Nieuwe aanbieder`)}
                TopComponent={<Breadcrumbs breadcrumbItems={[breadcrumbItems.bisc.aanbieders.overview]} />}
            />
            <MutationErrorProvider mutationError={error?.data}>
                <BiscSupplierFieldset />
            </MutationErrorProvider>
            <Space pushTop={true} />
            <Actionbar
                RightComponent={
                    <Row>
                        <Button
                            type={ButtonType.secondary}
                            onClick={() => history.push(routes.authorized.bisc.suppliers.index)}
                        >
                            {i18n._(t`Annuleren`)}
                        </Button>

                        <Button type={ButtonType.primary} submit={true} loading={loading}>
                            {i18n._(t`Toevoegen`)}
                        </Button>
                    </Row>
                }
            />
        </Form>
    )

    function handleCreate() {
        return async (e: React.FormEvent<HTMLFormElement>) => {
            e.preventDefault()
            const formData = Forms.getFormDataFromFormEvent<BiscSupplierFieldsetModel>(e)
            const input = getMappedSupplierFormFields(formData)

            try {
                const response = await mutate(input)

                NotificationsManager.success(
                    i18n._(t`Aanbieder is aangemaakt`),
                    i18n._(t`Je wordt doorgestuurd naar de gegevens van de aanbieder`)
                )

                history.push(routes.authorized.bisc.suppliers.detail(response.id).data.index)
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
}

export default SupplierCreateView
