import React, { useRef, useState } from 'react'
import { t } from '@lingui/macro'
import { useLingui } from '@lingui/react'
import Button, { ButtonType } from 'components/Core/Button/Button'
import Form from 'components/Core/Form/Form'
import { PublicRegistrationFields } from 'components/Domain/PublicRegistration/Fields/PublicRegistrationFields'
import { PublicRegistrationActionBar } from 'components/Domain/PublicRegistration/PublicRegistrationActionBar/PublicRegistrationActionBar'
import { PublicRegistrationHeader } from 'components/Domain/PublicRegistration/PublicRegistrationHeader/PublicRegistrationHeader'
import { IconType } from 'components/Core/Icon/IconType'
import { LanguageHouseFieldsetModel } from 'components/Domain/PublicRegistration/Fields/Fieldsets/LanguageHouseFieldset'
import { PermissionFieldsetModel } from 'components/Domain/PublicRegistration/Fields/Fieldsets/PermissionFieldset'
import { ContactInformationFieldsetFormModel } from 'components/fieldsets/shared/ContactInformationFieldset'
import { ExplanationInformationFieldsetModel } from 'components/fieldsets/shared/ExplanationInformationFieldset'
import { PersonInformationFieldsetModel } from 'components/fieldsets/shared/PersonInformationFieldset'
import { useRegisterStudentMutation } from 'generated/graphql'
import { Forms } from 'utils/forms'
import { RegistratorInformationFieldsetModel } from 'components/Domain/PublicRegistration/Fields/Fieldsets/RegistratorInformationFieldset'

interface FormModel
    extends RegistratorInformationFieldsetModel,
        LanguageHouseFieldsetModel,
        PersonInformationFieldsetModel,
        ContactInformationFieldsetFormModel,
        ExplanationInformationFieldsetModel,
        PermissionFieldsetModel {}

export const PublicRegistrationView: React.FC = () => {
    const { i18n } = useLingui()
    const [registerStudent, { loading }] = useRegisterStudentMutation()
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
                    <Button icon={IconType.send} type={ButtonType.primary} submit={true} loading={loading}>
                        {i18n._(t`Versturen`)}
                    </Button>
                </PublicRegistrationActionBar>
            </Form>
        </>
    )

    async function handleCreate(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()

        const formData = Forms.getFormDataFromFormEvent<FormModel>(e)

        const response = await registerStudent({
            variables: {
                input: {
                    languageHouseId: formData.languageHouse,
                    student: {
                        givenName: formData.nickName,
                        additionalName: formData.addition,
                        familyName: formData.lastName,
                        email: formData.contactEmail ?? '',
                        telephone: formData.contactPhone ?? '',
                        address: {
                            street: formData.street,
                            postalCode: formData.contactPostalCode,
                            locality: formData.contactCity,
                            houseNumber: formData.streetNr,
                            houseNumberSuffix: formData.addition,
                        },
                    },
                    registrar: {
                        organisationName: formData.registeringParty,
                        givenName: formData.registratorGivenName,
                        additionalName: formData.registratorAddition,
                        familyName: formData.registratorLastName,
                        email: formData.registratorEmail,
                        telephone: formData.registratorPhone,
                    },
                    memo: formData.note,
                },
            },
        })

        if (response.errors?.length || !response.data) {
            return
        }

        handleSuccess()
    }

    function handleSuccess() {
        setCreateSucces(true)
        formRef.current?.reset()
        window.scrollTo(0, 0)
    }
}
