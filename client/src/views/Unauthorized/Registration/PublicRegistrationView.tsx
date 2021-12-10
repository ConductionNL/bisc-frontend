import React, { useRef, useState } from 'react'
import { t } from '@lingui/macro'
import { useLingui } from '@lingui/react'
import Button, { ButtonType } from 'components/Core/Button/Button'
import Form from 'components/Core/Form/Form'
import {
    PublicRegistrationFields,
    PublicRegistrationFieldsFormModel,
} from 'components/Domain/PublicRegistration/Fields/PublicRegistrationFields'
import { PublicRegistrationActionBar } from 'components/Domain/PublicRegistration/PublicRegistrationActionBar/PublicRegistrationActionBar'
import { PublicRegistrationHeader } from 'components/Domain/PublicRegistration/PublicRegistrationHeader/PublicRegistrationHeader'
import { IconType } from 'components/Core/Icon/IconType'
import { Forms } from 'utils/forms'

export const PublicRegistrationView: React.FC = () => {
    const { i18n } = useLingui()

    const [createSucces, setCreateSucces] = useState<boolean>()
    const formRef = useRef<HTMLFormElement>()

    return (
        <>
            <PublicRegistrationHeader
                title={i18n._(t`Aanmelding deelnemer Taalhuis`)}
                subtitle={i18n._(
                    t`Met dit formulier kunt u een deelnemer aanmelden voor deelname aan activiteiten bij een Taalhuis.`
                )}
                description={i18n._(t`Wanneer wij de aanmelding ontvangen hebben nemen we contact op met
                    de deelnemer om een afspreek te maken voor een intake. Tijdens deze intake bekijken
                    we welke aanpak voor deze deelnemer het meest geschikt is.`)}
                success={createSucces}
            />
            <Form onSubmit={handleCreate} onRef={formRef}>
                <PublicRegistrationFields />
                <PublicRegistrationActionBar>
                    <Button icon={IconType.send} type={ButtonType.primary} submit={true} loading={false}>
                        {i18n._(t`Versturen`)}
                    </Button>
                </PublicRegistrationActionBar>
            </Form>
        </>
    )

    async function handleCreate(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()

        const formData = Forms.getFormDataFromFormEvent<PublicRegistrationFieldsFormModel>(e)

        // const response = await registerStudent({
        //     variables: {
        //         input: {
        //             languageHouseId: formData.languageHouse,
        //             student: {
        //                 givenName: formData.givenName,
        //                 additionalName: formData.additionalName,
        //                 familyName: formData.familyName,
        //                 email: formData.email ?? '',
        //                 telephone: formData.telephone ?? '',
        //                 address: {
        //                     street: formData.street,
        //                     postalCode: formData.postalCode,
        //                     locality: formData.locality,
        //                     houseNumber: formData.houseNumber,
        //                     houseNumberSuffix: formData.houseNumberSuffix,
        //                 },
        //             },
        //             registrar: {
        //                 organisationName: formData.registeringParty,
        //                 givenName: formData.registratorGivenName,
        //                 additionalName: formData.registratorAddition,
        //                 familyName: formData.registratorLastName,
        //                 email: formData.registratorEmail,
        //                 telephone: formData.registratorPhone,
        //             },
        //             memo: formData.note,
        //         },
        //     },
        // })

        // if (response.errors?.length || !response.data) {
        //     return
        // }

        handleSuccess()
    }

    function handleSuccess() {
        setCreateSucces(true)
        formRef.current?.reset()
        window.scrollTo(0, 0)
    }
}
