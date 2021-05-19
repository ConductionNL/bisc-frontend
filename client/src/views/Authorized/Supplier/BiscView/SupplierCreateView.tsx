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
import HorizontalRule from 'components/Core/HorizontalRule/HorizontalRule'
import Row from 'components/Core/Layout/Row/Row'
import Space from 'components/Core/Layout/Space/Space'
import BranchInformationFieldset, {
    BranchInformationFieldsetFormModel,
} from 'components/fieldsets/shared/BranchInformationFieldset'
import ContactInformationFieldset, {
    ContactInformationFieldsetFormModel,
} from 'components/fieldsets/shared/ContactInformationFieldset'
import { ProvidersDocument, useCreateProviderMutation } from 'generated/graphql'
import { routes } from 'routes/routes'
import { Forms } from 'utils/forms'
import { breadcrumbItems } from 'components/Core/Breadcrumbs/breadcrumbItems'

interface FormModel
    extends BranchInformationFieldsetFormModel,
        Pick<ContactInformationFieldsetFormModel, 'email' | 'telephone'> {}

interface Props {}

const SupplierCreateView: React.FunctionComponent<Props> = () => {
    const { i18n } = useLingui()
    const history = useHistory()
    const [createSupplier, { loading }] = useCreateProviderMutation()

    const handleCreate = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const formData = Forms.getFormDataFromFormEvent<FormModel>(e)

        const response = await createSupplier({
            variables: {
                input: {
                    address: {
                        street: formData.branchStreet ?? '',
                        houseNumber: formData.branchHouseNumber ?? '',
                        houseNumberSuffix: formData.branchHouseNumberSuffix,
                        postalCode: formData.branchPostalCode ?? '',
                        locality: formData.branchLocality ?? '',
                    },
                    name: formData.branch ?? '',
                    email: formData.email ?? '',
                    phoneNumber: formData.telephone ?? '',
                },
            },
            refetchQueries: [{ query: ProvidersDocument }],
        })

        if (response.errors?.length || !response.data) {
            return
        }

        NotificationsManager.success(
            i18n._(t`Aanbieder is aangemaakt`),
            i18n._(t`Je wordt doorgestuurd naar de gegevens van de aanbieder`)
        )

        const newSupplierId = response.data.createProvider?.provider?.id
        const newSupplierName = response.data.createProvider?.provider?.name

        if (newSupplierId) {
            history.push({
                pathname: routes.authorized.bisc.suppliers.detail(newSupplierId).data.index,
                state: {
                    supplierId: newSupplierId,
                    supplierName: newSupplierName,
                },
            })
        }
    }

    return (
        <Form onSubmit={handleCreate}>
            <Headline
                title={i18n._(t`Nieuwe aanbieder`)}
                TopComponent={<Breadcrumbs breadcrumbItems={[breadcrumbItems.bisc.aanbieders.overview]} />}
            />
            <BranchInformationFieldset
                fieldNaming={{
                    branch: {
                        label: i18n._(t`Naam aanbieder`),
                        placeholder: i18n._(t`Naam`),
                    },
                }}
            />
            <HorizontalRule />
            <ContactInformationFieldset
                fieldControls={{
                    address: {
                        hidden: true,
                    },
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
                }}
            />
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
}

export default SupplierCreateView
