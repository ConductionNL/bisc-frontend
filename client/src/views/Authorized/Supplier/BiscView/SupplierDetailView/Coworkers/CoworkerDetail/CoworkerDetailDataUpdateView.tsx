import { t } from '@lingui/macro'
import { useLingui } from '@lingui/react'
import Headline from 'components/Chrome/Headline'
import Actionbar from 'components/Core/Actionbar/Actionbar'
import Breadcrumb from 'components/Core/Breadcrumb/Breadcrumb'
import Breadcrumbs from 'components/Core/Breadcrumb/Breadcrumbs'
import Button, { ButtonType } from 'components/Core/Button/Button'
import ErrorBlock from 'components/Core/Feedback/Error/ErrorBlock'
import { NotificationsManager } from 'components/Core/Feedback/Notifications/NotificationsManager'
import Spinner, { Animation } from 'components/Core/Feedback/Spinner/Spinner'
import Form from 'components/Core/Form/Form'
import HorizontalRule from 'components/Core/HorizontalRule/HorizontalRule'
import Center from 'components/Core/Layout/Center/Center'
import Row from 'components/Core/Layout/Row/Row'
import Space from 'components/Core/Layout/Space/Space'
import AccountInformationFieldset, {
    AccountInformationFieldsetFormModel,
} from 'components/fieldsets/shared/AccountInformationFieldset'
import AvailabillityFieldset, { AvailabillityFieldsetModel } from 'components/fieldsets/shared/AvailabillityFieldset'
import InformationFieldset, { InformationFieldsetModel } from 'components/fieldsets/shared/InformationFieldset'
import { useMockQuery } from 'components/hooks/useMockQuery'
import { AanbiederUserRoleType, useUserRolesByAanbiederIdQuery } from 'generated/graphql'
import { useMockMutation } from 'hooks/UseMockMutation'
import React from 'react'
import { useHistory, useLocation } from 'react-router-dom'
import { routes } from 'routes/routes'
import { NameFormatters } from 'utils/formatters/name/Name'
import { Forms } from 'utils/forms'
import { coworkerDetailMock, CoworkerDetailResponseMock, coworkersCreateMock } from '../mocks/coworkers'
import { CoworkersDetailLocationStateProps } from './CoworkerDetailView'

interface Props {
    routeState: CoworkersDetailLocationStateProps
}

interface FormModel extends InformationFieldsetModel, AvailabillityFieldsetModel, AccountInformationFieldsetFormModel {
    id: number
    lastname: string
    createdAt: string
    updatedAt: string
}

const CoworkerDetailDataView: React.FunctionComponent<Props> = props => {
    const { routeState } = props
    const { i18n } = useLingui()
    const history = useHistory()
    const { data: userRolesData, loading: userRolesLoading, error: userRolesError } = useUserRolesByAanbiederIdQuery({
        variables: {
            aanbiederId: routeState.supplierid,
        },
    })

    const { loading: queryLoading, error, data } = useMockQuery<CoworkerDetailResponseMock, {}>(
        coworkerDetailMock,
        false
    )
    const [updateCoworkerCoordinator, { loading: mutationLoading }] = useMockMutation<FormModel, FormModel>(
        coworkersCreateMock,
        false
    )

    return (
        <Form onSubmit={handleUpdate}>
            <Headline
                title={routeState.coworkername}
                TopComponent={
                    <Breadcrumbs>
                        <Breadcrumb text={i18n._(t`Aanbieders`)} to={routes.authorized.supplier.bisc.overview} />
                    </Breadcrumbs>
                }
            />
            {renderForm()}
        </Form>
    )

    function renderForm() {
        if (queryLoading) {
            return (
                <Center grow={true}>
                    <Spinner type={Animation.pageSpinner} />
                </Center>
            )
        }
        if (error || !data) {
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
                        lastname: data.lastname,
                        insertion: data.insertion,
                        callSign: data.callSign,
                        phonenumber: data.phonenumber,
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
                    // roleOptions={[
                    //     [Roles.coordinator],
                    //     [Roles.mentor],
                    //     [Roles.coordinator, Roles.mentor],
                    //     [Roles.volunteer],
                    // ]}
                    rolesError={!!userRolesError}
                    rolesLoading={userRolesLoading}
                    roleOptions={mapUserRoles()}
                    prefillData={{
                        email: data.email,
                        roles: data.roles,
                    }}
                />
                <Space pushTop={true} />
                <Actionbar
                    RightComponent={
                        <Row>
                            <Button
                                type={ButtonType.secondary}
                                onClick={() => routes.authorized.supplier.bisc.read.coworkers.detail.index}
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

    function mapUserRoles() {
        return userRolesData?.userRolesByAanbiederId.map(role => [role])
    }

    function handleUpdate(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()

        const data = Forms.getFormDataFromFormEvent<FormModel>(e)
        console.log(
            Forms.getObjectsFromListWithStringList<AanbiederUserRoleType>(
                'name',
                data.roles,
                userRolesData?.userRolesByAanbiederId
            ).map(role => role.id)
        )
        // const response = await createAanbiederEmployee({
        //     variables: {
        //         input: {
        //             aanbiederId: routeState.supplierid,
        //             userGroupIds: Forms.getObjectFromListWithStringList(
        //                 'name',
        //                 data.roles,
        //                 userRolesData?.userRolesByAanbiederId
        //             ),
        //             givenName: data.callSign ?? '',
        //             additionalName: data.insertion,
        //             familyName: data.lastname ?? '',
        //             email: data.email ?? '',
        //             telephone: data.phonenumber ?? '',
        //         },
        //     },
        // })

        // if (response.errors?.length || !response.data) {
        //     return
        // }

        NotificationsManager.success(
            i18n._(t`Medewerker is aangemaakt`),
            i18n._(t`U word doorgestuurd naar de medewerker`)
        )

        // history.push({
        //     pathname: routes.authorized.supplier.bisc.read.coworkers.detail.index,
        //     search: '',
        //     hash: '',
        //     state: {
        //         ...routeState,
        //         coworkername: NameFormatters.formattedFullname({
        //             givenName: response.data?.createAanbiederEmployee.givenName,
        //             additionalName: response.data?.createAanbiederEmployee.additionalName,
        //             familyName: response.data?.createAanbiederEmployee.familyName,
        //         }),
        //         coworkerid: response.data?.createAanbiederEmployee.id,
        //     },
        // })
    }
}

export default CoworkerDetailDataView
