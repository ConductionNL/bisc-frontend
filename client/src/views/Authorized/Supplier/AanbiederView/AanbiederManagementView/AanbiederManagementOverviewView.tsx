import React, { useContext, useState } from 'react'
import { t } from '@lingui/macro'

import Spinner, { Animation } from 'components/Core/Feedback/Spinner/Spinner'
import Center from 'components/Core/Layout/Center/Center'
import { useLingui } from '@lingui/react'
import Headline, { SpacingType } from 'components/Chrome/Headline'
import Column from 'components/Core/Layout/Column/Column'
import ErrorBlock from 'components/Core/Feedback/Error/ErrorBlock'
import {
    AanbiederManagementTab,
    AanbiederManagementTabs,
} from 'components/Domain/Aanbieder/AanbiederManagement/AanbiederManagementTabs'
import {
    AanbiederManagementDataContainer,
    AanbiederManagementDataFormModel,
} from 'components/Domain/Aanbieder/AanbiederManagement/AanbiederManagementDataContainer'
import ActionBar from 'components/Core/Actionbar/Actionbar'
import Row from 'components/Core/Layout/Row/Row'
import Button, { ButtonType } from 'components/Core/Button/Button'
import Form from 'components/Core/Form/Form'
import { UserContext } from 'components/Providers/UserProvider/context'
import { useProviderQuery, useUpdateProviderMutation } from 'generated/graphql'
import { Forms } from 'utils/forms'
import { NotificationsManager } from 'components/Core/Feedback/Notifications/NotificationsManager'

export const AanbiederManagementOverviewView: React.FunctionComponent = () => {
    const { i18n } = useLingui()
    const [isEditing, setIsEditing] = useState(false)
    const { user } = useContext(UserContext)

    const { data, loading, error } = useProviderQuery({ variables: { id: user!.organizationId! } })
    const [updateAanbieder, { loading: updateLoading }] = useUpdateProviderMutation()

    return (
        <>
            <Headline spacingType={SpacingType.small} title={i18n._(t`Beheer`)} />
            <Column spacing={10}>
                {renderTabs()}
                <Form onSubmit={handleEdit}>
                    {renderList()}
                    <ActionBar RightComponent={renderButtons()} />
                </Form>
            </Column>
        </>
    )

    function renderTabs() {
        if (isEditing) {
            return
        }

        return <AanbiederManagementTabs currentTab={AanbiederManagementTab.overview} />
    }

    function renderList() {
        if (loading) {
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

        return <AanbiederManagementDataContainer isEditing={isEditing} queryResult={data} />
    }

    function renderButtons() {
        if (isEditing) {
            return (
                <Row>
                    <Button type={ButtonType.secondary} disabled={updateLoading} onClick={() => setIsEditing(false)}>
                        {i18n._(t`Annuleren`)}
                    </Button>
                    <Button type={ButtonType.primary} submit={true} loading={updateLoading}>
                        {i18n._(t`Opslaan`)}
                    </Button>
                </Row>
            )
        }

        return (
            <Button type={ButtonType.primary} onClick={() => setIsEditing(true)}>
                {i18n._(t`Bewerken`)}
            </Button>
        )
    }

    async function handleEdit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()

        const formData = Forms.getFormDataFromFormEvent<AanbiederManagementDataFormModel>(e)
        if (!formData || !data?.provider) {
            setIsEditing(false)
            return
        }

        const { name, email, telephone, address } = data.provider
        const addressToSave = {
            street: formData.street === undefined ? address?.street : formData.street,
            houseNumber: formData.houseNumber === undefined ? address?.houseNumber : formData.houseNumber,
            houseNumberSuffix: formData.houseNumberSuffix === undefined ? address?.houseNumberSuffix : formData.houseNumberSuffix,
            postalCode: formData.postalCode === undefined ? address?.postalCode : formData.postalCode,
            locality: formData.locality === undefined ? address?.locality : formData.locality,
        }

        const response = await updateAanbieder({
            variables: {
                id: user!.organizationId!,
                name: formData.branch === undefined ? name : formData.branch,
                email: formData.email === undefined ? email : formData.email,
                phoneNumber: formData.phone === undefined ? telephone : formData.phone,
                address: addressToSave,
            },
        })

        if (response.data?.updateProvider) {
            NotificationsManager.success(
                i18n._(t`Aanbieder is bewerkt`),
                // TODO: check with design
                i18n._(t`U word doorgestuurd naar de gegevens van de aanbieder`)
            )
        }

        setIsEditing(false)
        return
    }
}
