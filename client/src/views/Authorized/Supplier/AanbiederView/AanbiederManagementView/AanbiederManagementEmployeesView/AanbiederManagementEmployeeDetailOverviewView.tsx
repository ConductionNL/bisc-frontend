import React, { useState } from 'react'
import { t } from '@lingui/macro'

import Spinner, { Animation } from 'components/Core/Feedback/Spinner/Spinner'
import Center from 'components/Core/Layout/Center/Center'
import { useLingui } from '@lingui/react'
import Headline, { SpacingType } from 'components/Chrome/Headline'
import Column from 'components/Core/Layout/Column/Column'
import ErrorBlock from 'components/Core/Feedback/Error/ErrorBlock'
import {
    AanbiederManagementEmployeeTab,
    AanbiederManagementEmployeeTabs,
} from 'components/Domain/Aanbieder/AanbiederManagement/AanbiederManagementEmployeeTabs'
import Form from 'components/Core/Form/Form'
import ActionBar from 'components/Core/Actionbar/Actionbar'
import { AanbiederManagementDeleteEmployeeButtonContainer } from 'components/Domain/Aanbieder/AanbiederManagement/AanbiederManagementDeleteEmployeeButtonContainer'
import Row from 'components/Core/Layout/Row/Row'
import Button, { ButtonType } from 'components/Core/Button/Button'
import { AanbiederManagementEmployeeDetailFieldsContainer } from 'components/Domain/Aanbieder/AanbiederManagement/AanbiederManagementEmployeeDetailFieldsContainer'
import { useAanbiederEmployeeQuery } from 'generated/graphql'
import { NameFormatters } from 'utils/formatters/name/Name'

interface Props {
    employeeId: string
}

export const AanbiederManagementEmployeeDetailOverviewView: React.FunctionComponent<Props> = props => {
    const { i18n } = useLingui()
    const [isEditing, setIsEditing] = useState(false)
    const { employeeId } = props

    const { data, loading, error } = useAanbiederEmployeeQuery({ variables: { userId: employeeId } })

    if (loading) {
        return (
            <Center grow={true}>
                <Spinner type={Animation.pageSpinner} />
            </Center>
        )
    }

    const fullName = NameFormatters.formattedFullname({
        givenName: data?.aanbiederEmployee.givenName,
        additionalName: data?.aanbiederEmployee.additionalName,
        familyName: data?.aanbiederEmployee.familyName,
    })

    return (
        <>
            {/* TODO: add breadcrumbs */}
            <Headline spacingType={SpacingType.small} title={fullName} />
            <Column spacing={10}>
                {renderTabs()}
                <Form onSubmit={handleEdit}>
                    {renderData()}
                    <ActionBar LeftComponent={renderDeleteButton()} RightComponent={renderEditButton()} />
                </Form>
            </Column>
        </>
    )

    function renderTabs() {
        if (isEditing) {
            return
        }

        return (
            <AanbiederManagementEmployeeTabs
                currentTab={AanbiederManagementEmployeeTab.overview}
                employeeId={employeeId}
            />
        )
    }

    // TODO
    function handleEdit() {
        return
    }

    // TODO
    function renderData() {
        if (error || !data) {
            return (
                <ErrorBlock
                    title={i18n._(t`Er ging iets fout`)}
                    message={i18n._(t`Wij konden de gegevens niet ophalen, probeer het opnieuw`)}
                />
            )
        }

        return (
            <AanbiederManagementEmployeeDetailFieldsContainer isEditing={isEditing} employee={data.aanbiederEmployee} />
        )
    }

    function renderDeleteButton() {
        if (!isEditing) {
            return
        }

        // TODO: use loading const from edit mutation
        return (
            <AanbiederManagementDeleteEmployeeButtonContainer
                loading={loading}
                employeeId={employeeId}
                employeeName={data?.aanbiederEmployee.givenName || ''}
            />
        )
    }

    function renderEditButton() {
        if (isEditing) {
            return (
                <Row>
                    {/* TODO: use loading const from edit mutation */}
                    <Button type={ButtonType.secondary} disabled={loading} onClick={() => setIsEditing(false)}>
                        {i18n._(t`Annuleren`)}
                    </Button>
                    {/* TODO: use loading const from edit mutation */}
                    <Button type={ButtonType.primary} submit={true} loading={loading}>
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
}
