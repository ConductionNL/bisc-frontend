import { t } from '@lingui/macro'
import { useLingui } from '@lingui/react'
import Headline from 'components/Chrome/Headline'
import Actionbar from 'components/Core/Actionbar/Actionbar'
import { Breadcrumbs } from 'components/Core/Breadcrumbs/Breadcrumbs'
import Button, { ButtonType } from 'components/Core/Button/Button'
import ErrorBlock from 'components/Core/Feedback/Error/ErrorBlock'
import { NotificationsManager } from 'components/Core/Feedback/Notifications/NotificationsManager'
import Spinner, { Animation } from 'components/Core/Feedback/Spinner/Spinner'
import Form from 'components/Core/Form/Form'
import HorizontalRule from 'components/Core/HorizontalRule/HorizontalRule'
import Center from 'components/Core/Layout/Center/Center'
import Row from 'components/Core/Layout/Row/Row'
import Space from 'components/Core/Layout/Space/Space'
import { AanbiederEmployeeDeleteButtonContainer } from 'components/Domain/Aanbieder/AanbiederEmployees/AanbiederEmployeeDeleteButtonContainer'
import AccountInformationFieldset, {
    AccountInformationFieldsetFormModel,
} from 'components/fieldsets/shared/AccountInformationFieldset'
import { AvailabillityFieldsetModel } from 'components/fieldsets/shared/AvailabillityFieldset'
import InformationFieldset, { InformationFieldsetModel } from 'components/fieldsets/shared/InformationFieldset'
import {
    ProviderEmployeesDocument,
    ProviderUserRoleType,
    useProviderEmployeeQuery,
    UserRoleEnum,
    useUpdateProviderEmployeeMutation,
    useUserRolesByProviderIdQuery,
} from 'generated/graphql'
import React from 'react'
import { useHistory } from 'react-router-dom'
import { routes } from 'routes/routes'
import { NameFormatters } from 'utils/formatters/name/Name'
import { Forms } from 'utils/forms'
import { breadcrumbItems } from 'components/Core/Breadcrumbs/breadcrumbItems'
import { CoworkersDetailLocationStateProps } from './CoworkerDetailView'

interface Props {
    routeState: CoworkersDetailLocationStateProps
}

interface FormModel extends InformationFieldsetModel, AvailabillityFieldsetModel, AccountInformationFieldsetFormModel {}

export const CoworkerDetailDataUpdateView: React.FunctionComponent<Props> = props => {
    const { routeState } = props
    const { i18n } = useLingui()
    const history = useHistory()
    const { data: userRolesData, loading: userRolesLoading, error: userRolesError } = useUserRolesByProviderIdQuery({
        variables: {
            providerId: routeState.supplierId,
        },
    })
    const { loading: aanbiederLoading, error: aanbiederError, data: aanbiederData } = useProviderEmployeeQuery({
        variables: {
            userId: routeState.coworkerId,
        },
    })
    const [updateProviderEmployee, { loading: mutationLoading }] = useUpdateProviderEmployeeMutation()

    return (
        <>
            <Form onSubmit={handleUpdate}>
                <Headline
                    title={routeState.coworkerName}
                    TopComponent={
                        <Breadcrumbs
                            breadcrumbItems={[
                                breadcrumbItems.bisc.aanbieders.overview,
                                breadcrumbItems.bisc.aanbieders.detail.index(routeState.supplierName, routeState),
                                breadcrumbItems.bisc.aanbieders.detail.coworkers.overview,
                            ]}
                        />
                    }
                />
                {renderForm()}
            </Form>
        </>
    )

    function renderForm() {
        if (aanbiederLoading) {
            return (
                <Center grow={true}>
                    <Spinner type={Animation.pageSpinner} />
                </Center>
            )
        }
        if (aanbiederError || !aanbiederData) {
            return (
                <ErrorBlock
                    title={i18n._(t`Er ging iets fout`)}
                    message={i18n._(t`Wij konden de gegevens niet ophalen, probeer het opnieuw`)}
                />
            )
        }

        return (
            <>
                <InformationFieldset
                    prefillData={{
                        lastname: aanbiederData.providerEmployee.familyName,
                        insertion: aanbiederData.providerEmployee.additionalName,
                        callSign: aanbiederData.providerEmployee.givenName,
                        phonenumber: aanbiederData.providerEmployee.telephone,
                    }}
                />
                {/* <HorizontalRule />
                <AvailabillityFieldset
                    prefillData={{
                        available: data.available,
                        note: data.note,
                    }}
                /> */}
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
                    prefillData={{
                        email: aanbiederData.providerEmployee.email,
                        roles: aanbiederData.providerEmployee.userRoles.map(role => role.name),
                    }}
                />
                <Space pushTop={true} />
                <Actionbar
                    LeftComponent={
                        <AanbiederEmployeeDeleteButtonContainer
                            employeeId={routeState.coworkerId}
                            employeeName={routeState.coworkerName}
                            loading={aanbiederLoading || userRolesLoading}
                            onSuccessfulDelete={() =>
                                history.push({
                                    pathname: routes.authorized.supplier.bisc.read.coworkers.index,
                                    state: routeState,
                                })
                            }
                            refetchQueries={[
                                {
                                    query: ProviderEmployeesDocument,
                                    variables: { providerId: routeState.supplierId },
                                },
                            ]}
                        />
                    }
                    RightComponent={
                        <Row>
                            <Button
                                type={ButtonType.secondary}
                                onClick={() =>
                                    history.push({
                                        pathname: routes.authorized.supplier.bisc.read.coworkers.detail.index,
                                        state: routeState,
                                    })
                                }
                            >
                                {i18n._(t`Annuleren`)}
                            </Button>
                            <Button type={ButtonType.primary} submit={true} loading={mutationLoading}>
                                {i18n._(t`Opslaan`)}
                            </Button>
                        </Row>
                    }
                />
            </>
        )
    }

    async function handleUpdate(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()
        const data = Forms.getFormDataFromFormEvent<FormModel>(e)

        if (aanbiederData) {
            const response = await updateProviderEmployee({
                variables: {
                    input: {
                        userId: routeState.coworkerId,
                        userGroupIds: Forms.getObjectsFromListWithStringList<ProviderUserRoleType>(
                            'name',
                            data.roles,
                            userRolesData?.userRolesByProviderId
                        ).map(role => role.id),
                        givenName: data.callSign ?? aanbiederData.providerEmployee.givenName,
                        additionalName: data.insertion,
                        familyName: data.lastname ?? aanbiederData.providerEmployee.familyName,
                        email: data.email ?? aanbiederData.providerEmployee.email,
                        telephone: data.phonenumber ?? aanbiederData.providerEmployee.telephone,
                    },
                },
            })

            if (response.errors?.length || !response.data) {
                return
            }

            NotificationsManager.success(
                i18n._(t`Medewerker is bewerkt`),
                i18n._(t`U word doorgestuurd naar de medewerker pagina`)
            )

            history.push({
                pathname: routes.authorized.supplier.bisc.read.coworkers.detail.index,
                state: {
                    ...routeState,
                    coworkerName: NameFormatters.formattedFullname({
                        givenName: response.data?.updateProviderEmployee.givenName,
                        additionalName: response.data?.updateProviderEmployee.additionalName,
                        familyName: response.data?.updateProviderEmployee.familyName,
                    }),
                    coworkerId: response.data?.updateProviderEmployee.userId,
                },
            })
        }
    }
}
