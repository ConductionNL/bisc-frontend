import { t } from '@lingui/macro'
import { useLingui } from '@lingui/react'
import Headline from 'components/Chrome/Headline'
import Actionbar from 'components/Core/Actionbar/Actionbar'
import Button, { ButtonType } from 'components/Core/Button/Button'
import { NotificationsManager } from 'components/Core/Feedback/Notifications/NotificationsManager'
import Form from 'components/Core/Form/Form'
import HorizontalRule from 'components/Core/HorizontalRule/HorizontalRule'
import { IconType } from 'components/Core/Icon/IconType'
import Row from 'components/Core/Layout/Row/Row'
import Space from 'components/Core/Layout/Space/Space'
import TaalhuizenCoworkersDetailBreadcrumbs from 'components/Domain/Bisc/Taalhuizen/Breadcrumbs/TaalhuizenCoworkersDetailBreadCrumbs'
import AccountInformationFieldset, {
    AccountInformationFieldsetFormModel,
} from 'components/fieldsets/shared/AccountInformationFieldset'
import InformationFieldset, { InformationFieldsetModel } from 'components/fieldsets/shared/InformationFieldset'
import {
    LanguageHouseEmployeesDocument,
    useCreateLanguageHouseEmployeeMutation,
    useUserRolesByLanguageHouseIdQuery,
} from 'generated/graphql'
import React from 'react'
import { useHistory } from 'react-router-dom'
import { routes } from 'routes/routes'
import { Forms } from 'utils/forms'
import { TaalhuizenDetailLocationStateProps } from '../TaalhuizenDetailView'

interface Props {
    routeState: TaalhuizenDetailLocationStateProps
}

interface FormModel extends InformationFieldsetModel, AccountInformationFieldsetFormModel {}

const CoworkersCreateView: React.FunctionComponent<Props> = props => {
    const { routeState } = props
    const { i18n } = useLingui()
    const history = useHistory()
    const [createCoworker, { loading }] = useCreateLanguageHouseEmployeeMutation()
    const { loading: loadingUserRoles, data: userRoles, error: userRolesError } = useUserRolesByLanguageHouseIdQuery({
        variables: { languageHouseId: routeState.taalhuisId },
    })

    const handleCreate = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const formData = Forms.getFormDataFromFormEvent<FormModel>(e)
        const response = await createCoworker({
            variables: {
                input: {
                    languageHouseId: routeState.taalhuisId,
                    userGroupId:
                        userRoles?.userRolesByLanguageHouseId.find(role => role.name === formData.roles)?.id || '',
                    givenName: formData.callSign || '',
                    additionalName: formData.insertion,
                    familyName: formData.lastname || '',
                    email: formData.email || '',
                    telephone: formData.phonenumber || '',
                },
            },
            refetchQueries: [
                { query: LanguageHouseEmployeesDocument, variables: { taalhuisId: routeState.taalhuisId } },
            ],
        })

        if (response.errors?.length || !response.data) {
            return
        }

        NotificationsManager.success(
            i18n._(t`Medewerker is aangemaakt`),
            i18n._(t`U word doorgestuurd naar de gegevens van de medewerker `)
        )

        history.push({
            pathname: routes.authorized.bisc.taalhuizen.detail.coworkers.detail.data,
            state: {
                taalhuisId: routeState.taalhuisId,
                taalhuisName: routeState.taalhuisName,
                coworkerId: response.data.createLanguageHouseEmployee.id,
                coworkerName: response.data.createLanguageHouseEmployee.givenName,
            },
        })
    }

    return (
        <Form onSubmit={handleCreate}>
            <Headline
                title={i18n._(t`Nieuwe medewerker`)}
                TopComponent={<TaalhuizenCoworkersDetailBreadcrumbs routeState={routeState} />}
            />
            <InformationFieldset />
            <HorizontalRule />
            <AccountInformationFieldset
                roleOptions={userRoles?.userRolesByLanguageHouseId.map(role => [role.name])}
                rolesLoading={loadingUserRoles}
                rolesError={!!userRolesError}
            />
            <Space pushTop={true} />
            <Actionbar
                RightComponent={
                    <Row>
                        <Button
                            type={ButtonType.secondary}
                            onClick={() =>
                                history.push({
                                    pathname: routes.authorized.bisc.taalhuizen.detail.coworkers.index,
                                    state: routeState,
                                })
                            }
                        >
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
}

export default CoworkersCreateView
