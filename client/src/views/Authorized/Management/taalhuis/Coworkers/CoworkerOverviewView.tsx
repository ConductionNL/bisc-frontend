import { i18n } from '@lingui/core'
import { t } from '@lingui/macro'
import ErrorBlock from 'components/Core/Feedback/Error/ErrorBlock'
import Spinner, { Animation } from 'components/Core/Feedback/Spinner/Spinner'
import Center from 'components/Core/Layout/Center/Center'
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
                {renderList()}
            </Column>
        </>
    )

    function renderList() {
        if (taalhuisEmployeesQueryLoading) {
            return (
                <Center grow={true}>
                    <Spinner type={Animation.pageSpinner} />
                </Center>
            )
        }

        if (taalhuisEmployeesQueryError) {
            return (
                <ErrorBlock
                    title={i18n._(t`Er ging iets fout`)}
                    message={i18n._(t`Wij konden de gegevens niet ophalen, probeer het opnieuw`)}
                />
            )
        }
        return <ManagementCoworkersList queryResponse={taalhuisEmployeesQueryData} />
    }
}
