import { t } from '@lingui/macro'
import { useLingui } from '@lingui/react'
import Actionbar from 'components/Core/Actionbar/Actionbar'
import Button, { ButtonType } from 'components/Core/Button/Button'
import { NotificationsManager } from 'components/Core/Feedback/Notifications/NotificationsManager'
import Form from 'components/Core/Form/Form'
import Row from 'components/Core/Layout/Row/Row'
import ManagementDataContainer from 'components/Domain/Taalhuis/Management/Containers/ManagementDataFieldsContainer'
import { UserContext } from 'components/Providers/UserProvider/context'
import { useTaalhuisQuery, useUpdateTaalhuisMutation } from 'generated/graphql'
import React, { useContext } from 'react'
import { useHistory } from 'react-router-dom'
import { routes } from 'routes/routes'
import { Forms } from 'utils/forms'
import Headline, { SpacingType } from '../../../../../components/Chrome/Headline'
import Column from '../../../../../components/Core/Layout/Column/Column'
import { ManagementDetailDataMock } from '../Mock/managementDetailMock'

interface Props {}

const DataUpdateView: React.FunctionComponent<Props> = () => {
    const { i18n } = useLingui()
    const userContext = useContext(UserContext)
    const history = useHistory()
    const { data: queryData, loading: queryLoading, error: queryError } = useTaalhuisQuery({
        variables: {
            taalhuisId: userContext.user?.organizationId ?? '',
        },
    })
    const [updateTaalhuis, { loading: mutationLoading }] = useUpdateTaalhuisMutation()

    return (
        <Form onSubmit={handleUpdate}>
            <Headline title={i18n._(t`Beheer`)} spacingType={SpacingType.small} />
            <Column spacing={10}>
                <ManagementDataContainer
                    loading={queryLoading}
                    error={!!queryError}
                    defaultFieldValues={queryData}
                    editable={true}
                />
            </Column>
            <Actionbar
                RightComponent={
                    <Row>
                        <Button
                            loading={mutationLoading}
                            type={ButtonType.primary}
                            onClick={() => history.push(routes.authorized.management.taalhuis.data.update)}
                        >
                            {i18n._(t`Bewerken`)}
                        </Button>
                    </Row>
                }
            />
        </Form>
    )

    async function handleUpdate(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()
        const formData = Forms.getFormDataFromFormEvent<ManagementDetailDataMock>(e)
        const response = await updateTaalhuis(formData)

        if (response.errors?.length) {
            NotificationsManager.error(
                i18n._(t`Het is niet gelukt om uw gegevens aan te passen`),
                i18n._(t`Probeer het later opnieuw`)
            )
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
