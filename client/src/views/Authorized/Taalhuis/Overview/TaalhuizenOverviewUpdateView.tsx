import { t } from '@lingui/macro'
import { useLingui } from '@lingui/react'
import React, { useState } from 'react'
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
import { IconType } from '../../../../components/Core/Icon/IconType'
import Column from '../../../../components/Core/Layout/Column/Column'
import Row from '../../../../components/Core/Layout/Row/Row'
import Space from '../../../../components/Core/Layout/Space/Space'
import Modal from '../../../../components/Core/Modal/Modal'
import ModalView from '../../../../components/Core/Modal/ModalView'
import PageTitle, { PageTitleSize } from '../../../../components/Core/Text/PageTitle'
import SectionTitle from '../../../../components/Core/Text/SectionTitle'
import Paragraph from '../../../../components/Core/Typography/Paragraph'
import { useMockMutation } from '../../../../hooks/UseMockMutation'
import { routes } from '../../../../routes'

interface Props {}

interface FormValues {
    name: string | undefined
    street: string | undefined
    postalCode: string | undefined
    city: string | undefined
    phone: string | undefined
    email: string | undefined
}

const TaalhuizenOverviewUpdateView: React.FunctionComponent<Props> = () => {
    const { i18n } = useLingui()
    const history = useHistory()

    const [modalIsVisible, setModalIsVisible] = useState<boolean>(false)
    const [taalhuisName, setTaalhuisName] = useState<string>()
    const [streetName, setStreetName] = useState<string>()
    const [postalCode, setPostalCode] = useState<string>()
    const [city, setCity] = useState<string>()
    const [phoneNumber, setPhoneNumber] = useState<string>()
    const [email, setEmail] = useState<string>()

    const [mutate, { loading }] = useMockMutation<FormValues, any>(
        {
            name: taalhuisName,
            street: streetName,
            postalCode: postalCode,
            city: city,
            phone: phoneNumber,
            email: email,
        },
        false
    )

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
                        <Field label={i18n._(t`Naam Taalhuis`)} horizontal={true} required={true}>
                            <Input
                                required={true}
                                name="taalhuis"
                                placeholder={i18n._(t`Taalhuis X`)}
                                onChangeValue={value => setTaalhuisName(value)}
                            />
                        </Field>

                        <Field label={i18n._(t`Straat en huisnr.`)} horizontal={true}>
                            <Input
                                name="straatnaam"
                                placeholder={i18n._(t`Straatnaam`)}
                                onChangeValue={value => setStreetName(value)}
                            />
                        </Field>

                        <Field label={i18n._(t`Postcode`)} horizontal={true}>
                            <Input
                                name="postcode"
                                placeholder={i18n._(t`1234AB`)}
                                onChangeValue={value => setPostalCode(value)}
                            />
                        </Field>

                        <Field label={i18n._(t`Plaats`)} horizontal={true}>
                            <Input
                                name="plaatsnaam"
                                placeholder={i18n._(t`Utrecht`)}
                                onChangeValue={value => setCity(value)}
                            />
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
                                onChangeValue={value => setPhoneNumber(value)}
                            />
                        </Field>
                        <Field label={i18n._(t`E-mailadres`)} horizontal={true}>
                            <Input
                                name="email"
                                placeholder={i18n._(t`Taalhuis@email.nl`)}
                                onChangeValue={value => setEmail(value)}
                            />
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
                            onClick={() => setModalIsVisible(true)}
                        >
                            {i18n._(t`Taalhuis verwijderen`)}
                        </Button>
                    </Row>
                }
                RightComponent={
                    <Row>
                        <Button
                            type={ButtonType.secondary}
                            onClick={() => history.push(routes.authorized.taalhuis.taalhuisRead)}
                        >
                            {i18n._(t`Annuleren`)}
                        </Button>

                        <Button loading={loading} type={ButtonType.primary} onClick={handleUpdate}>
                            {i18n._(t`Opslaan`)}
                        </Button>
                    </Row>
                }
            />
            <Modal isOpen={modalIsVisible} onRequestClose={() => setModalIsVisible(false)}>
                <ModalView
                    onClose={() => setModalIsVisible(false)}
                    ContentComponent={
                        <Column spacing={6}>
                            <SectionTitle title={'Taalhuis X verwijderen'} heading="H4" />
                            <Paragraph>
                                Weet je zeker dat je het taalhuis wil verwijderen? Hiermee worden ook alle onderliggende
                                medewerkers en deelnemers verwijderd.
                            </Paragraph>
                        </Column>
                    }
                    BottomComponent={
                        <>
                            <Button type={ButtonType.secondary} onClick={() => setModalIsVisible(false)}>
                                Annuleren
                            </Button>
                            <Button
                                danger={true}
                                type={ButtonType.primary}
                                icon={IconType.delete}
                                onClick={handleDelete}
                            >
                                Verwijderen
                            </Button>
                        </>
                    }
                />
            </Modal>
        </>
    )

    function handleDelete() {
        alert('deleted')
    }

    async function handleUpdate() {
        try {
            const response = await mutate({
                name: taalhuisName,
                street: streetName,
                postalCode: postalCode,
                city: city,
                phone: phoneNumber,
                email: email,
            })
            console.log(response)

            if (!response) {
                NotificationsManager.error('Oops..', 'Er is iets fout gegaan')
                return
            }
            NotificationsManager.success('Succes', 'succeeded')
            history.push(routes.authorized.taalhuis.taalhuisRead)
        } catch (e) {
            console.log(e)
        }
    }
}

export default TaalhuizenOverviewUpdateView
