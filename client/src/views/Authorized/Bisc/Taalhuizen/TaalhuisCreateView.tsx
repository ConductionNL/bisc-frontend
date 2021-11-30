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
import { Forms } from 'utils/forms'
import { breadcrumbItems } from 'components/Core/Breadcrumbs/breadcrumbItems'
import TaalhuisInformationFieldset, {
    TaalhuisInformationFieldsetModel,
} from 'components/fieldsets/taalhuis/TaalhuisInformationFieldset'
import { usePostOrganization } from 'api/organization/organization'
import { MutationErrorProvider } from 'components/Core/MutationErrorProvider/MutationErrorProvider'
import { biscRoutes } from 'routes/bisc/biscRoutes'
import { getMappedTaalhuisFormFields } from 'components/Domain/Taalhuis/mappers/taalhuisFieldsMappers'

interface Props {}

interface FormModel extends TaalhuisInformationFieldsetModel {}

const TaalhuisCreateView: React.FunctionComponent<Props> = () => {
    const { i18n } = useLingui()
    const { mutate: postOrganization, loading, error } = usePostOrganization()
    const history = useHistory()

    return (
        <Form onSubmit={handleCreate}>
            <Headline
                title={i18n._(t`Nieuw taalhuis`)}
                TopComponent={<Breadcrumbs breadcrumbItems={[breadcrumbItems.bisc.taalhuis.overview]} />}
            />
            <MutationErrorProvider mutationError={error?.data}>
                <TaalhuisInformationFieldset />
            </MutationErrorProvider>
            <Actionbar
                RightComponent={
                    <Row>
                        <Button type={ButtonType.secondary} onClick={() => history.goBack()}>
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
        const input = getMappedTaalhuisFormFields(formData)

        try {
            const response = await postOrganization(input)

            NotificationsManager.success(
                i18n._(t`Taalhuis is aangemaakt`),
                i18n._(t`Je wordt doorgestuurd naar de gegevens van het taalhuis`)
            )

            history.push(biscRoutes.taalhuizen.detail(response.id).index)
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
            if (error.data) {
                NotificationsManager.error(i18n._(t`Actie mislukt`), i18n._(t`Er is een onverwachte fout opgetreden`))
            }
        }
    }
}

export default TaalhuisCreateView
