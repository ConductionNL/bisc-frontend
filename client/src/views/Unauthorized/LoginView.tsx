import React from 'react'
import Input from '../../components/Core/DataEntry/Input'
import ContentGreetingPageLayout from '../../components/Core/PageLayout/ContentGreetingPageLayout'
import PageTitle from '../../components/Core/Text/PageTitle'
import Paragraph from '../../components/Core/Typography/Paragraph'

function LoginView() {
    return (
        <ContentGreetingPageLayout
            greeting={'Welkom bij Top'}
            ContentComponent={
                <>
                    <PageTitle title={'Log in'} />
                    <Paragraph>Welkom terug! Log in met je email en wachtwoord.</Paragraph>
                    <hr />
                    <Input placeholder={'john@doe.com'} />
                    <Input placeholder={'6+ Karakters'} />
                </>
            }
        />
    )
}

export default LoginView
