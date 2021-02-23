import { t } from '@lingui/macro'
import { useLingui } from '@lingui/react'
import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import Actionbar from '../../../../components/Core/Actionbar/Actionbar'
import Breadcrumb from '../../../../components/Core/Breadcrumb/Breadcrumb'
import Breadcrumbs from '../../../../components/Core/Breadcrumb/Breadcrumbs'
import Button, { ButtonType } from '../../../../components/Core/Button/Button'
import { NotificationsManager } from '../../../../components/Core/Feedback/Notifications/NotificationsManager'
import Field from '../../../../components/Core/Field/Field'
import Section from '../../../../components/Core/Field/Section'
import HorizontalRule from '../../../../components/Core/HorizontalRule/HorizontalRule'
import Column from '../../../../components/Core/Layout/Column/Column'
import Row from '../../../../components/Core/Layout/Row/Row'
import Space from '../../../../components/Core/Layout/Space/Space'
import Link from '../../../../components/Core/Link/Link'
import Tab from '../../../../components/Core/TabSwitch/Tab'
import TabSwitch from '../../../../components/Core/TabSwitch/TabSwitch'
import PageTitle, { PageTitleSize } from '../../../../components/Core/Text/PageTitle'
import Paragraph from '../../../../components/Core/Typography/Paragraph'
import { routes } from '../../../../routes'

interface Props {}

const TaalhuizenOverviewReadView: React.FunctionComponent<Props> = () => {
    const [tabId, setTabId] = useState<string>()
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

            <TabSwitch onChange={tab => setTabId(tab.tabid)}>
                <Tab label={i18n._(t`Gegevens`)} tabid="gegevens" />
                <Tab label={i18n._(t`Medewerkers`)} tabid="medewerkers" />
            </TabSwitch>
            {handleNavigation()}
        </>
    )

    function handleNavigation() {
        if (tabId === 'gegevens') {
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
                    <Actionbar
                        RightComponent={
                            <Row>
                                <Button
                                    type={ButtonType.primary}
                                    onClick={() => history.push(routes.authorized.taalhuis.taalhuisUpdate)}
                                >
                                    {i18n._(t`Bewerken`)}
                                </Button>
                            </Row>
                        }
                    />
                </>
            )
        }
        return <Paragraph>{i18n._(t`Medewerkers`)}</Paragraph>
    }
}

export default TaalhuizenOverviewReadView
