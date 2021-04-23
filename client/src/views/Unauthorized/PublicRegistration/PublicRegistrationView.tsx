import { PublicRegistrationFormContainer } from 'components/Domain/PublicRegistration/FormContainer/PublicRegistrationFormContainer'
import { PublicRegistrationHeader } from 'components/Domain/PublicRegistration/PublicRegistrationHeader/PublicRegistrationHeader'
import React from 'react'
export const PublicRegistrationView: React.FC = () => {
    return (
        <div>
            <PublicRegistrationHeader
                title={'Aanmelding deelnemer Taalhuis'}
                subtitle={
                    'Met dit formulier kunt u een deelnemer aanmelden voor deelname aan activiteiten bij een Taalhuis.'
                }
                description={`Wanneer wij de aanmelding ontvangen hebben nemen we contact op met 
                de deelnemer om een afspreek te maken voor een intake. Tijdens deze intake bekijken 
                we welke aanpak voor deze deelnemer het meest geschikt is.`}
            />
            <PublicRegistrationFormContainer>
                <div>test</div>
            </PublicRegistrationFormContainer>
        </div>
    )
}
