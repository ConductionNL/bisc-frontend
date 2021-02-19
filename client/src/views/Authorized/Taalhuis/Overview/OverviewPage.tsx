import React, { useState } from 'react'
import Actionbar from '../../../../components/Core/Actionbar/Actionbar'
import Button, { ButtonType } from '../../../../components/Core/Button/Button'
import Input from '../../../../components/Core/DataEntry/Input'
import Password from '../../../../components/Core/DataEntry/Password'
import { NotificationsManager } from '../../../../components/Core/Feedback/Notifications/NotificationsManager'
import PasswordStrengthBar from '../../../../components/Core/Feedback/PasswordStrengthBar/PasswordStrengthBar'
import Field from '../../../../components/Core/Field/Field'
import Section from '../../../../components/Core/Field/Section'
import Column from '../../../../components/Core/Layout/Column/Column'
import Space from '../../../../components/Core/Layout/Space/Space'
import PageTitle, { PageTitleSize } from '../../../../components/Core/Text/PageTitle'

interface Props {}

const OverviewPage: React.FunctionComponent<Props> = () => {
    return (
        <>
            <Column spacing={12}>
                <PageTitle title={'Nieuwe medewerker'} size={PageTitleSize.default} />
                <Section title={'Wachtwoord aanpassen'}>
                    <Column spacing={4}>
                        <Field label={'Gegevens'} horizontal={true} required={true}>
                            <Input required={true} name="achternaam" placeholder={'Achternaam'} onChange={undefined} />
                        </Field>

                        <Field label={'Tussenvoegsel'} horizontal={true}>
                            <Input name="tussenvoegsel" placeholder={'Tussenvoegsel'} onChange={undefined} />
                        </Field>

                        <Field label={'Roepnaam'} horizontal={true} required={true}>
                            <Input required={true} name="roepnaam" placeholder={'Roepnaam'} onChange={undefined} />
                        </Field>

                        <Field label={'Telefoonnumber'} horizontal={true}>
                            <Input name="telefoonnummer" placeholder={'Telefoonnummer'} onChange={undefined} />
                        </Field>
                    </Column>
                </Section>
            </Column>
            <Space pushTop={true} />
            <Actionbar
                RightComponent={
                    <Button type={ButtonType.primary} onClick={() => NotificationsManager.success('title', 'test')}>
                        Wachtwoord wijzigen
                    </Button>
                }
            />
        </>
    )
}

export default OverviewPage
