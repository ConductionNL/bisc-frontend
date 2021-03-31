import { t } from '@lingui/macro'
import { useLingui } from '@lingui/react'
import ManagementDataContainer from 'components/Domain/Taalhuis/Management/Containers/ManagementDataFieldsContainer'
import ManagementTabs, { Tabs } from 'components/Domain/Taalhuis/Management/Tabs/ManagementTabs'
import { UserContext } from 'components/Providers/UserProvider/context'
import { useTaalhuisQuery } from 'generated/graphql'
import React, { useContext } from 'react'
import Headline, { SpacingType } from '../../../../../components/Chrome/Headline'
import Column from '../../../../../components/Core/Layout/Column/Column'

interface Props {}

const DataView: React.FunctionComponent<Props> = () => {
    const { i18n } = useLingui()
    const userContext = useContext(UserContext)
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
                <ManagementDataContainer loading={loading} error={!!error} defaultFieldValues={data} />
            </Column>
        </>
    )
}

export default DataView
