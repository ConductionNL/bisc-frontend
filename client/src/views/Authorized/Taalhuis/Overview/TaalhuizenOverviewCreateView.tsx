import { t } from '@lingui/macro'
import { useLingui } from '@lingui/react'
import React from 'react'
import { useHistory } from 'react-router-dom'
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
import PageTitle, { PageTitleSize } from '../../../../components/Core/Text/PageTitle'
import { routes } from '../../../../routes'

interface Props {}

const TaalhuizenOverviewCreateView: React.FunctionComponent<Props> = () => {
    const { i18n } = useLingui()
    const history = useHistory()

    return (
        <>
            <Column spacing={12}>
                <Breadcrumbs>
                    <Breadcrumb text={i18n._(t`test 1`)} to={routes.authorized.kitchensink} />
                    <Breadcrumb text={i18n._(t`test 1`)} />
                    <Breadcrumb text={i18n._(t`test 1`)} />
                    <Breadcrumb text={i18n._(t`test 1`)} />
                </Breadcrumbs>
                <PageTitle title={i18n._(t`Nieuwe taalhuis`)} size={PageTitleSize.default} />
                <Section title={i18n._(t`Vestiging`)}>
                    <Column spacing={4}>
                        <Field label={i18n._(t`Naam taalhuis`)} horizontal={true} required={true}>
                            <Input
                                required={true}
                                name="taalhuis"
                                placeholder={i18n._(t`Taalhuis X`)}
                                onChange={undefined}
                            />
                        </Field>

                        <Field label={i18n._(t`Straat en huisnr.`)} horizontal={true}>
                            <Input name="straatnaam" placeholder={i18n._(t`Straatnaam`)} onChange={undefined} />
                        </Field>

                        <Field label={i18n._(t`Postcode`)} horizontal={true}>
                            <Input name="postcode" placeholder={i18n._(t`1234AB`)} onChange={undefined} />
                        </Field>

                        <Field label={i18n._(t`Plaats`)} horizontal={true}>
                            <Input name="plaatsnaam" placeholder={i18n._(t`Utrecht`)} onChange={undefined} />
                        </Field>
                    </Column>
                </Section>
            </Column>
            <HorizontalRule />
            <Column spacing={12}>
                <Section title={i18n._(t`Contactgegevens`)}>
                    <Column spacing={4}>
                        <Field label={i18n._(t`Telefoonnummer`)} horizontal={true}>
                            <Input
                                name="telefoonnummer"
                                placeholder={i18n._(t`030 - 123 45 67`)}
                                onChange={undefined}
                            />
                        </Field>
                        <Field label={i18n._(t`E-mailadres`)} horizontal={true}>
                            <Input name="email" placeholder={i18n._(t`taalhuis@email.nl`)} onChange={undefined} />
                        </Field>
                    </Column>
                </Section>
            </Column>
            <Space pushTop={true} />
            <Actionbar
                RightComponent={
                    <Row>
                        <Button
                            type={ButtonType.secondary}
                            onClick={() => NotificationsManager.success('title', 'test')}
                        >
                            {i18n._(t`Annuleren`)}
                        </Button>

                        <Button type={ButtonType.primary} onClick={handleCreate}>
                            {i18n._(t`Toevoegen`)}
                        </Button>
                    </Row>
                }
            />
        </>
    )

    function handleCreate() {
        NotificationsManager.success('title', 'test')
        history.push(routes.authorized.taalhuis.overview)
    }
}

export default TaalhuizenOverviewCreateView
