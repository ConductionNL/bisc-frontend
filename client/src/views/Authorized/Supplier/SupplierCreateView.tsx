import { t } from '@lingui/macro'
import { useLingui } from '@lingui/react'
import React from 'react'
import { useHistory } from 'react-router-dom'
import Actionbar from '../../../components/Core/Actionbar/Actionbar'
import Breadcrumb from '../../../components/Core/Breadcrumb/Breadcrumb'
import Breadcrumbs from '../../../components/Core/Breadcrumb/Breadcrumbs'
import Button, { ButtonType } from '../../../components/Core/Button/Button'
import Input from '../../../components/Core/DataEntry/Input'
import { NotificationsManager } from '../../../components/Core/Feedback/Notifications/NotificationsManager'
import Field from '../../../components/Core/Field/Field'
import Section from '../../../components/Core/Field/Section'
import HorizontalRule from '../../../components/Core/HorizontalRule/HorizontalRule'
import Column from '../../../components/Core/Layout/Column/Column'
import Row from '../../../components/Core/Layout/Row/Row'
import Space from '../../../components/Core/Layout/Space/Space'
import PageTitle, { PageTitleSize } from '../../../components/Core/Text/PageTitle'
import { useMockMutation } from '../../../hooks/UseMockMutation'
import { routes } from '../../../routes'
import { Forms } from '../../../utils/forms'
import { GenericValidators } from '../../../utils/validators/GenericValidators'
import { PhoneNumberValidators } from '../../../utils/validators/PhoneNumberValidator'
import { supplierCreateResponse } from './mocks/suppliers'

interface FormModel {
    name: string
    street: string
    postalCode: string
    city: string
    phone: string
    email: string
}

interface Props {}

const SupplierCreateView: React.FunctionComponent<Props> = () => {
    const { i18n } = useLingui()
    const history = useHistory()
    const [createSupplier, { loading }] = useMockMutation<FormModel, FormModel>(supplierCreateResponse, false)

    const handleCreate = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        try {
            const data = Forms.getFormDataFromFormEvent<FormModel>(e)
            await createSupplier(data)

            NotificationsManager.success(
                i18n._(t`Aanbieder is aangemaakt`),
                i18n._(t`U word teruggestuurd naar het overzicht`)
            )
            history.push(routes.authorized.supplier.overview)
        } catch (error) {
            NotificationsManager.error(
                i18n._(t`Het is niet gelukt om een aanbieder aan te maken`),
                i18n._(t`Probeer het later opnieuw`)
            )
        }
    }

    return (
        <form onSubmit={handleCreate}>
            <Column spacing={12}>
                <Breadcrumbs>
                    <Breadcrumb text={i18n._(t`Aanbieders`)} to={routes.authorized.supplier.overview} />
                </Breadcrumbs>
                <PageTitle title={i18n._(t`Nieuwe aanbieder`)} size={PageTitleSize.default} />
                <Section title={i18n._(t`Vestiging`)}>
                    <Column spacing={4}>
                        <Field label={i18n._(t`Naam aanbieder`)} horizontal={true} required={true}>
                            <Input
                                required={true}
                                name="name"
                                placeholder={i18n._(t`Naam`)}
                                onChange={undefined}
                                validators={[GenericValidators.required]}
                            />
                        </Field>

                        <Field label={i18n._(t`Straat en huisnr.`)} horizontal={true}>
                            <Input name="street" placeholder={i18n._(t`Straatnaam`)} onChange={undefined} />
                        </Field>

                        <Field label={i18n._(t`Postcode`)} horizontal={true}>
                            <Input name="zipcode" placeholder={i18n._(t`1234 AB`)} onChange={undefined} />
                        </Field>

                        <Field label={i18n._(t`Plaats`)} horizontal={true}>
                            <Input name="place" placeholder={i18n._(t`Utrecht`)} onChange={undefined} />
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
                                validators={[PhoneNumberValidators.isPhoneNumber]}
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
                            onClick={() => history.push(routes.authorized.supplier.overview)}
                        >
                            {i18n._(t`Annuleren`)}
                        </Button>

                        <Button type={ButtonType.primary} submit={true} loading={loading}>
                            {i18n._(t`Toevoegen`)}
                        </Button>
                    </Row>
                }
            />
        </form>
    )
}

export default SupplierCreateView
