import { t } from '@lingui/macro'
import { useLingui } from '@lingui/react'
import Headline, { SpacingType } from 'components/Chrome/Headline'
import Column from 'components/Core/Layout/Column/Column'
import { Page } from 'components/Core/Page/Page'
import {
    TaalhuisManagementTab,
    TaalhuisManagementTabs,
} from 'components/Domain/Taalhuis/Management/Tabs/TaalhuisManagementTabs'

interface Props {}

export const ManagementTaalhuisEmployeesOverviewView: React.FunctionComponent<Props> = () => {
    const { i18n } = useLingui()

    return (
        <Page>
            <Column spacing={4}>
                <Headline title={i18n._(t`Medewerkers`)} spacingType={SpacingType.small} />
                <Column spacing={10}>
                    <TaalhuisManagementTabs activeTabId={TaalhuisManagementTab.TaalhuisEmployees} />
                    <>Overview</>
                </Column>
            </Column>
        </Page>
    )
}
