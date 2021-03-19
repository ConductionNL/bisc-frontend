import { t } from '@lingui/macro'
import { useLingui } from '@lingui/react'
import React from 'react'
import { useHistory } from 'react-router-dom'
import Headline from 'components/Chrome/Headline'
import Actionbar from 'components/Core/Actionbar/Actionbar'
import Breadcrumb from 'components/Core/Breadcrumb/Breadcrumb'
import Breadcrumbs from 'components/Core/Breadcrumb/Breadcrumbs'
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
    ContactInformationFieldsetModel,
} from 'components/fieldsets/shared/ContactInformationFieldset'
import { AanbiedersDocument, useCreateAanbiederMutation } from 'generated/graphql'
import { routes } from 'routes/routes'
import { Forms } from 'utils/forms'

interface FormModel extends BranchInformationFieldsetFormModel, ContactInformationFieldsetModel {}

interface Props {}

const SupplierCreateView: React.FunctionComponent<Props> = () => {
    const { i18n } = useLingui()
    const history = useHistory()
    const [createSupplier, { loading }] = useCreateAanbiederMutation()

    const handleCreate = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        try {
            const formData = Forms.getFormDataFromFormEvent<FormModel>(e)
            const response = await createSupplier({
                variables: {
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
                refetchQueries: [{ query: AanbiedersDocument }],
            })

            if (response.errors?.length || !response.data) {
                throw new Error()
            }

            if (response) {
                NotificationsManager.success(
                    i18n._(t`Aanbieder is aangemaakt`),
                    i18n._(t`U word doorgestuurd naar de gegevens van de aanbieder`)
                )

                history.push(
                    routes.authorized.supplier.read.data({
                        supplierid: encodeURIComponent(response.data.createAanbieder.id),
                        suppliername: response.data.createAanbieder.name,
                    })
                )
            }
        } catch (error) {
            NotificationsManager.error(
                i18n._(t`Het is niet gelukt om een aanbieder aan te maken`),
                i18n._(t`Probeer het later opnieuw`)
            )
        }
    }

    return (
        <Form onSubmit={handleCreate}>
            <Headline
                title={i18n._(t`Nieuwe aanbieder`)}
                TopComponent={
                    <Breadcrumbs>
                        <Breadcrumb text={i18n._(t`Aanbieders`)} to={routes.authorized.supplier.overview} />
                    </Breadcrumbs>
                }
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
            <ContactInformationFieldset />
            <Space pushTop={true} />
            <Actionbar
                RightComponent={
                    <Row>
                        <Button
                            type={ButtonType.secondary}
                            onClick={() => history.push(routes.authorized.supplier.overview)}
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
