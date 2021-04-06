import { t } from '@lingui/macro'
import { useLingui } from '@lingui/react'
import {
    ManagementCoworkerFieldsContainer,
    ManagementCoworkersFieldsContainerFormModel,
} from 'components/Domain/Taalhuis/Management/Containers/ManagementCoworkerFieldsContainer'
import { UserContext } from 'components/Providers/UserProvider/context'
import {
    TaalhuisEmployeesDocument,
    TaalhuisUserRoleType,
    useCreateTaalhuisEmployeeMutation,
    useUserRolesByTaalhuisIdQuery,
} from 'generated/graphql'
import React, { useContext } from 'react'
import { useHistory } from 'react-router-dom'
import { NameFormatters } from 'utils/formatters/name/Name'
import Headline, { SpacingType } from 'components/Chrome/Headline'
import Actionbar from 'components/Core/Actionbar/Actionbar'
import { Breadcrumbs } from 'components/Core/Breadcrumbs/Breadcrumbs'
import Button, { ButtonType } from 'components/Core/Button/Button'
import { NotificationsManager } from 'components/Core/Feedback/Notifications/NotificationsManager'
import Form from 'components/Core/Form/Form'
import { IconType } from 'components/Core/Icon/IconType'
import Row from 'components/Core/Layout/Row/Row'
import { routes } from 'routes/routes'
import { Forms } from 'utils/forms'
import { breadcrumbItems } from 'components/Core/Breadcrumbs/breadcrumbItems'

interface Props {}

const CoworkerCreateView: React.FunctionComponent<Props> = () => {
    const { i18n } = useLingui()
    const history = useHistory()
    const userContext = useContext(UserContext)
    const [createEmployee, { loading }] = useCreateTaalhuisEmployeeMutation()
    const { loading: userRolesLoading, error: userRolesError, data: userRolesData } = useUserRolesByTaalhuisIdQuery({
        variables: {
            taalhuisId: userContext.user?.organizationId ?? '',
        },
    })

    return (
        <Form onSubmit={handleCreate}>
            <Headline
                title={i18n._(t`Nieuwe Medewerker `)}
                spacingType={SpacingType.default}
                TopComponent={<Breadcrumbs breadcrumbItems={[breadcrumbItems.bisc.taalhuis.management.index]} />}
            />
            <ManagementCoworkerFieldsContainer
                userRoleValues={userRolesData}
                userRolesError={!!userRolesError}
                userRolesLoading={userRolesLoading}
                editable={true}
            />
            <Actionbar
                RightComponent={
                    <Row>
                        <Button type={ButtonType.secondary} onClick={() => history.goBack()}>
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
        const response = await createEmployee({
            variables: {
                input: {
                    taalhuisId: userContext.user?.organizationId ?? '',
                    userGroupId: Forms.getObjectsFromListWithStringList<TaalhuisUserRoleType>(
                        'name',
                        formData.roles,
                        userRolesData?.userRolesByTaalhuisId
                    )[0].id,
                    givenName: formData.callSign ?? '',
                    additionalName: formData.insertion,
                    familyName: formData.lastname ?? '',
                    email: formData.email ?? '',
                    telephone: formData.phonenumber,
                },
            },
            refetchQueries: [
                { query: TaalhuisEmployeesDocument, variables: { taalhuisId: userContext.user?.organizationId } },
            ],
        })

        if (response.errors?.length || !response.data) {
            return
        }

        NotificationsManager.success(
            i18n._(t`Medewerker is aangemaakt`),
            i18n._(t`U word teruggestuurd naar het overzicht`)
        )

        history.push({
            pathname: routes.authorized.management.taalhuis.coworkers.index,
            state: {
                coworkerId: response.data?.createTaalhuisEmployee.id,
                coworkerName: NameFormatters.formattedFullname({
                    givenName: response.data.createTaalhuisEmployee.givenName,
                    additionalName: response.data.createTaalhuisEmployee.additionalName,
                    familyName: response.data.createTaalhuisEmployee.familyName,
                }),
            },
        })
    }
}

export default CoworkerCreateView
