import { t } from '@lingui/macro'
import { useLingui } from '@lingui/react'
import ErrorBlock from 'components/Core/Feedback/Error/ErrorBlock'
import Spinner, { Animation } from 'components/Core/Feedback/Spinner/Spinner'
import Center from 'components/Core/Layout/Center/Center'
import { DocumentsList } from 'components/Domain/Documents/DocumentsList'
import { useMockQuery } from 'components/hooks/useMockQuery'
import React from 'react'
import { useHistory } from 'react-router-dom'
import Headline, { SpacingType } from '../../../../../../../components/Chrome/Headline'
import Tab from '../../../../../../../components/Core/TabSwitch/Tab'
import TabSwitch from '../../../../../../../components/Core/TabSwitch/TabSwitch'
import { TabPaths, Tabs } from '../constants'

interface Props {}

export const DocumentsOverviewView: React.FunctionComponent<Props> = () => {
    const { i18n } = useLingui()
    const history = useHistory()
    const { data, loading, error } = useMockQuery([
        {
            fileName: 'Bestand',
            createdAt: new Date().toString(),
            filePath: './',
        },
    ])

    return (
        <>
            <Headline title={'Gebruiker 0'} spacingType={SpacingType.small} />

            <TabSwitch
                defaultActiveTabId={Tabs.data}
                onChange={props =>
                    history.push(
                        TabPaths[props.tabid as Tabs]({
                            coworkerid: ':coworkerid', // TODO: not yet implemented
                            coworkername: ':coworkerid',
                        })
                    )
                }
            >
                <Tab label={i18n._(t`Gegevens`)} tabid={Tabs.data} />
                <Tab label={i18n._(t`Medewerkers`)} tabid={Tabs.participants} />
                <Tab label={i18n._(t`Medewerkers`)} tabid={Tabs.documents} />
            </TabSwitch>
            {renderList()}
        </>
    )
    function renderList() {
        if (loading) {
            return (
                <Center grow={true}>
                    <Spinner type={Animation.pageSpinner} />
                </Center>
            )
        }

        if (error || !data) {
            return (
                <ErrorBlock
                    title={i18n._(t`Er ging iets fout`)}
                    message={i18n._(t`Wij konden de gegevens niet ophalen, probeer het opnieuw`)}
                />
            )
        }

        return <DocumentsList data={data} />
    }
}
