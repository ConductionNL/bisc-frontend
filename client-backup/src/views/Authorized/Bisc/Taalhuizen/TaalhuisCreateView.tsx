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
import { LanguageHousesDocument, useCreateLanguageHouseMutation } from 'generated/graphql'
import { routes } from 'routes/routes'
import { Forms } from 'utils/forms'
import { breadcrumbItems } from 'components/Core/Breadcrumbs/breadcrumbItems'
import TaalhuisInformationFieldset, {
    TaalhuisInformationFieldsetModel,
} from 'components/fieldsets/taalhuis/TaalhuisInformationFieldset'

interface Props {}

interface FormModel extends TaalhuisInformationFieldsetModel {}

const TaalhuisCreateView: React.FunctionComponent<Props> = () => {
    const { i18n } = useLingui()
    const [createLanguageHouse, { loading }] = useCreateLanguageHouseMutation()
    const history = useHistory()

    return (
        <Form onSubmit={handleCreate}>
            <Headline
                title={i18n._(t`Nieuw taalhuis`)}
                TopComponent={<Breadcrumbs breadcrumbItems={[breadcrumbItems.bisc.taalhuis.overview]} />}
            />
            <TaalhuisInformationFieldset />
            <Actionbar
                RightComponent={
                    <Row>
                        <Button
                            type={ButtonType.secondary}
                            onClick={() => history.push(routes.authorized.bisc.taalhuizen.index)}
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

        const response = await createLanguageHouse({
            variables: {
                input: {
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
            refetchQueries: [{ query: LanguageHousesDocument }],
        })

        if (response.errors?.length || !response.data) {
            return
        }

        NotificationsManager.success(
            i18n._(t`Taalhuis is aangemaakt`),
            i18n._(t`Je wordt doorgestuurd naar de gegevens van het taalhuis`)
        )

        const languageHouseId = response?.data.createLanguageHouse?.languageHouse?.id
        const languageHouseName = response?.data.createLanguageHouse?.languageHouse?.name

        if (languageHouseId) {
            history.push({
                pathname: routes.authorized.bisc.taalhuizen.detail(languageHouseId).index,
                state: {
                    taalhuisId: languageHouseId,
                    taalhuisName: languageHouseName,
                },
            })
        }
    }
}

export default TaalhuisCreateView
