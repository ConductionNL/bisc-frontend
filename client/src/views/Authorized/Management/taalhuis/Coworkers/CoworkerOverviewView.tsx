import { i18n } from '@lingui/core'
import { t } from '@lingui/macro'
import { ManagementCoworkersList } from 'components/Domain/Taalhuis/Management/Lists/ManagementCoworkersList'
import ManagementTabs, { Tabs } from 'components/Domain/Taalhuis/Management/Tabs/ManagementTabs'
import { UserContext } from 'components/Providers/UserProvider/context'
import { useTaalhuisEmployeesQuery } from 'generated/graphql'
import React, { useContext } from 'react'
import { useHistory } from 'react-router-dom'
import Headline, { SpacingType } from '../../../../../components/Chrome/Headline'
import Button, { ButtonType } from '../../../../../components/Core/Button/Button'
import { IconType } from '../../../../../components/Core/Icon/IconType'
import Column from '../../../../../components/Core/Layout/Column/Column'
import Row from '../../../../../components/Core/Layout/Row/Row'
import { routes } from '../../../../../routes/routes'

interface Props {}

export const CoworkerOverviewView: React.FunctionComponent<Props> = () => {
    const userContext = useContext(UserContext)
    const {
        data: taalhuisEmployeesQueryData,
        loading: taalhuisEmployeesQueryLoading,
        error: taalhuisEmployeesQueryError,
    } = useTaalhuisEmployeesQuery({
        variables: {
            taalhuisId: userContext.user?.organizationId ?? '',
        },
    })
    const history = useHistory()

    return (
        <>
            <Headline title={i18n._(t`Beheer overview`)} spacingType={SpacingType.small} />

            <Column spacing={10}>
                <ManagementTabs activeTabId={Tabs.coworkers} />
                <Row justifyContent="flex-end">
                    <Button
                        type={ButtonType.primary}
                        icon={IconType.add}
                        onClick={() => history.push(routes.authorized.management.taalhuis.coworkers.create)}
                    >
                        {i18n._(t`Nieuwe medewerker`)}
                    </Button>
                </Row>
                <ManagementCoworkersList
                    queryResponse={taalhuisEmployeesQueryData}
                    loading={taalhuisEmployeesQueryLoading}
                    error={!!taalhuisEmployeesQueryError}
                />
            </Column>
        </>
    )
}
