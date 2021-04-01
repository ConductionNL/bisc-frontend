import { t } from '@lingui/macro'
import { useLingui } from '@lingui/react'
import Actionbar from 'components/Core/Actionbar/Actionbar'
import Button, { ButtonType } from 'components/Core/Button/Button'
import ErrorBlock from 'components/Core/Feedback/Error/ErrorBlock'
import Spinner, { Animation } from 'components/Core/Feedback/Spinner/Spinner'
import { IconType } from 'components/Core/Icon/IconType'
import Center from 'components/Core/Layout/Center/Center'
import { ManagementDataContainer } from 'components/Domain/Taalhuis/Management/Containers/ManagementDataFieldsContainer'
import ManagementTabs, { Tabs } from 'components/Domain/Taalhuis/Management/Tabs/ManagementTabs'
import { UserContext } from 'components/Providers/UserProvider/context'
import { useTaalhuisQuery } from 'generated/graphql'
import React, { useContext } from 'react'
import { useHistory } from 'react-router-dom'
import { routes } from 'routes/routes'
import Headline, { SpacingType } from '../../../../../components/Chrome/Headline'
import Column from '../../../../../components/Core/Layout/Column/Column'

interface Props {}

const DataView: React.FunctionComponent<Props> = () => {
    const { i18n } = useLingui()
    const userContext = useContext(UserContext)
    const history = useHistory()
    const { data, loading, error } = useTaalhuisQuery({
        variables: {
            taalhuisId: userContext.user?.organizationId ?? '',
        },
    })

    return (
        <>
            <Headline title={i18n._(t`Beheer`)} spacingType={SpacingType.small} />
            <Column spacing={10}>
                <ManagementTabs activeTabId={Tabs.data} />
                {renderFields()}
                <Actionbar
                    RightComponent={
                        <Button
                            type={ButtonType.primary}
                            icon={IconType.send}
                            onClick={() => history.push(routes.authorized.management.taalhuis.data.update)}
                        >
                            {i18n._(t`Bewerken`)}
                        </Button>
                    }
                />
            </Column>
        </>
    )

    function renderFields() {
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

        return <ManagementDataContainer defaultFieldValues={data} editable={true} />
    }
}

export default DataView
