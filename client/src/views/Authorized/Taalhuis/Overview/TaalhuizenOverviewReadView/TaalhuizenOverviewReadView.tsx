import { t } from '@lingui/macro'
import { useLingui } from '@lingui/react'
import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import Breadcrumb from '../../../../../components/Core/Breadcrumb/Breadcrumb'
import Breadcrumbs from '../../../../../components/Core/Breadcrumb/Breadcrumbs'
import Button, { ButtonType } from '../../../../../components/Core/Button/Button'
import { IconType } from '../../../../../components/Core/Icon/IconType'
import Column from '../../../../../components/Core/Layout/Column/Column'
import Row from '../../../../../components/Core/Layout/Row/Row'
import Tab from '../../../../../components/Core/TabSwitch/Tab'
import TabSwitch from '../../../../../components/Core/TabSwitch/TabSwitch'
import PageTitle, { PageTitleSize } from '../../../../../components/Core/Text/PageTitle'
import { routes } from '../../../../../routes'
import GegevensView from './Gegevens/GegevensView'
import CoworkersOverviewView from './coworkers/CoworkersOverviewView'

interface Props {}

enum TabId {
    coworkers = 'medewerkers',
    gegevens = 'gegevens',
}

const TaalhuizenOverviewReadView: React.FunctionComponent<Props> = () => {
    const [tabId, setTabId] = useState<string>(TabId.gegevens)
    const { i18n } = useLingui()
    const history = useHistory()

    return (
        <>
            <Breadcrumbs>
                <Breadcrumb text={i18n._(t`test 1`)} to={routes.authorized.kitchensink} />
                <Breadcrumb text={i18n._(t`test 1`)} />
                <Breadcrumb text={i18n._(t`test 1`)} />
                <Breadcrumb text={i18n._(t`test 1`)} />
            </Breadcrumbs>
            <PageTitle title={i18n._(t`Nieuwe taalhuis`)} size={PageTitleSize.default} />

            <Column spacing={12}>
                <Row justifyContent="space-between">
                    <TabSwitch onChange={tab => setTabId(tab.tabid)}>
                        <Tab label={i18n._(t`Gegevens`)} tabid={TabId.gegevens} />
                        <Tab label={i18n._(t`Medewerkers`)} tabid={TabId.coworkers} />
                    </TabSwitch>
                    {tabId === TabId.coworkers && (
                        <Button
                            type={ButtonType.primary}
                            icon={IconType.add}
                            onClick={() => history.push(routes.authorized.taalhuis.coworkers.create)}
                        >
                            Nieuwe medewerker
                        </Button>
                    )}
                </Row>
                {handleNavigation()}
            </Column>
        </>
    )

    function handleNavigation() {
        if (tabId === 'gegevens') {
            return <GegevensView />
        }
        return <CoworkersOverviewView />
    }
}

export default TaalhuizenOverviewReadView
