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
import { AvailabilityFieldset, AvailabilityFieldsetModel } from 'components/fieldsets/shared/AvailabilityFieldset'
import InformationFieldset, { InformationFieldsetModel } from 'components/fieldsets/shared/InformationFieldset'
import {
    ProviderEmployeesDocument,
    // ProviderUserRoleType,
    useProviderEmployeeQuery,
    // UserRoleEnum,
    useUpdateProviderEmployeeMutation,
} from 'generated/graphql'
import React, { useState } from 'react'
import { RouteComponentProps, useHistory } from 'react-router-dom'
import { routes } from 'routes/routes'
import { NameFormatters } from 'utils/formatters/name/Name'
import { Forms } from 'utils/forms'
import { breadcrumbItems } from 'components/Core/Breadcrumbs/breadcrumbItems'
import { CoworkerVolunteerFields } from 'components/Domain/Bisc/Management/Fields/CoworkerVolunteerFields'
import { ManagementCoworkersFieldsContainerFormModel } from 'components/Domain/Aanbieder/AanbiederManagement/AanbiederManagementCoworkerFieldsContainer'
import { BiscSuppliersDetailCoworkersDetailRouteParams } from 'routes/bisc/biscRoutes'

import { OrganizationTypeEnum, ProviderEmployeeRole } from 'api/types/types'

interface Props extends RouteComponentProps<BiscSuppliersDetailCoworkersDetailRouteParams> {}

interface FormModel extends InformationFieldsetModel, AvailabilityFieldsetModel, AccountInformationFieldsetFormModel {}

export const CoworkerDetailDataUpdateView: React.FunctionComponent<Props> = props => {
    const { providerId, providerEmployeeId } = props.match.params
    const { i18n } = useLingui()
    const history = useHistory()

    const { loading: aanbiederLoading, error: aanbiederError, data: aanbiederData } = useProviderEmployeeQuery({
        variables: {
            providerEmployeeId: providerEmployeeId,
        },
    })
    const [updateProviderEmployee, { loading: mutationLoading }] = useUpdateProviderEmployeeMutation()
    const [isVolunteer, setIsVolunteer] = useState<boolean>(false)

    const handleOnFormChange = (e: React.FormEvent<HTMLFormElement>) => {
        const data = Forms.getFormDataFromFormEvent<ManagementCoworkersFieldsContainerFormModel>(e)

        if (data && data.role) {
            return setIsVolunteer(data?.role === ProviderEmployeeRole.Volunteer)
        }
    }

    return (
        <>
            <Form onSubmit={handleUpdate} onChange={handleOnFormChange}>
                <Headline
                    title={'TODO_COWORKER_NAME'}
                    TopComponent={
                        <Breadcrumbs
                            breadcrumbItems={[
                                breadcrumbItems.bisc.aanbieders.overview,
                                breadcrumbItems.bisc.aanbieders.detail.index('TODO_SUPPLIER_NAME', providerId),
                                breadcrumbItems.bisc.aanbieders.detail.coworkers.overview(providerId),
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
        if (aanbiederError || !aanbiederData || !aanbiederData.employee) {
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
                        familyName: aanbiederData.employee.familyName,
                        additionalName: aanbiederData.employee.additionalName,
                        callSign: aanbiederData.employee.givenName,
                        phonenumber: aanbiederData.employee.telephone,
                    }}
                />
                <HorizontalRule />
                {/* <AvailabilityFieldset
                    prefillData={{
                        available: aanbiederData.employee.availability ?? undefined,
                        note: aanbiederData.employee.availabilityNotes ?? undefined,
                    }}
                /> */}
                <HorizontalRule />
                <AccountInformationFieldset
                    organizationType={OrganizationTypeEnum.Aanbieder}
                    prefillData={{
                        email: aanbiederData.employee.email,
                        // role: aanbiederData.employee.role,
                    }}
                />
                {isVolunteer && <CoworkerVolunteerFields />}
                <Space pushTop={true} />
                <Actionbar
                    LeftComponent={
                        <AanbiederEmployeeDeleteButtonContainer
                            employeeId={providerEmployeeId}
                            employeeName={NameFormatters.formattedFullname(aanbiederData.employee as any /* todo */)}
                            // loading={aanbiederLoading || userRolesLoading}
                            loading={aanbiederLoading}
                            onSuccessfulDelete={() =>
                                history.push(routes.authorized.bisc.suppliers.detail().coworkers.index)
                            }
                            refetchQueries={[
                                {
                                    query: ProviderEmployeesDocument,
                                    variables: { providerId: providerId },
                                },
                            ]}
                        />
                    }
                    RightComponent={
                        <Row>
                            <Button
                                type={ButtonType.secondary}
                                onClick={() =>
                                    history.push(
                                        routes.authorized.bisc.suppliers.detail().coworkers.detail().data.index
                                    )
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

        if (aanbiederData && aanbiederData.employee) {
            const response = await updateProviderEmployee({
                variables: {
                    input: {
                        id: providerEmployeeId,
                        // TODO send roles
                        // userGroupIds: Forms.getObjectsFromListWithStringList<ProviderUserRoleType>(
                        //     'name',
                        //     data.roles,
                        //     userRolesData?.userRolesByProviderId
                        // ).map(role => role.id),
                        givenName: data.callSign ?? aanbiederData.employee.givenName,
                        additionalName: data.additionalName,
                        familyName: data.familyName ?? aanbiederData.employee.familyName,
                        email: data.email ?? aanbiederData.employee.email,
                        telephone: data.phonenumber ?? aanbiederData.employee.telephone,
                    },
                },
            })

            if (response.errors?.length || !response.data) {
                return
            }

            NotificationsManager.success(
                i18n._(t`Medewerker is bewerkt`),
                i18n._(t`Je wordt doorgestuurd naar de medewerker pagina`)
            )

            history.push(
                routes.authorized.bisc.suppliers.detail(providerId).coworkers.detail(providerEmployeeId).data.index
            )
        }
    }
}
