import { t } from '@lingui/macro'
import { useLingui } from '@lingui/react'
import React from 'react'
import { useHistory, useParams } from 'react-router-dom'
import Headline from '../../../../../components/Chrome/Headline'
import Actionbar from '../../../../../components/Core/Actionbar/Actionbar'
import Breadcrumb from '../../../../../components/Core/Breadcrumb/Breadcrumb'
import Breadcrumbs from '../../../../../components/Core/Breadcrumb/Breadcrumbs'
import Button, { ButtonType } from '../../../../../components/Core/Button/Button'
import ErrorBlock from '../../../../../components/Core/Feedback/Error/ErrorBlock'
import Spinner, { Animation } from '../../../../../components/Core/Feedback/Spinner/Spinner'
import Field from '../../../../../components/Core/Field/Field'
import Section from '../../../../../components/Core/Field/Section'
import HorizontalRule from '../../../../../components/Core/HorizontalRule/HorizontalRule'
import Center from '../../../../../components/Core/Layout/Center/Center'
import Column from '../../../../../components/Core/Layout/Column/Column'
import Row from '../../../../../components/Core/Layout/Row/Row'
import Space from '../../../../../components/Core/Layout/Space/Space'
import Tab from '../../../../../components/Core/TabSwitch/Tab'
import TabSwitch from '../../../../../components/Core/TabSwitch/TabSwitch'
import { TabProps } from '../../../../../components/Core/TabSwitch/types'
import Paragraph from '../../../../../components/Core/Typography/Paragraph'
import { useMockQuery } from '../../../../../components/hooks/useMockQuery'
import { routes, TaalhuisDetailParams } from '../../../../../routes'
import { taalhuisCreateResponse } from '../mocks/taalhuizen'

interface Props {}

enum TabId {
    coworkers = 'medewerkers',
    gegevens = 'gegevens',
}

const DataView: React.FunctionComponent<Props> = () => {
    const { loading, error } = useMockQuery(taalhuisCreateResponse)
    const { i18n } = useLingui()
    const history = useHistory()
    const { taalhuisid, taalhuisname } = useParams<TaalhuisDetailParams>()

    if (!taalhuisid) {
        return null
    }

    const handleTabSwitch = (tab: TabProps) => {
        if (tab.tabid === TabId.coworkers) {
            history.push(routes.authorized.taalhuis.read.coworkers.overview({ taalhuisid, taalhuisname }))
        }
    }

    return (
        <>
            <Headline
                title={i18n._(t`${taalhuisname}`)}
                TopComponent={
                    <Breadcrumbs>
                        <Breadcrumb text={i18n._(t`Taalhuizen`)} to={routes.authorized.taalhuis.overview} />
                    </Breadcrumbs>
                }
            />

            <Column spacing={10}>
                <Row justifyContent="space-between">
                    <TabSwitch onChange={handleTabSwitch} defaultActiveTabId={TabId.gegevens}>
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
                            onClick={() =>
                                history.push(routes.authorized.taalhuis.read.update({ taalhuisid, taalhuisname }))
                            }
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
            <>
                <Section title={i18n._(t`Vestiging`)}>
                    <Column spacing={4}>
                        <Field label={i18n._(t`Naam Taalhuis`)} horizontal={true}>
                            <Paragraph>{i18n._(t`Naam Taalhuis`)}</Paragraph>
                        </Field>

                        <Field label={i18n._(t`Straat en huisnr.`)} horizontal={true}>
                            <Paragraph>{i18n._(t`Straat`)}</Paragraph>
                        </Field>

                        <Field label={i18n._(t`Postcode`)} horizontal={true}>
                            <Paragraph>{i18n._(t`Postcode`)}</Paragraph>
                        </Field>

                        <Field label={i18n._(t`Plaats`)} horizontal={true}>
                            <Paragraph>{i18n._(t`Plaats`)}</Paragraph>
                        </Field>
                    </Column>
                </Section>

                <HorizontalRule />

                <Section title={i18n._(t`Contactgegevens`)}>
                    <Column spacing={4}>
                        <Field label={i18n._(t`Telefoonnummer`)} horizontal={true}>
                            <Paragraph>{i18n._(t`030 - 123 45 67`)}</Paragraph>
                        </Field>
                        <Field label={i18n._(t`E-mailadres`)} horizontal={true}>
                            <Paragraph>{i18n._(t`taalhuis@email.nl`)}</Paragraph>
                        </Field>
                    </Column>
                </Section>

                <Space pushTop={true} />
            </>
        )
    }
}

export default DataView
