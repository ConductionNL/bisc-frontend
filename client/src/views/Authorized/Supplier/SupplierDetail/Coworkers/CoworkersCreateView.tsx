import { t } from '@lingui/macro'
import { useLingui } from '@lingui/react'
import React from 'react'
import { useHistory } from 'react-router-dom'
import Headline from '../../../../../components/Chrome/Headline'
import Actionbar from '../../../../../components/Core/Actionbar/Actionbar'
import Availabillity from '../../../../../components/Core/Availabillity/Availabillity'
import Breadcrumb from '../../../../../components/Core/Breadcrumb/Breadcrumb'
import Breadcrumbs from '../../../../../components/Core/Breadcrumb/Breadcrumbs'
import Button, { ButtonType } from '../../../../../components/Core/Button/Button'
import Input from '../../../../../components/Core/DataEntry/Input'
import { NotificationsManager } from '../../../../../components/Core/Feedback/Notifications/NotificationsManager'
import Field from '../../../../../components/Core/Field/Field'
import Section from '../../../../../components/Core/Field/Section'
import Form from '../../../../../components/Core/Form/Form'
import HorizontalRule from '../../../../../components/Core/HorizontalRule/HorizontalRule'
import { IconType } from '../../../../../components/Core/Icon/IconType'
import Column from '../../../../../components/Core/Layout/Column/Column'
import Row from '../../../../../components/Core/Layout/Row/Row'
import Space from '../../../../../components/Core/Layout/Space/Space'
import { useMockMutation } from '../../../../../hooks/UseMockMutation'
import { routes } from '../../../../../routes'
import { Forms } from '../../../../../utils/forms'
import { GenericValidators } from '../../../../../utils/validators/GenericValidators'
import { InsertionValidators } from '../../../../../utils/validators/InsertionValidator'
import { PhoneNumberValidators } from '../../../../../utils/validators/PhoneNumberValidator'
import { coworkersCreateMock } from './mocks/coworkers'

interface FormModel {
    id: number
    lastname: string
    callsign: string
    roles: string[]
    createdAt: string
    updatedAt: string
}

interface Props {}

const CoworkerCreateView: React.FunctionComponent<Props> = () => {
    const { i18n } = useLingui()
    const history = useHistory()
    const [createSupplier, { loading }] = useMockMutation<FormModel, FormModel>(coworkersCreateMock, false)

    const handleCreate = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        try {
            const data = Forms.getFormDataFromFormEvent<FormModel>(e)
            await createSupplier(data)

            NotificationsManager.success(
                i18n._(t`Aanbieder is aangemaakt`),
                i18n._(t`U word teruggestuurd naar het overzicht`)
            )
            history.push(routes.authorized.supplier.read.coworkers.index())
        } catch (error) {
            NotificationsManager.error(
                i18n._(t`Het is niet gelukt om een aanbieder aan te maken`),
                i18n._(t`Probeer het later opnieuw`)
            )
        }
    }

    return (
        <Form onSubmit={handleCreate} style={{ height: '100%' }}>
            <Headline
                title={i18n._(t`Nieuwe aanbieder`)}
                TopComponent={
                    <Breadcrumbs>
                        <Breadcrumb text={i18n._(t`Aanbieders`)} to={routes.authorized.supplier.overview} />
                    </Breadcrumbs>
                }
            />
            <Section title={i18n._(t`Gegevens`)}>
                <Column spacing={4}>
                    <Field label={i18n._(t`Achternaam`)} horizontal={true} required={true}>
                        <Input
                            required={true}
                            name="lastname"
                            placeholder={i18n._(t`Wit`)}
                            validators={[GenericValidators.required]}
                        />
                    </Field>

                    <Field label={i18n._(t`Tussenvoegsel`)} horizontal={true}>
                        <Input
                            name="insertion"
                            placeholder={i18n._(t`de`)}
                            validators={[GenericValidators.required, InsertionValidators.isValidInsertion]}
                        />
                    </Field>

                    <Field label={i18n._(t`Roepnaam`)} horizontal={true}>
                        <Input
                            name="callSign"
                            placeholder={i18n._(t`Peter`)}
                            validators={[GenericValidators.required]}
                        />
                    </Field>

                    <Field label={i18n._(t`Telefoonnummer`)} horizontal={true}>
                        <Input
                            name="phonenumber"
                            placeholder={i18n._(t`06 - 85 26 72 80`)}
                            validators={[PhoneNumberValidators.isPhoneNumber]}
                        />
                    </Field>
                </Column>
            </Section>

            <HorizontalRule />

            <Section title={i18n._(t`Beschikbaarheid`)}>
                <Column spacing={4}>
                    <Field label={i18n._(t`Beschikbaarheid`)} horizontal={true}>
                        <Availabillity />
                    </Field>
                    <Field label={i18n._(t`Notities`)} horizontal={true}>
                        <Input name="email" placeholder={i18n._(t`Notities met betrekking tot beschikbaarheid`)} />
                    </Field>
                </Column>
            </Section>
            <Space pushTop={true} />
            <Actionbar
                RightComponent={
                    <Row>
                        <Button
                            type={ButtonType.secondary}
                            onClick={() => history.push(routes.authorized.supplier.read.coworkers.overview())}
                        >
                            {i18n._(t`Annuleren`)}
                        </Button>

                        <Button type={ButtonType.primary} submit={true} loading={loading} icon={IconType.send}>
                            {i18n._(t`Uitnodigen`)}
                        </Button>
                    </Row>
                }
            />
        </Form>
    )
}

export default CoworkerCreateView
