import React from 'react'
import { t } from '@lingui/macro'
import { useLingui } from '@lingui/react'
import Button, { ButtonType } from 'components/Core/Button/Button'
import Form from 'components/Core/Form/Form'
import { PublicRegistrationFields } from 'components/Domain/PublicRegistration/Fields/PublicRegistrationFields'
import { PublicRegistrationActionBar } from 'components/Domain/PublicRegistration/PublicRegistrationActionBar/PublicRegistrationActionBar'
import { PublicRegistrationHeader } from 'components/Domain/PublicRegistration/PublicRegistrationHeader/PublicRegistrationHeader'
import { IconType } from 'components/Core/Icon/IconType'

export const PublicRegistrationView: React.FC = () => {
    const { i18n } = useLingui()

    return (
        <>
            <PublicRegistrationHeader
                title={'Aanmelding deelnemer Taalhuis'}
                subtitle={
                    'Met dit formulier kunt u een deelnemer aanmelden voor deelname aan activiteiten bij een Taalhuis.'
                }
                description={`Wanneer wij de aanmelding ontvangen hebben nemen we contact op met 
                de deelnemer om een afspreek te maken voor een intake. Tijdens deze intake bekijken 
                we welke aanpak voor deze deelnemer het meest geschikt is.`}
            />
            <Form>
                <PublicRegistrationFields />
                <PublicRegistrationActionBar>
                    <Button icon={IconType.send} type={ButtonType.primary}>
                        {i18n._(t`Versturen`)}
                    </Button>
                </PublicRegistrationActionBar>
            </Form>
        </>
    )
}
