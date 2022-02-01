import React from 'react'
import SectionTitle from 'components/Core/Text/SectionTitle'
import styles from './PublicRegistrationFields.module.scss'
import {
    RegistratorInformationFieldset,
    RegistratorInformationFieldsetModel,
} from './Fieldsets/RegistratorInformationFieldset'
import HorizontalRule from 'components/Core/HorizontalRule/HorizontalRule'
import LanguageHouseFieldset, { LanguageHouseFieldsetModel } from './Fieldsets/LanguageHouseFieldset'
import {
    PersonInformationFieldset,
    PersonInformationFieldsetModel,
} from 'components/fieldsets/shared/PersonInformationFieldset'
import {
    ContactInformationFieldset,
    ContactInformationFieldsetFormModel,
} from 'components/fieldsets/shared/ContactInformationFieldset'
import { useLingui } from '@lingui/react'
import { t } from '@lingui/macro'
import ExplanationInformationFieldset, {
    ExplanationInformationFieldsetModel,
} from 'components/fieldsets/shared/ExplanationInformationFieldset'
import PermissionFieldset, { PermissionFieldsetModel } from './Fieldsets/PermissionFieldset'

interface Props {
    hasAcceptedToShareDetailsWithTaalhuis: boolean
    setHasAcceptedToShareDetailsWithTaalhuis: (newValue: boolean) => void
}

export interface PublicRegistrationFieldsFormModel
    extends RegistratorInformationFieldsetModel,
        LanguageHouseFieldsetModel,
        PersonInformationFieldsetModel,
        ContactInformationFieldsetFormModel,
        ExplanationInformationFieldsetModel,
        PermissionFieldsetModel {}

export const PublicRegistrationFields: React.FC<Props> = props => {
    const { hasAcceptedToShareDetailsWithTaalhuis, setHasAcceptedToShareDetailsWithTaalhuis } = props
    const { i18n } = useLingui()

    return (
        <div className={styles.container}>
            <SectionTitle heading={'H3'} title={i18n._(t`Aanmelder`)} className={styles.sectionTitle} />
            <RegistratorInformationFieldset />
            <HorizontalRule />
            <SectionTitle heading={'H3'} title={i18n._(t`Deelnemer`)} className={styles.sectionTitle} />
            <PersonInformationFieldset
                fieldControls={{
                    gender: {
                        hidden: true,
                    },
                    birthday: {
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
                    email: {
                        required: true,
                    },
                    telephone: {
                        required: true,
                    },
                    postalCode: {
                        hidden: true,
                    },
                    contactPersonTelephone: {
                        hidden: true,
                    },
                    address: {
                        hidden: true,
                    },
                    contactPreference: {
                        hidden: true,
                    },
                    locality: {
                        hidden: true,
                    },
                }}
            />
            <HorizontalRule />
            <ContactInformationFieldset
                fieldControls={{
                    address: { required: true },
                    postalCode: { required: true },
                    locality: { required: true },
                    contactPersonTelephone: {
                        hidden: true,
                    },
                    telephone: {
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
            <SectionTitle heading={'H3'} title={i18n._(t`Taalhuis`)} className={styles.sectionTitle} />
            <LanguageHouseFieldset />
            <HorizontalRule />
            <PermissionFieldset
                hasAcceptedToShareDetailsWithTaalhuis={hasAcceptedToShareDetailsWithTaalhuis}
                setHasAcceptedToShareDetailsWithTaalhuis={setHasAcceptedToShareDetailsWithTaalhuis}
            />
        </div>
    )
}
