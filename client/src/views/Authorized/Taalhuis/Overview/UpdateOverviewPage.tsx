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
import { IconType } from '../../../../components/Core/Icon/IconType'
import Column from '../../../../components/Core/Layout/Column/Column'
import Row from '../../../../components/Core/Layout/Row/Row'
import Space from '../../../../components/Core/Layout/Space/Space'
import PageTitle, { PageTitleSize } from '../../../../components/Core/Text/PageTitle'
import { routes } from '../../../../routes'

interface Props {}

const UpdateOverviewPage: React.FunctionComponent<Props> = () => {
    return (
        <>
            <Column spacing={12}>
                <Breadcrumbs>
                    <Breadcrumb text={'test 1'} to={routes.authorized.kitchensink} />
                    <Breadcrumb text={'test 1'} />
                    <Breadcrumb text={'test 1'} />
                    <Breadcrumb text={'test 1'} />
                </Breadcrumbs>
                <PageTitle title={'Nieuwe taalhuis'} size={PageTitleSize.default} />
                <Section title={'Vestiging'}>
                    <Column spacing={4}>
                        <Field label={'Naam Taalhuis'} horizontal={true} required={true}>
                            <Input required={true} name="taalhuis" placeholder={'Taalhuis X'} onChange={undefined} />
                        </Field>

                        <Field label={'Straat en huisnr.'} horizontal={true}>
                            <Input name="straatnaam" placeholder={'Straatnaam'} onChange={undefined} />
                        </Field>

                        <Field label={'Postcode'} horizontal={true}>
                            <Input name="postcode" placeholder={'1234AB'} onChange={undefined} />
                        </Field>

                        <Field label={'Plaats'} horizontal={true}>
                            <Input name="plaatsnaam" placeholder={'Utrecht'} onChange={undefined} />
                        </Field>
                    </Column>
                </Section>
            </Column>
            <HorizontalRule />
            <Column spacing={12}>
                <Section title={'Contactgegevens'}>
                    <Column spacing={4}>
                        <Field label={'Telefoonnummer'} horizontal={true}>
                            <Input name="telefoonnummer" placeholder={'030 - 123 45 67'} onChange={undefined} />
                        </Field>
                        <Field label={'E-mailadres'} horizontal={true}>
                            <Input name="email" placeholder={'Taalhuis@email.nl'} onChange={undefined} />
                        </Field>
                    </Column>
                </Section>
            </Column>
            <Space pushTop={true} />
            <Actionbar
                LeftComponent={
                    <Row>
                        <Button
                            type={ButtonType.secondary}
                            danger={true}
                            icon={IconType.delete}
                            onClick={() => NotificationsManager.success('title', 'test')}
                        >
                            Annuleren
                        </Button>
                    </Row>
                }
                RightComponent={
                    <Row>
                        <Button
                            type={ButtonType.secondary}
                            onClick={() => NotificationsManager.success('title', 'test')}
                        >
                            Annuleren
                        </Button>

                        <Button type={ButtonType.primary} onClick={() => NotificationsManager.success('title', 'test')}>
                            Opslaan
                        </Button>
                    </Row>
                }
            />
        </>
    )
}

export default UpdateOverviewPage
