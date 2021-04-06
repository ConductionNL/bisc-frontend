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
import TaalhuisInformationFieldset, {
    TaalhuisInformationFieldsetModel,
} from 'components/fieldsets/taalhuis/TaalhuisInformationFieldset'
import { TaalhuizenDocument, useCreateTaalhuisMutation } from 'generated/graphql'
import { routes } from 'routes/routes'
import { Forms } from 'utils/forms'
import { breadcrumbItems } from 'components/Core/Breadcrumbs/breadcrumbItems'

interface Props {}

interface FormModel extends TaalhuisInformationFieldsetModel {}

const TaalhuisCreateView: React.FunctionComponent<Props> = () => {
    const { i18n } = useLingui()
    const [createCoworker, { loading }] = useCreateTaalhuisMutation()
    const history = useHistory()

    return (
        <Form onSubmit={handleCreate}>
            <Headline
                title={i18n._(t`Nieuwe taalhuis`)}
                TopComponent={<Breadcrumbs breadcrumbItems={[breadcrumbItems.bisc.taalhuis.overview]} />}
            />
            <TaalhuisInformationFieldset />
            <Actionbar
                RightComponent={
                    <Row>
                        <Button
                            type={ButtonType.secondary}
                            onClick={() => history.push(routes.authorized.bisc.taalhuizen.overview)}
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

    async function handleCreate(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()

        const formData = Forms.getFormDataFromFormEvent<FormModel>(e)
        const response = await createCoworker({
            variables: {
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
            refetchQueries: [{ query: TaalhuizenDocument }],
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
                taalhuisId: response.data.createTaalhuis.id,
                taalhuisName: response.data.createTaalhuis.name,
            },
        })
    }
}

export default TaalhuisCreateView
