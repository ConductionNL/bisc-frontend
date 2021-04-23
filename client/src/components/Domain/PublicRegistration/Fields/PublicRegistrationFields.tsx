import React from 'react'
import SectionTitle from 'components/Core/Text/SectionTitle'
import styles from './PublicRegistrationFields.module.scss'
import RegistratorInformationFieldset from './Fieldsets/RegistratorInformationFieldset'
import HorizontalRule from 'components/Core/HorizontalRule/HorizontalRule'
import LanguageHouseFieldset from './Fieldsets/LanguageHouseFieldset'
import PersonInformationFieldset from 'components/fieldsets/shared/PersonInformationFieldset'
import ContactInformationFieldset from 'components/fieldsets/shared/ContactInformationFieldset'
import { useLingui } from '@lingui/react'
import { t } from '@lingui/macro'
import ExplanationInformationFieldset from 'components/fieldsets/shared/ExplanationInformationFieldset'
import PermissionFieldset from './Fieldsets/PermissionFieldset'

interface Props {}

export const PublicRegistrationFields: React.FC<Props> = () => {
    const { i18n } = useLingui()

    return (
        <div className={styles.container}>
            <SectionTitle heading={'H3'} title={'Aanmelder'} className={styles.sectionTitle} />
            <RegistratorInformationFieldset />
            <HorizontalRule />
            <SectionTitle heading={'H3'} title={'Taalhuis'} className={styles.sectionTitle} />
            <LanguageHouseFieldset />
            <HorizontalRule />
            <SectionTitle heading={'H3'} title={'Deelnemer'} className={styles.sectionTitle} />
            <PersonInformationFieldset
                fieldControls={{
                    gender: {
                        hidden: true,
                    },
                    dateOfBirth: {
                        hidden: true,
                    },
                    countryOfOrigin: {
                        hidden: true,
                    },
                }}
            />
            <HorizontalRule />
            <ContactInformationFieldset
                fieldControls={{
                    postalCode: {
                        hidden: true,
                    },
                    phoneNumberContactPerson: {
                        hidden: true,
                    },
                    address: {
                        hidden: true,
                    },
                    contactPreference: {
                        hidden: true,
                    },
                    city: {
                        hidden: true,
                    },
                }}
            />
            <HorizontalRule />
            <ContactInformationFieldset
                fieldControls={{
                    phoneNumberContactPerson: {
                        hidden: true,
                    },
                    phone: {
                        hidden: true,
                    },
                    email: {
                        hidden: true,
                    },
                    contactPreference: {
                        hidden: true,
                    },
                }}
                fieldNaming={{
                    title: i18n._(t`Adres`),
                }}
            />
            <HorizontalRule />
            <ExplanationInformationFieldset />
            <HorizontalRule />
            <PermissionFieldset />
        </div>
    )
}
