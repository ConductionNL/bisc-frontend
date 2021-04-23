import { t } from '@lingui/macro'
import { useLingui } from '@lingui/react'
import Headline, { SpacingType } from 'components/Chrome/Headline'
import Button, { ButtonType } from 'components/Core/Button/Button'
import ErrorBlock from 'components/Core/Feedback/Error/ErrorBlock'
import Spinner, { Animation } from 'components/Core/Feedback/Spinner/Spinner'
import { IconType } from 'components/Core/Icon/IconType'
import Center from 'components/Core/Layout/Center/Center'
import Column from 'components/Core/Layout/Column/Column'
import Row from 'components/Core/Layout/Row/Row'
import {
    AanbiederGroupsTab,
    AanbiederGroupsTabs,
} from 'components/Domain/Aanbieder/AanbiederGroups/Tabs/AanbiederGroupsTabs'
import { GroupsList } from 'components/Domain/Groups/Lists/GroupsList'
import { useMockQuery } from 'components/hooks/useMockQuery'
import React from 'react'
import { useHistory } from 'react-router'
import { routes } from 'routes/routes'
import { GroupType } from 'generated/graphql'
import { groupsMockData } from './mocks'

interface Props {}

export const AanbiederOverviewFutureView: React.FunctionComponent<Props> = () => {
    const history = useHistory()
    const { i18n } = useLingui()
    const { data, loading, error } = useMockQuery<GroupType[]>(groupsMockData)

    return (
        <>
            <Headline title={i18n._(t`Groepen`)} spacingType={SpacingType.small} />
            <Column spacing={12}>
                <Column spacing={4}>
                    <AanbiederGroupsTabs currentTab={AanbiederGroupsTab.future} />
                    <Row justifyContent={'flex-end'}>
                        <Button
                            type={ButtonType.primary}
                            icon={IconType.add}
                            onClick={() => history.push(routes.authorized.supplier.groups.create)}
                        >
                            {i18n._(t`Nieuwe groep`)}
                        </Button>
                    </Row>
                </Column>
                {renderList()}
            </Column>
        </>
    )

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

        return <GroupsList data={data} />
    }
}
