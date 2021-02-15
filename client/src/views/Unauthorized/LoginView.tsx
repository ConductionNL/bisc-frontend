import React from 'react'
import Button from '../../components/Core/Button/Button'
import FormField from '../../components/Core/DataEntry/FormField'
import Input from '../../components/Core/DataEntry/Input'
import HorizontalRule from '../../components/Core/HorizontalRule/HorizontalRule'
import Column from '../../components/Core/Layout/Column/Column'
import Link from '../../components/Core/Link/Link'
import ContentGreetingPageLayout from '../../components/Core/PageLayout/ContentGreetingPageLayout'
import PageTitle from '../../components/Core/Text/PageTitle'
import Paragraph from '../../components/Core/Typography/Paragraph'

function LoginView() {
    return (
        <ContentGreetingPageLayout
            greeting={'Welkom bij Top'}
            logoEnabled={true}
            ContentComponent={
                <Column spacing={8}>
                    <Column spacing={5}>
                        <PageTitle title={'Log in'} />
                        <Paragraph>Welkom terug! Log in met je email en wachtwoord.</Paragraph>
                        <HorizontalRule />
                    </Column>
                    <Column spacing={12}>
                        <Column spacing={6}>
                            <FormField label={'E-mail'}>
                                <Input placeholder={'john@doe.com'} />
                            </FormField>
                            <FormField label={'Wachtwoord'} RightComponent={<Link text={'Wachtwoord vergeten?'} />}>
                                <Input placeholder={'6+ Karakters'} />
                            </FormField>
                        </Column>
                        <Button stretch={true}>Inloggen</Button>
                    </Column>
                </Column>
            }
        />
    )
}

export default LoginView
