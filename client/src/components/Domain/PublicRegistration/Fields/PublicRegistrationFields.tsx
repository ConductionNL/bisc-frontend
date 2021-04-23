import React from 'react'
import SectionTitle from 'components/Core/Text/SectionTitle'
import styles from './PublicRegistrationFields.module.scss'
import RegistratorInformationFieldset from './Fieldsets/RegistratorInformationFieldset'
import HorizontalRule from 'components/Core/HorizontalRule/HorizontalRule'

interface Props {}

export const PublicRegistrationFields: React.FC<Props> = () => {
    return (
        <div className={styles.container}>
            <SectionTitle heading={'H3'} title={'Aanmelder'} className={styles.sectionTitle} />
            <RegistratorInformationFieldset />
            <HorizontalRule />
        </div>
    )
}
