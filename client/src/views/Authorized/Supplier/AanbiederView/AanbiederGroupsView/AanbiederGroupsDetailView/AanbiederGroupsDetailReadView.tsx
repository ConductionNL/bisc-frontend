import { t } from '@lingui/macro'
import { useLingui } from '@lingui/react'
import Headline, { SpacingType } from 'components/Chrome/Headline'
import Actionbar from 'components/Core/Actionbar/Actionbar'
import Button, { ButtonType } from 'components/Core/Button/Button'
import ErrorBlock from 'components/Core/Feedback/Error/ErrorBlock'
import Spinner, { Animation } from 'components/Core/Feedback/Spinner/Spinner'
import Form from 'components/Core/Form/Form'
import Center from 'components/Core/Layout/Center/Center'
import Column from 'components/Core/Layout/Column/Column'
import {
    AanbiederGroupDetailTabs,
    AanbiederGroupsDetailTab,
} from 'components/Domain/Aanbieder/AanbiederGroups/Tabs/AanbiederGroupDetailTabs'
import { GroupsCreateFields } from 'components/Domain/Groups/Fields/GroupsCreateFields'
import { useGroupQuery } from 'generated/graphql'
import React from 'react'
import { useHistory } from 'react-router-dom'
import { routes } from 'routes/routes'
import { AanbiederGroupDetailLocationProps } from './AanbiederGroupsDetailView'

interface Props {
    routeState: AanbiederGroupDetailLocationProps
}

export const AanbiederGroupsDetailReadView: React.FunctionComponent<Props> = props => {
    const { routeState } = props
    const history = useHistory()
    const { i18n } = useLingui()
    const { data: group, loading: groupLoading, error: groupError } = useGroupQuery({
        variables: { groupId: routeState.groupId },
    })

    return (
        <Form>
            <Headline title={routeState.groupName} spacingType={SpacingType.small} />
            <Column spacing={12}>
                <AanbiederGroupDetailTabs currentTab={AanbiederGroupsDetailTab.Gegevens} routeState={routeState} />
                {renderForm()}
            </Column>
            {/* // TODO: implement breadcrmbs */}
            <Actionbar
                RightComponent={
                    <Button
                        type={ButtonType.primary}
                        submit={true}
                        loading={groupLoading}
                        disabled={groupLoading}
                        onClick={() =>
                            history.push({
                                pathname: routes.authorized.supplier.groups.detail.update,
                                state: routeState,
                            })
                        }
                    >
                        {i18n._(t`Bewerken`)}
                    </Button>
                }
            />
        </Form>
    )

    function renderForm() {
        if (groupLoading) {
            return (
                <Center grow={true}>
                    <Spinner type={Animation.pageSpinner} />
                </Center>
            )
        }
        if (groupError) {
            return (
                <ErrorBlock
                    title={i18n._(t`Er ging iets fout`)}
                    message={i18n._(t`Het is niet gelukt om de gegevens op te halen, probeer het opnieuw`)}
                />
            )
        }
        return <GroupsCreateFields prefillData={group?.group} readOnly={true} />
    }
}
