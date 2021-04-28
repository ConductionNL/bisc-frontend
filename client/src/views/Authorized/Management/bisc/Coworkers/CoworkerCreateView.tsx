import { t } from '@lingui/macro'
import { useLingui } from '@lingui/react'
import Headline, { SpacingType } from 'components/Chrome/Headline'
import Actionbar from 'components/Core/Actionbar/Actionbar'
import { breadcrumbItems } from 'components/Core/Breadcrumbs/breadcrumbItems'
import { Breadcrumbs } from 'components/Core/Breadcrumbs/Breadcrumbs'
import Button, { ButtonType } from 'components/Core/Button/Button'
import { NotificationsManager } from 'components/Core/Feedback/Notifications/NotificationsManager'
import Form from 'components/Core/Form/Form'
import { IconType } from 'components/Core/Icon/IconType'
import Row from 'components/Core/Layout/Row/Row'
import {
    ManagementCoworkerFieldsContainer,
    ManagementCoworkersFieldsContainerFormModel,
} from 'components/Domain/Taalhuis/Management/Containers/ManagementCoworkerFieldsContainer'
import { useCreateBiscEmployeeMutation } from 'generated/graphql'
import React from 'react'
import { useHistory } from 'react-router-dom'
import { routes } from 'routes/routes'
import { NameFormatters } from 'utils/formatters/name/Name'
import { Forms } from 'utils/forms'

interface Props {}

const CoworkerCreateView: React.FunctionComponent<Props> = () => {
    const { i18n } = useLingui()
    const history = useHistory()
    const [createMedewerker, { loading }] = useCreateBiscEmployeeMutation()

    return (
        <Form onSubmit={handleCreate}>
            <Headline
                title={i18n._(t`Nieuwe Medewerker `)}
                spacingType={SpacingType.default}
                TopComponent={<Breadcrumbs breadcrumbItems={[breadcrumbItems.bisc.management.overview]} />}
            />
            <ManagementCoworkerFieldsContainer editable={true} />
            <Actionbar
                RightComponent={
                    <Row>
                        <Button type={ButtonType.secondary} disabled={loading} onClick={() => history.goBack()}>
                            {i18n._(t`Annuleren`)}
                        </Button>

                        <Button type={ButtonType.primary} icon={IconType.send} submit={true} loading={loading}>
                            {i18n._(t`Uitnodigen`)}
                        </Button>
                    </Row>
                }
            />
        </Form>
    )

    async function handleCreate(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()

        const formData = Forms.getFormDataFromFormEvent<ManagementCoworkersFieldsContainerFormModel>(e)
        const response = await createMedewerker({
            variables: {
                input: {
                    givenName: formData.callSign ?? '',
                    additionalName: formData.additionalName,
                    familyName: formData.familyName ?? '',
                    email: formData.email ?? '',
                    telephone: formData.phonenumber,
                },
            },
        })

        if (response.errors || !response.data) {
            return
        }
        NotificationsManager.success(
            i18n._(t`Medewerker is aangemaakt`),
            i18n._(t`Je wordt teruggestuurd naar het overzicht`)
        )

        history.push({
            pathname: routes.authorized.management.bisc.coworkers.detail.index,
            state: {
                coworkerId: response.data.createBiscEmployee.id,
                coworkerName: NameFormatters.formattedFullname(response.data.createBiscEmployee),
            },
        })
    }
}

export default CoworkerCreateView
