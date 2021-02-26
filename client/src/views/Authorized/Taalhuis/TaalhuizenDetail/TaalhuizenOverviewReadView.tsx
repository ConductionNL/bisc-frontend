import { t } from '@lingui/macro'
import { useLingui } from '@lingui/react'
import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import Breadcrumb from '../../../../components/Core/Breadcrumb/Breadcrumb'
import Breadcrumbs from '../../../../components/Core/Breadcrumb/Breadcrumbs'
import Button, { ButtonType } from '../../../../components/Core/Button/Button'
import { IconType } from '../../../../components/Core/Icon/IconType'
import Column from '../../../../components/Core/Layout/Column/Column'
import Row from '../../../../components/Core/Layout/Row/Row'
import Tab from '../../../../components/Core/TabSwitch/Tab'
import TabSwitch from '../../../../components/Core/TabSwitch/TabSwitch'
import { routes } from '../../../../routes'
import GegevensView from './TaalhuizenOverviewReadView/TaalhuisData/TaalhuisDataView'
import CoworkersOverviewView from './TaalhuizenOverviewReadView/coworkers/TaalhuisCoworkersOverviewView'
import Headline from '../../../../components/Chrome/Headline'

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
            <Headline
                title={i18n._(t`Nieuwe Taalhuis`)}
                TopComponent={
                    <Breadcrumbs>
                        <Breadcrumb text={i18n._(t`Test`)} to={routes.authorized.supplier.overview} />
                    </Breadcrumbs>
                }
            />

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
                            onClick={() => history.push(routes.authorized.taalhuis.read.create())}
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
