import { t } from '@lingui/macro'
import { useLingui } from '@lingui/react'
import React from 'react'
import { useHistory } from 'react-router-dom'
import Headline from '../../../../../../components/Chrome/Headline'
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
import Form from '../../../../../../components/Core/Form/Form'
import HorizontalRule from '../../../../../../components/Core/HorizontalRule/HorizontalRule'
import { IconType } from '../../../../../../components/Core/Icon/IconType'
import Column from '../../../../../../components/Core/Layout/Column/Column'
import Row from '../../../../../../components/Core/Layout/Row/Row'
import Space from '../../../../../../components/Core/Layout/Space/Space'
import { useMockMutation } from '../../../../../../hooks/UseMockMutation'
import { routes } from '../../../../../../routes'
import { Forms } from '../../../../../../utils/forms'
import { coworkerCreateResponse } from './coworkers'
import { FormModel } from './TaalhuisCoworkersOverviewView'

interface Props {}

const TaalhuisCoworkerOverviewCreateView: React.FunctionComponent<Props> = () => {
    const { i18n } = useLingui()
    const history = useHistory()
    const [createCoworker, { loading }] = useMockMutation<FormModel, FormModel>(coworkerCreateResponse, false)

    return (
        <Form onSubmit={handleCreate}>
            <Headline
                title={i18n._(t`Nieuwe medewerker`)}
                TopComponent={
                    <Breadcrumbs>
                        <Breadcrumb text={i18n._(t`Test`)} to={routes.authorized.taalhuis.overview} />
                    </Breadcrumbs>
                }
            />
            <Section title={i18n._(t`Gegevens`)}>
                <Column spacing={4}>
                    <Field label={i18n._(t`Achternaam`)} horizontal={true} required={true}>
                        <Input required={true} name="achternaam" placeholder={i18n._(t`Wit`)} />
                    </Field>

                    <Field label={i18n._(t`Tussenvoegsel`)} horizontal={true}>
                        <Input name="tussenvoegsel" placeholder={i18n._(t`de`)} />
                    </Field>

                    <Field label={i18n._(t`Roepnaam`)} horizontal={true} required={true}>
                        <Input name="roepnaam" placeholder={i18n._(t`Peter`)} required={true} />
                    </Field>

                    <Field label={i18n._(t`Telefoonnummer`)} horizontal={true}>
                        <Input name="telefoonnummer" placeholder={i18n._(t`030 - 123 45 67`)} />
                    </Field>
                </Column>
            </Section>
            <HorizontalRule />
            <Column spacing={12}>
                <Section title={i18n._(t`Accountgegevens`)}>
                    <Column spacing={4}>
                        <Field label={i18n._(t`E-mailadres`)} horizontal={true} required={true}>
                            <Input name="email" placeholder={i18n._(t`taalhuis@email.nl`)} required={true} />
                        </Field>
                        <Field label={'Rol'} horizontal={true} required={true}>
                            <Column spacing={4}>
                                <Row>
                                    <RadioButton name={'coordinator'} value="coordinator" />
                                    <LabelTag label="Coördinator" color={LabelColor.red} />
                                </Row>
                                <Row>
                                    <RadioButton name={'medewerker'} value="medewerker" />
                                    <LabelTag label="Medewerker" color={LabelColor.blue} />
                                </Row>
                            </Column>
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
                            onClick={() => history.push(routes.authorized.taalhuis.overview)}
                        >
                            {i18n._(t`Annuleren`)}
                        </Button>

                        <Button type={ButtonType.primary} icon={IconType.send} submit={true} loading={loading}>
                            {i18n._(t`Uitnodigen`)}
                        </Button>
                    </Row>
                }
            />
        </Form>
    )

    async function handleCreate(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()
        try {
            const formData = Forms.getFormDataFromFormEvent<FormModel>(e)
            const response = await createCoworker(formData)

            if (response) {
                const coworker = response as FormModel
                NotificationsManager.success(i18n._(t`Medewerker is aangemaakt`), i18n._(t``))

                history.push(routes.authorized.taalhuis.coworkers.read(coworker.id, coworker.roepnaam))
            }
        } catch (error) {
            NotificationsManager.error(
                i18n._(t`Het is niet gelukt om een medewerker aan te maken`),
                i18n._(t`Probeer het later opnieuw`)
            )
        }
    }
}

export default TaalhuisCoworkerOverviewCreateView
