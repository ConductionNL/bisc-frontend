import { t } from '@lingui/macro'
import { useLingui } from '@lingui/react'
import Headline from 'components/Chrome/Headline'
import Actionbar from 'components/Core/Actionbar/Actionbar'
import { Breadcrumbs } from 'components/Core/Breadcrumbs/Breadcrumbs'
import Button, { ButtonType } from 'components/Core/Button/Button'
import { NotificationsManager } from 'components/Core/Feedback/Notifications/NotificationsManager'
import Form from 'components/Core/Form/Form'
import HorizontalRule from 'components/Core/HorizontalRule/HorizontalRule'
import { IconType } from 'components/Core/Icon/IconType'
import Row from 'components/Core/Layout/Row/Row'
import Space from 'components/Core/Layout/Space/Space'
import AccountInformationFieldset, {
    AccountInformationFieldsetFormModel,
} from 'components/fieldsets/shared/AccountInformationFieldset'
import AvailabillityFieldset, { AvailabillityFieldsetModel } from 'components/fieldsets/shared/AvailabillityFieldset'
import InformationFieldset, { InformationFieldsetModel } from 'components/fieldsets/shared/InformationFieldset'
import {
    ProviderEmployeesDocument,
    ProviderUserRoleType,
    useCreateProviderEmployeeMutation,
    UserRoleEnum,
    useUserRolesByProviderIdQuery,
} from 'generated/graphql'
import React, { useState } from 'react'
import { useHistory, useLocation } from 'react-router-dom'
import { routes } from 'routes/routes'
import { NameFormatters } from 'utils/formatters/name/Name'
import { Forms } from 'utils/forms'
import { breadcrumbItems } from 'components/Core/Breadcrumbs/breadcrumbItems'
import { SupplierDetailLocationStateProps } from '../SupplierDetailView'
import { CoworkersLocationStateProps } from './CoworkersView'
import { CoworkerVolunteerFields } from 'components/Domain/Bisc/Management/Fields/CoworkerVolunteerFields'
import { ManagementCoworkersFieldsContainerFormModel } from 'components/Domain/Taalhuis/Management/Containers/ManagementCoworkerFieldsContainer'

// TODO: volunteer fields are not implemented yet
interface FormModel extends InformationFieldsetModel, AvailabillityFieldsetModel, AccountInformationFieldsetFormModel {}

interface Props {
    routeState: CoworkersLocationStateProps
}

const CoworkerCreateView: React.FunctionComponent<Props> = props => {
    const { routeState } = props
    const { i18n } = useLingui()
    const history = useHistory()
    const { state } = useLocation<SupplierDetailLocationStateProps>()
    const { data: userRolesData, loading: userRolesLoading, error: userRolesError } = useUserRolesByProviderIdQuery({
        variables: {
            providerId: state.supplierId,
        },
    })
    const [createProviderEmployee, { loading }] = useCreateProviderEmployeeMutation()
    const [isVolunteer, setIsVolunteer] = useState<boolean>(false)

    const handleOnFormChange = (e: React.FormEvent<HTMLFormElement>) => {
        const data = Forms.getFormDataFromFormEvent<ManagementCoworkersFieldsContainerFormModel>(e)
        if (data && data.roles) {
            return setIsVolunteer(data?.roles.includes(UserRoleEnum.AanbiederVolunteer))
        }
    }

    return (
        <Form onSubmit={handleCreate} onChange={handleOnFormChange}>
            <Headline
                title={i18n._(t`Nieuwe medewerker`)}
                TopComponent={
                    <Breadcrumbs
                        breadcrumbItems={[
                            breadcrumbItems.bisc.aanbieders.overview,
                            breadcrumbItems.bisc.aanbieders.detail.index(routeState.supplierName, routeState),
                            breadcrumbItems.bisc.aanbieders.detail.coworkers.overview(routeState),
                        ]}
                    />
                }
            />
            <InformationFieldset />
            <HorizontalRule />
            <AvailabillityFieldset />
            <HorizontalRule />
            <AccountInformationFieldset
                rolesError={!!userRolesError}
                rolesLoading={userRolesLoading}
                roleOptions={[
                    [UserRoleEnum.AanbiederCoordinator],
                    [UserRoleEnum.AanbiederMentor],
                    [UserRoleEnum.AanbiederMentor, UserRoleEnum.AanbiederCoordinator],
                    [UserRoleEnum.AanbiederVolunteer],
                ]}
            />
            <HorizontalRule />
            {isVolunteer && <CoworkerVolunteerFields />}
            <Space pushTop={true} />

            <Actionbar
                RightComponent={
                    <Row>
                        <Button
                            type={ButtonType.secondary}
                            onClick={() =>
                                history.push({
                                    pathname: routes.authorized.supplier.bisc.read.coworkers.overview,
                                    state: routeState,
                                })
                            }
                        >
                            {i18n._(t`Annuleren`)}
                        </Button>

                        <Button type={ButtonType.primary} submit={true} loading={loading} icon={IconType.send}>
                            {i18n._(t`Uitnodigen`)}
                        </Button>
                    </Row>
                }
            />
        </Form>
    )

    async function handleCreate(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()

        const data = Forms.getFormDataFromFormEvent<FormModel>(e)
        const response = await createProviderEmployee({
            variables: {
                input: {
                    providerId: state.supplierId,
                    userGroupIds: Forms.getObjectsFromListWithStringList<ProviderUserRoleType>(
                        'name',
                        data.roles,
                        userRolesData?.userRolesByProviderId
                    ).map(role => role.id),
                    givenName: data.callSign ?? '',
                    additionalName: data.additionalName,
                    familyName: data.familyName ?? '',
                    email: data.email ?? '',
                    telephone: data.phonenumber ?? '',
                },
            },
            refetchQueries: [{ query: ProviderEmployeesDocument, variables: { providerId: routeState.supplierId } }],
        })

        if (response.errors?.length || !response.data) {
            return
        }

        NotificationsManager.success(
            i18n._(t`Medewerker is aangemaakt`),
            i18n._(t`U word doorgestuurd naar de medewerker`)
        )

        history.push({
            pathname: routes.authorized.supplier.bisc.read.coworkers.detail.index,
            search: '',
            hash: '',
            state: {
                ...routeState,
                coworkerName: NameFormatters.formattedFullname({
                    givenName: response.data?.createProviderEmployee.givenName,
                    additionalName: response.data?.createProviderEmployee.additionalName,
                    familyName: response.data?.createProviderEmployee.familyName,
                }),
                coworkerId: response.data?.createProviderEmployee.userId,
            },
        })
    }
}

export default CoworkerCreateView
