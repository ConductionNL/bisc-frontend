import { t } from '@lingui/macro'
import { useLingui } from '@lingui/react'
import ErrorBlock from 'components/Core/Feedback/Error/ErrorBlock'
import Spinner, { Animation } from 'components/Core/Feedback/Spinner/Spinner'
import Center from 'components/Core/Layout/Center/Center'
import { ManagementCoworkerFieldsContainer } from 'components/Domain/Taalhuis/Management/Containers/ManagementCoworkerFieldsContainer'
import { useTaalhuisEmployeeQuery } from 'generated/graphql'
import React from 'react'
import { useHistory } from 'react-router-dom'
import Headline, { SpacingType } from 'components/Chrome/Headline'
import Actionbar from 'components/Core/Actionbar/Actionbar'
import { Breadcrumbs } from 'components/Core/Breadcrumb/Breadcrumbs'
import Button, { ButtonType } from 'components/Core/Button/Button'
import { IconType } from 'components/Core/Icon/IconType'
import Column from 'components/Core/Layout/Column/Column'
import Space from 'components/Core/Layout/Space/Space'
import { routes } from 'routes/routes'
import { ManagementTaalhuisLocationStateProps } from './CoworkersDetailView'
import { breadcrumbItems } from 'components/Core/Breadcrumb/breadcrumbItems'

interface Props {
    routeState: ManagementTaalhuisLocationStateProps
}

const CoworkerReadView: React.FunctionComponent<Props> = props => {
    const { routeState } = props
    const { i18n } = useLingui()
    const history = useHistory()
    const { loading: queryLoading, error: queryError, data: queryData } = useTaalhuisEmployeeQuery({
        variables: {
            userId: routeState.coworkerId,
        },
    })

    if (!routeState.coworkerId) {
        return null
    }

    return (
        <>
            <Column spacing={10}>
                <Headline
                    title={i18n._(t`Medewerker ${routeState.coworkerName}`)}
                    spacingType={SpacingType.small}
                    TopComponent={<Breadcrumbs breadcrumbItems={[breadcrumbItems.bisc.taalhuis.management.index]} />}
                />
                {renderFields()}
            </Column>
            <Space pushTop={true} />
            <Actionbar
                RightComponent={
                    <Button
                        type={ButtonType.primary}
                        icon={IconType.send}
                        onClick={() =>
                            history.push({
                                pathname: routes.authorized.management.taalhuis.coworkers.detail.update,
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

    function renderFields() {
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

        return <ManagementCoworkerFieldsContainer defaultFieldValues={queryData} />
    }
}

export default CoworkerReadView
