import { t } from '@lingui/macro'
import { useLingui } from '@lingui/react'
import Headline from 'components/Chrome/Headline'
import Actionbar from 'components/Core/Actionbar/Actionbar'
import { breadcrumbItems } from 'components/Core/Breadcrumbs/breadcrumbItems'
import { Breadcrumbs } from 'components/Core/Breadcrumbs/Breadcrumbs'
import Button, { ButtonType } from 'components/Core/Button/Button'
import ErrorBlock from 'components/Core/Feedback/Error/ErrorBlock'
import Spinner, { Animation } from 'components/Core/Feedback/Spinner/Spinner'
import Center from 'components/Core/Layout/Center/Center'
import { GroupsCreateFields } from 'components/Domain/Groups/Fields/GroupsCreateFields'
import { useMockQuery } from 'components/hooks/useMockQuery'
import React from 'react'
import { useHistory } from 'react-router-dom'
import { routes } from 'routes/routes'
import { GroupType } from 'temp/TEMPORARYgraphql'
import { groupsMockData } from '../mocks'
import { AanbiederGroupDetailLocationProps } from './AanbiederGroupsDetailView'

interface Props {
    routeState: AanbiederGroupDetailLocationProps
}

export const AanbiederGroupsDetailReadView: React.FunctionComponent<Props> = props => {
    const { routeState } = props
    const history = useHistory()
    const { i18n } = useLingui()
    const { data: group, loading: groupLoading, error: groupError } = useMockQuery<GroupType | undefined>(
        groupsMockData.find(group => group.id === routeState.groupId)
    )

    return (
        <>
            <Headline
                title={routeState.groupName}
                TopComponent={<Breadcrumbs breadcrumbItems={[breadcrumbItems.bisc.taalhuis.overview]} />}
            />
            {renderForm()}
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
        </>
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
        return <GroupsCreateFields prefillData={group} readOnly={true} />
    }
}
