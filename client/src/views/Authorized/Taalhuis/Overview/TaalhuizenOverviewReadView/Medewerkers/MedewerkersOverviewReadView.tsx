import { t } from '@lingui/macro'
import { useLingui } from '@lingui/react'
import React from 'react'
import { useHistory } from 'react-router-dom'
import Actionbar from '../../../../../../components/Core/Actionbar/Actionbar'
import Breadcrumb from '../../../../../../components/Core/Breadcrumb/Breadcrumb'
import Breadcrumbs from '../../../../../../components/Core/Breadcrumb/Breadcrumbs'
import Button, { ButtonType } from '../../../../../../components/Core/Button/Button'
import LabelTag, { LabelColor } from '../../../../../../components/Core/DataDisplay/LabelTag/LabelTag'
import Input from '../../../../../../components/Core/DataEntry/Input'
import RadioButton from '../../../../../../components/Core/DataEntry/RadioButton'
import { NotificationsManager } from '../../../../../../components/Core/Feedback/Notifications/NotificationsManager'
import Field from '../../../../../../components/Core/Field/Field'
import Section from '../../../../../../components/Core/Field/Section'
import HorizontalRule from '../../../../../../components/Core/HorizontalRule/HorizontalRule'
import { IconType } from '../../../../../../components/Core/Icon/IconType'
import Column from '../../../../../../components/Core/Layout/Column/Column'
import Row from '../../../../../../components/Core/Layout/Row/Row'
import Space from '../../../../../../components/Core/Layout/Space/Space'
import PageTitle, { PageTitleSize } from '../../../../../../components/Core/Text/PageTitle'
import Paragraph from '../../../../../../components/Core/Typography/Paragraph'
import { routes } from '../../../../../../routes'

interface Props {}

const MedewerkersOverviewReadView: React.FunctionComponent<Props> = () => {
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
                <PageTitle title={i18n._(t`Nieuwe Medewerker`)} size={PageTitleSize.default} />
                <Section title={i18n._(t`Gegevens`)}>
                    <Column spacing={4}>
                        <Field label={i18n._(t`Achternaam`)} horizontal={true}>
                            <Paragraph>{i18n._(t`Wit, De`)}</Paragraph>
                        </Field>

                        <Field label={i18n._(t`Roepnaam`)} horizontal={true}>
                            <Paragraph>{i18n._(t`Peter`)}</Paragraph>
                        </Field>

                        <Field label={i18n._(t`Telefoonnummer`)} horizontal={true}>
                            <Paragraph>{i18n._(t`030 - 123 45 67`)}</Paragraph>
                        </Field>
                    </Column>
                </Section>
            </Column>
            <HorizontalRule />
            <Column spacing={12}>
                <Section title={i18n._(t`Accountgegevens`)}>
                    <Column spacing={4}>
                        <Field label={i18n._(t`E-mailadres`)} horizontal={true}>
                            <Paragraph>{i18n._(t`Naam Taalhuis`)}</Paragraph>
                        </Field>
                        <Field label={'Rol'} horizontal={true}>
                            <LabelTag label="Medewerker" color={LabelColor.blue} />
                        </Field>
                        <Field label={'Aangemaakt'} horizontal={true}>
                            <Paragraph>{i18n._(t`01-01-2021`)}</Paragraph>
                        </Field>
                        <Field label={'Bewerkt'} horizontal={true}>
                            <Paragraph>{i18n._(t`01-01-2021`)}</Paragraph>
                        </Field>
                    </Column>
                </Section>
            </Column>
            <Space pushTop={true} />
            <Actionbar
                RightComponent={
                    <Button type={ButtonType.primary} icon={IconType.send} onClick={handleCreate}>
                        {i18n._(t`Bewerken`)}
                    </Button>
                }
            />
        </>
    )

    function handleCreate() {
        NotificationsManager.success('title', 'test')
        history.push(routes.authorized.taalhuis.medewerkers.update)
    }
}

export default MedewerkersOverviewReadView
