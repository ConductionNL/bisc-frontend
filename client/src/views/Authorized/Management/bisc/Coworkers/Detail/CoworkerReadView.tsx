import { t } from '@lingui/macro'
import { useLingui } from '@lingui/react'
import Headline, { SpacingType } from 'components/Chrome/Headline'
import Actionbar from 'components/Core/Actionbar/Actionbar'
import { breadcrumbItems } from 'components/Core/Breadcrumbs/breadcrumbItems'
import { Breadcrumbs } from 'components/Core/Breadcrumbs/Breadcrumbs'
import Button, { ButtonType } from 'components/Core/Button/Button'
import ErrorBlock from 'components/Core/Feedback/Error/ErrorBlock'
import Spinner, { Animation } from 'components/Core/Feedback/Spinner/Spinner'
import Center from 'components/Core/Layout/Center/Center'
import Column from 'components/Core/Layout/Column/Column'
import { BiscManagementCoworkerFieldsContainer } from 'components/Domain/Bisc/Management/Fields/BiscManagementCoworkerFields'
import { useBiscEmployeeQuery } from 'generated/graphql'
import React from 'react'
import { useHistory } from 'react-router-dom'
import { routes } from 'routes/routes'
import { ManagementBiscCoworkerDetailLocationStateProps } from './CoworkerDetailView'

interface Props {
    routeState: ManagementBiscCoworkerDetailLocationStateProps
}

const CoworkerReadView: React.FunctionComponent<Props> = props => {
    const { routeState } = props
    const { i18n } = useLingui()
    const history = useHistory()
    const { data, loading, error } = useBiscEmployeeQuery({
        variables: {
            biscEmployeeId: routeState.coworkerId,
        },
    })

    return (
        <>
            <Column spacing={10}>
                <Headline
                    title={i18n._(t`Medewerker ${routeState.coworkerName}`)}
                    spacingType={SpacingType.small}
                    TopComponent={<Breadcrumbs breadcrumbItems={[breadcrumbItems.bisc.management.overview]} />}
                />
                {renderSection()}
            </Column>
            <Actionbar
                RightComponent={
                    <Button type={ButtonType.primary} onClick={handleEdit}>
                        {i18n._(t`Bewerken`)}
                    </Button>
                }
            />
        </>
    )

    function renderSection() {
        if (loading) {
            return (
                <Center grow={true}>
                    <Spinner type={Animation.pageSpinner} />
                </Center>
            )
        }

        if (error) {
            return (
                <ErrorBlock
                    title={i18n._(t`Er ging iets fout`)}
                    message={i18n._(t`Wij konden de gegevens niet ophalen, probeer het opnieuw`)}
                />
            )
        }

        if (data) {
            return <BiscManagementCoworkerFieldsContainer editable={false} defaultFieldValues={data} />
        }
    }

    function handleEdit() {
        history.push({ pathname: routes.authorized.management.bisc.coworkers.detail.update, state: routeState })
    }
}

export default CoworkerReadView
