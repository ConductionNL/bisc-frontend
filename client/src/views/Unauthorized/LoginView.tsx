import React from 'react'
import Button from '../../components/Core/Button/Button'
import Input from '../../components/Core/DataEntry/Input'
import Column from '../../components/Core/Layout/Column/Column'
import ContentGreetingPageLayout from '../../components/Core/PageLayout/ContentGreetingPageLayout'
import PageTitle from '../../components/Core/Text/PageTitle'
import Paragraph from '../../components/Core/Typography/Paragraph'

function LoginView() {
    return (
        <ContentGreetingPageLayout
            greeting={'Welkom bij Top'}
            ContentComponent={
                <Column spacing={8}>
                    <Column>
                        <PageTitle title={'Log in'} />
                        <Paragraph>Welkom terug! Log in met je email en wachtwoord.</Paragraph>
                    </Column>
                    <hr />
                    <Column spacing={12}>
                        <Column spacing={6}>
                            <Input placeholder={'john@doe.com'} />
                            <Input placeholder={'6+ Karakters'} />
                        </Column>
                        <Button stretch={true}>Inloggen</Button>
                    </Column>
                </Column>
            }
        />
    )
}

export default LoginView
