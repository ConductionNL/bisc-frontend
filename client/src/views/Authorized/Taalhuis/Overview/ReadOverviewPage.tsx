import React from 'react'
import Actionbar from '../../../../components/Core/Actionbar/Actionbar'
import Breadcrumb from '../../../../components/Core/Breadcrumb/Breadcrumb'
import Breadcrumbs from '../../../../components/Core/Breadcrumb/Breadcrumbs'
import Button, { ButtonType } from '../../../../components/Core/Button/Button'
import Input from '../../../../components/Core/DataEntry/Input'
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

const ReadOverviewPage: React.FunctionComponent<Props> = () => {
    return (
        <>
            <Breadcrumbs>
                <Breadcrumb text={'test 1'} to={routes.authorized.kitchensink} />
                <Breadcrumb text={'test 1'} />
                <Breadcrumb text={'test 1'} />
                <Breadcrumb text={'test 1'} />
            </Breadcrumbs>
            <PageTitle title={'Nieuwe taalhuis'} size={PageTitleSize.default} />
            <Column spacing={12}>
                <TabSwitch>
                    <Tab label="test" tabid="test" />
                    <Tab label="test" tabid="test" />
                </TabSwitch>
                <Section title={'Vestiging'}>
                    <Column spacing={4}>
                        <Field label={'Naam Taalhuis'} horizontal={true}>
                            <Paragraph>Taalhuis X</Paragraph>
                        </Field>

                        <Field label={'Straat en huisnr.'} horizontal={true}>
                            <Paragraph>Taalhuis X</Paragraph>
                        </Field>

                        <Field label={'Postcode'} horizontal={true}>
                            <Paragraph>Taalhuis X</Paragraph>
                        </Field>

                        <Field label={'Plaats'} horizontal={true}>
                            <Paragraph>Taalhuis X</Paragraph>
                        </Field>
                    </Column>
                </Section>
            </Column>
            <HorizontalRule />
            <Column spacing={12}>
                <Section title={'Contactgegevens'}>
                    <Column spacing={4}>
                        <Field label={'Telefoonnummer'} horizontal={true}>
                            <Link text="030 - 123 45 67" />
                        </Field>
                        <Field label={'E-mailadres'} horizontal={true}>
                            <Paragraph>Taalhuis@email.nl</Paragraph>
                        </Field>
                    </Column>
                </Section>
            </Column>
            <Space pushTop={true} />
            <Actionbar
                RightComponent={
                    <Row>
                        <Button type={ButtonType.primary} onClick={() => NotificationsManager.success('title', 'test')}>
                            Bewerken
                        </Button>
                    </Row>
                }
            />
        </>
    )
}

export default ReadOverviewPage
