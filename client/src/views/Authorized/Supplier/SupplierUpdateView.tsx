import { t } from '@lingui/macro'
import { useLingui } from '@lingui/react'
import React from 'react'
import { useHistory, useParams } from 'react-router-dom'
import Headline from '../../../components/Chrome/Headline'
import Actionbar from '../../../components/Core/Actionbar/Actionbar'
import Breadcrumb from '../../../components/Core/Breadcrumb/Breadcrumb'
import Breadcrumbs from '../../../components/Core/Breadcrumb/Breadcrumbs'
import Button, { ButtonType } from '../../../components/Core/Button/Button'
import Input from '../../../components/Core/DataEntry/Input'
import ErrorBlock from '../../../components/Core/Feedback/Error/ErrorBlock'
import { NotificationsManager } from '../../../components/Core/Feedback/Notifications/NotificationsManager'
import Spinner, { Animation } from '../../../components/Core/Feedback/Spinner/Spinner'
import Field from '../../../components/Core/Field/Field'
import Section from '../../../components/Core/Field/Section'
import Form from '../../../components/Core/Form/Form'
import HorizontalRule from '../../../components/Core/HorizontalRule/HorizontalRule'
import Center from '../../../components/Core/Layout/Center/Center'
import Column from '../../../components/Core/Layout/Column/Column'
import Row from '../../../components/Core/Layout/Row/Row'
import Space from '../../../components/Core/Layout/Space/Space'
import { useMockQuery } from '../../../components/hooks/useMockQuery'
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

interface Params {
    id: string
    name: string
}

const SupplierUpdateView: React.FunctionComponent<Props> = () => {
    const { i18n } = useLingui()
    const history = useHistory()
    const { id, name } = useParams<Params>()
    const { data, loading: queryLoading, error } = useMockQuery(supplierCreateResponse)
    const [updateSupplier, { loading: mutationLoading }] = useMockMutation<FormModel, FormModel>(
        supplierCreateResponse,
        false
    )

    const handleCreate = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        try {
            const data = Forms.getFormDataFromFormEvent<FormModel>(e)
            await updateSupplier(data)
            NotificationsManager.success(
                i18n._(t`Aanbieder is bewerkt`),
                i18n._(t`U word teruggestuurd naar het overzicht`)
            )
            history.push(routes.authorized.supplier.read(id, name))
        } catch (error) {
            NotificationsManager.error(
                i18n._(t`Het is niet gelukt om een aanbieder aan te maken`),
                i18n._(t`Probeer het later opnieuw`)
            )
        }
    }

    return (
        <Form onSubmit={handleCreate}>
            <Headline
                title={i18n._(t`Aanbieder ${name}`)}
                TopComponent={
                    <Breadcrumbs>
                        <Breadcrumb text={i18n._(t`Aanbieders`)} to={routes.authorized.supplier.overview} />
                    </Breadcrumbs>
                }
            />
            {renderForm()}
        </Form>
    )

    function renderForm() {
        if (queryLoading) {
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
                        <Field label={i18n._(t`Naam aanbieder`)} horizontal={true} required={true}>
                            <Input
                                defaultValue={data?.name}
                                required={true}
                                name="name"
                                placeholder={i18n._(t`Naam`)}
                                onChange={undefined}
                                validators={[GenericValidators.required]}
                            />
                        </Field>

                        <Field label={i18n._(t`Straat en huisnr.`)} horizontal={true}>
                            <Input
                                defaultValue={data?.street}
                                name="street"
                                placeholder={i18n._(t`Straatnaam`)}
                                onChange={undefined}
                            />
                        </Field>

                        <Field label={i18n._(t`Postcode`)} horizontal={true}>
                            <Input
                                defaultValue={data?.postalCode}
                                name="zipcode"
                                placeholder={i18n._(t`1234 AB`)}
                                onChange={undefined}
                            />
                        </Field>

                        <Field label={i18n._(t`Plaats`)} horizontal={true}>
                            <Input
                                defaultValue={data?.city}
                                name="place"
                                placeholder={i18n._(t`Utrecht`)}
                                onChange={undefined}
                            />
                        </Field>
                    </Column>
                </Section>

                <HorizontalRule />
                <Section title={i18n._(t`Contactgegevens`)}>
                    <Column spacing={4}>
                        <Field label={i18n._(t`Telefoonnummer`)} horizontal={true}>
                            <Input
                                defaultValue={data?.phone}
                                name="telefoonnummer"
                                placeholder={i18n._(t`030 - 123 45 67`)}
                                validators={[PhoneNumberValidators.isPhoneNumber]}
                            />
                        </Field>
                        <Field label={i18n._(t`E-mailadres`)} horizontal={true}>
                            <Input
                                defaultValue={data?.email}
                                name="email"
                                placeholder={i18n._(t`taalhuis@email.nl`)}
                                onChange={undefined}
                            />
                        </Field>
                    </Column>
                </Section>
                <Space pushTop={true} />
                <Actionbar
                    RightComponent={
                        <Row>
                            <Button
                                type={ButtonType.secondary}
                                onClick={() => history.push(routes.authorized.supplier.read(id, name))}
                            >
                                {i18n._(t`Annuleren`)}
                            </Button>

                            <Button type={ButtonType.primary} submit={true} loading={mutationLoading}>
                                {i18n._(t`Bewerken`)}
                            </Button>
                        </Row>
                    }
                />
            </>
        )
    }
}

export default SupplierUpdateView
