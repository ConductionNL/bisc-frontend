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
import { AvailabilityFieldset, AvailabilityFieldsetModel } from 'components/fieldsets/shared/AvailabilityFieldset'
import InformationFieldset, { InformationFieldsetModel } from 'components/fieldsets/shared/InformationFieldset'
import { ProviderEmployeesDocument, useCreateEmployeeMutation, useUserRolesByProvidersQuery } from 'generated/graphql'
import React, { useState } from 'react'
import { RouteComponentProps, useHistory } from 'react-router-dom'
import { routes } from 'routes/routes'
import { Forms } from 'utils/forms'
import { breadcrumbItems } from 'components/Core/Breadcrumbs/breadcrumbItems'
import { BiscSuppliersDetailRouteParams } from 'routes/bisc/biscRoutes'
import { CoworkerVolunteerFields } from 'components/Domain/Bisc/Management/Fields/CoworkerVolunteerFields'
import { UserRoleEnum } from 'generated/enums'
import { OrganizationTypeEnum, ProviderEmployeeRole } from 'api/types/types'

// TODO: volunteer fields are not implemented yet
interface FormModel extends InformationFieldsetModel, AvailabilityFieldsetModel, AccountInformationFieldsetFormModel {}

interface Props extends RouteComponentProps<BiscSuppliersDetailRouteParams> {}

const CoworkerCreateView: React.FunctionComponent<Props> = props => {
    const { providerId } = props.match.params
    const { i18n } = useLingui()
    const history = useHistory()
    const { data: userRolesData, loading: userRolesLoading, error: userRolesError } = useUserRolesByProvidersQuery({
        variables: {
            providerId: providerId,
        },
    })
    const [createCoworker, { loading }] = useCreateEmployeeMutation()
    const [isVolunteer, setIsVolunteer] = useState<boolean>(false)

    const handleOnFormChange = (e: React.FormEvent<HTMLFormElement>) => {
        const data = Forms.getFormDataFromFormEvent<FormModel>(e)
        if (data && data.role) {
            return setIsVolunteer(data?.role === ProviderEmployeeRole.Volunteer)
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
                            breadcrumbItems.bisc.aanbieders.detail.index('TODO_SUPPLIER_NAME', providerId),
                            breadcrumbItems.bisc.aanbieders.detail.coworkers.overview(providerId),
                        ]}
                    />
                }
            />
            <InformationFieldset />
            <HorizontalRule />
            <AvailabilityFieldset />
            <HorizontalRule />
            <AccountInformationFieldset organizationType={OrganizationTypeEnum.Aanbieder} />
            <HorizontalRule />
            {isVolunteer && <CoworkerVolunteerFields />}
            <Space pushTop={true} />

            <Actionbar
                RightComponent={
                    <Row>
                        <Button
                            type={ButtonType.secondary}
                            onClick={() =>
                                history.push(routes.authorized.bisc.suppliers.detail(providerId).coworkers.index)
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
        const { providerId } = props.match.params
        e.preventDefault()

        const data = Forms.getFormDataFromFormEvent<FormModel>(e)
        const response = await createCoworker({
            variables: {
                input: {
                    providerId: providerId,
                    // userGroupIds: Forms.getObjectsFromListWithStringList<ProviderUserRoleType>(
                    //     'name',
                    //     data.roles,
                    //     userRolesData?.userRolesByProviderId
                    // ).map(role => role.id),
                    givenName: data.callSign ?? '',
                    additionalName: data.additionalName,
                    familyName: data.familyName ?? '',
                    email: data.email ?? '',
                    telephone: data.phonenumber ?? '',
                },
            },
            refetchQueries: [{ query: ProviderEmployeesDocument, variables: { providerId: providerId } }],
        })

        if (response.errors?.length || !response.data) {
            return
        }

        NotificationsManager.success(
            i18n._(t`Medewerker is aangemaakt`),
            i18n._(t`Je wordt doorgestuurd naar de medewerker`)
        )

        const newEmployeeId = response.data.createEmployee?.employee?.id

        if (newEmployeeId) {
            history.push(routes.authorized.bisc.suppliers.detail(providerId).coworkers.detail(newEmployeeId).index)
        }
    }
}

export default CoworkerCreateView
