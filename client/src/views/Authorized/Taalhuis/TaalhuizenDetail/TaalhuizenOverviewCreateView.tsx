import { t } from '@lingui/macro'
import { useLingui } from '@lingui/react'
import React from 'react'
import { useHistory } from 'react-router-dom'
import Headline from '../../../../components/Chrome/Headline'
import Actionbar from '../../../../components/Core/Actionbar/Actionbar'
import Breadcrumb from '../../../../components/Core/Breadcrumb/Breadcrumb'
import Breadcrumbs from '../../../../components/Core/Breadcrumb/Breadcrumbs'
import Button, { ButtonType } from '../../../../components/Core/Button/Button'
import Input from '../../../../components/Core/DataEntry/Input'
import { NotificationsManager } from '../../../../components/Core/Feedback/Notifications/NotificationsManager'
import Field from '../../../../components/Core/Field/Field'
import Section from '../../../../components/Core/Field/Section'
import Form from '../../../../components/Core/Form/Form'
import HorizontalRule from '../../../../components/Core/HorizontalRule/HorizontalRule'
import Column from '../../../../components/Core/Layout/Column/Column'
import Row from '../../../../components/Core/Layout/Row/Row'
import Space from '../../../../components/Core/Layout/Space/Space'
import PageTitle, { PageTitleSize } from '../../../../components/Core/Text/PageTitle'
import { useMockMutation } from '../../../../hooks/UseMockMutation'
import { routes } from '../../../../routes'
import { Forms } from '../../../../utils/forms'
import { EmailValidators } from '../../../../utils/validators/EmailValidators'
import { GenericValidators } from '../../../../utils/validators/GenericValidators'
import { PhoneNumberValidators } from '../../../../utils/validators/PhoneNumberValidator'
import { taalhuisCreateResponse, TaalhuisFormModel } from './mocks/taalhuizen'
import { TaalhuisCoworkersFormModel } from './TaalhuizenOverviewReadView/coworkers/TaalhuisCoworkersOverviewView'

interface Props {}

const TaalhuizenOverviewCreateView: React.FunctionComponent<Props> = () => {
    const { i18n } = useLingui()
    const [createCoworker, { loading }] = useMockMutation<TaalhuisFormModel, TaalhuisFormModel>(
        taalhuisCreateResponse,
        false
    )
    const history = useHistory()

    return (
        <Form onSubmit={handleCreate}>
            <Headline
                title={i18n._(t`Nieuwe taalhuis`)}
                TopComponent={
                    <Breadcrumbs>
                        <Breadcrumb text={i18n._(t`Test`)} to={routes.authorized.taalhuis.overview} />
                    </Breadcrumbs>
                }
            />
            <Section title={i18n._(t`Vestiging`)}>
                <Column spacing={4}>
                    <Field label={i18n._(t`Naam taalhuis`)} horizontal={true} required={true}>
                        <Input
                            required={true}
                            name="taalhuis"
                            placeholder={i18n._(t`Taalhuis X`)}
                            validators={[GenericValidators.required]}
                        />
                    </Field>

                    <Field label={i18n._(t`Straat en huisnr.`)} horizontal={true}>
                        <Input name="straatnaam" placeholder={i18n._(t`Straatnaam`)} />
                    </Field>

                    <Field label={i18n._(t`Postcode`)} horizontal={true}>
                        <Input name="postcode" placeholder={i18n._(t`1234AB`)} />
                    </Field>

                    <Field label={i18n._(t`Plaats`)} horizontal={true}>
                        <Input name="plaatsnaam" placeholder={i18n._(t`Utrecht`)} />
                    </Field>
                </Column>
            </Section>
            <HorizontalRule />
            <Column spacing={12}>
                <Section title={i18n._(t`Contactgegevens`)}>
                    <Column spacing={4}>
                        <Field label={i18n._(t`Telefoonnummer`)} horizontal={true}>
                            <Input
                                name="telefoonnummer"
                                placeholder={i18n._(t`030 - 123 45 67`)}
                                validators={[GenericValidators.required, PhoneNumberValidators.isPhoneNumber]}
                            />
                        </Field>
                        <Field label={i18n._(t`E-mailadres`)} horizontal={true}>
                            <Input
                                name="email"
                                placeholder={i18n._(t`taalhuis@email.nl`)}
                                validators={[GenericValidators.required, EmailValidators.isEmailAddress]}
                            />
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

                        <Button type={ButtonType.primary} submit={true} loading={loading}>
                            {i18n._(t`Toevoegen`)}
                        </Button>
                    </Row>
                }
            />
        </Form>
    )

    async function handleCreate(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()
        try {
            const formData = Forms.getFormDataFromFormEvent<TaalhuisFormModel>(e)
            const response = await createCoworker(formData)

            if (response) {
                const taalhuis = response as TaalhuisFormModel
                NotificationsManager.success(i18n._(t`Medewerker is aangemaakt`), i18n._(t``))

                history.push(routes.authorized.taalhuis.read.detail.data(taalhuis.id, taalhuis.name))
            }
        } catch (error) {
            NotificationsManager.error(
                i18n._(t`Het is niet gelukt om een medewerker aan te maken`),
                i18n._(t`Probeer het later opnieuw`)
            )
        }
    }
}

export default TaalhuizenOverviewCreateView
