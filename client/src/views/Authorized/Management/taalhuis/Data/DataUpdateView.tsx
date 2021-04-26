import { t } from '@lingui/macro'
import { useLingui } from '@lingui/react'
import Headline, { SpacingType } from 'components/Chrome/Headline'
import Actionbar from 'components/Core/Actionbar/Actionbar'
import Button, { ButtonType } from 'components/Core/Button/Button'
import ErrorBlock from 'components/Core/Feedback/Error/ErrorBlock'
import { NotificationsManager } from 'components/Core/Feedback/Notifications/NotificationsManager'
import Spinner, { Animation } from 'components/Core/Feedback/Spinner/Spinner'
import Form from 'components/Core/Form/Form'
import Center from 'components/Core/Layout/Center/Center'
import Row from 'components/Core/Layout/Row/Row'
import {
    ManagementDataContainer,
    ManagementDataContainerFormModel,
} from 'components/Domain/Taalhuis/Management/Containers/ManagementDataFieldsContainer'
import { UserContext } from 'components/Providers/UserProvider/context'
import { useLanguageHouseQuery, useUpdateLanguageHouseMutation } from 'generated/graphql'
import React, { useContext } from 'react'
import { useHistory } from 'react-router-dom'
import { routes } from 'routes/routes'
import { Forms } from 'utils/forms'

interface Props {}

const DataUpdateView: React.FunctionComponent<Props> = () => {
    const { i18n } = useLingui()
    const userContext = useContext(UserContext)
    const history = useHistory()
    const { data: queryData, loading: queryLoading, error: queryError } = useLanguageHouseQuery({
        variables: {
            languageHouseId: userContext.user?.organizationId ?? '',
        },
    })
    const [updateTaalhuis, { loading: mutationLoading }] = useUpdateLanguageHouseMutation()

    return (
        <Form onSubmit={handleUpdate}>
            <Headline title={i18n._(t`Beheer`)} spacingType={SpacingType.small} />
            {renderForm()}
            <Actionbar
                RightComponent={
                    <Row>
                        <Button
                            type={ButtonType.secondary}
                            onClick={() => history.push(routes.authorized.management.taalhuis.data.index)}
                        >
                            {i18n._(t`Annuleren`)}
                        </Button>
                        <Button loading={mutationLoading} type={ButtonType.primary} submit={true}>
                            {i18n._(t`Opslaan`)}
                        </Button>
                    </Row>
                }
            />
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

        if (queryError) {
            return (
                <ErrorBlock
                    title={i18n._(t`Er ging iets fout`)}
                    message={i18n._(t`Wij konden de gegevens niet ophalen, probeer het opnieuw`)}
                />
            )
        }

        return <ManagementDataContainer defaultFieldValues={queryData} editable={true} />
    }

    async function handleUpdate(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()
        const formData = Forms.getFormDataFromFormEvent<ManagementDataContainerFormModel>(e)
        const response = await updateTaalhuis({
            variables: {
                id: userContext.user?.organizationId ?? '',
                address: {
                    street: formData.street,
                    houseNumber: formData.houseNumber,
                    houseNumberSuffix: formData.houseNumberSuffix,
                    postalCode: formData.postalCode,
                    locality: formData.locality,
                },
                name: formData.branch,
                email: formData.email,
                phoneNumber: formData.phone,
            },
        })

        if (response.errors?.length || !response.data) {
            return
        }

        NotificationsManager.success(
            i18n._(t`Uw gegevens zijn opgeslagen`),
            i18n._(t`U word teruggestuurd naar het overzicht`)
        )
        history.push(routes.authorized.management.taalhuis.data.read)
    }
}

export default DataUpdateView
