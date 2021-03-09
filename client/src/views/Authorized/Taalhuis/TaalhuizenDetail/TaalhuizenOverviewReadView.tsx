import { t } from '@lingui/macro'
import { useLingui } from '@lingui/react'
import React from 'react'
import { useHistory, useParams } from 'react-router-dom'
import Breadcrumb from '../../../../components/Core/Breadcrumb/Breadcrumb'
import Breadcrumbs from '../../../../components/Core/Breadcrumb/Breadcrumbs'
import Button, { ButtonType } from '../../../../components/Core/Button/Button'
import Column from '../../../../components/Core/Layout/Column/Column'
import Row from '../../../../components/Core/Layout/Row/Row'
import Tab from '../../../../components/Core/TabSwitch/Tab'
import TabSwitch from '../../../../components/Core/TabSwitch/TabSwitch'
import { routes } from '../../../../routes'
import Headline from '../../../../components/Chrome/Headline'
import { TabProps } from '../../../../components/Core/TabSwitch/types'
import Actionbar from '../../../../components/Core/Actionbar/Actionbar'
import Space from '../../../../components/Core/Layout/Space/Space'
import ErrorBlock from '../../../../components/Core/Feedback/Error/ErrorBlock'
import Spinner, { Animation } from '../../../../components/Core/Feedback/Spinner/Spinner'
import Center from '../../../../components/Core/Layout/Center/Center'
import { useMockQuery } from '../../../../components/hooks/useMockQuery'
import { taalhuisCreateResponse } from './mocks/taalhuizen'
import TaalhuisInformationFieldset from '../../../../components/fieldsets/shared/TaalhuisInformationFieldset'

interface Props {}

enum TabId {
    coworkers = 'medewerkers',
    gegevens = 'gegevens',
}

interface Params {
    id: string
    name: string
}

const TaalhuizenOverviewReadView: React.FunctionComponent<Props> = () => {
    const { loading, error } = useMockQuery(taalhuisCreateResponse)
    const { i18n } = useLingui()
    const history = useHistory()
    const { id, name } = useParams<Params>()

    if (!id) {
        return null
    }

    const handleTabSwitch = (tab: TabProps) => {
        if (tab.tabid === TabId.coworkers) {
            history.push(routes.authorized.taalhuis.read.detail.overview(id, name))
        }
    }

    return (
        <>
            <Headline
                title={i18n._(t`${name}`)}
                TopComponent={
                    <Breadcrumbs>
                        <Breadcrumb text={i18n._(t`Taalhuizen`)} to={routes.authorized.taalhuis.overview} />
                    </Breadcrumbs>
                }
            />

            <Column spacing={10}>
                <Row justifyContent="space-between">
                    <TabSwitch onChange={handleTabSwitch}>
                        <Tab label={i18n._(t`Gegevens`)} tabid={TabId.gegevens} />
                        <Tab label={i18n._(t`Medewerkers`)} tabid={TabId.coworkers} />
                    </TabSwitch>
                </Row>
                {renderViews()}
            </Column>
            <Space pushTop={true} />
            <Actionbar
                RightComponent={
                    <Row>
                        <Button
                            type={ButtonType.primary}
                            onClick={() => history.push(routes.authorized.taalhuis.read.update(id, name))}
                        >
                            {i18n._(t`Bewerken`)}
                        </Button>
                    </Row>
                }
            />
        </>
    )

    function renderViews() {
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
        return (
            <TaalhuisInformationFieldset
                readOnly={true}
                prefillData={{
                    name: 'Peter',
                    adres: 'Peter',
                    postalCode: 'string',
                    city: 'string',
                    phoneNumber: 'string',
                    email: 'string',
                }}
            />
        )
    }
}

export default TaalhuizenOverviewReadView
