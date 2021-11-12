import { t } from '@lingui/macro'
import { useLingui } from '@lingui/react'
import HorizontalRule from 'components/Core/HorizontalRule/HorizontalRule'
import Space from 'components/Core/Layout/Space/Space'
import SectionTitle from 'components/Core/Text/SectionTitle'
import { ContactInformationFieldset } from 'components/fieldsets/shared/ContactInformationFieldset'
import CourseInformationFieldset from 'components/fieldsets/shared/CourseInformationFieldset'
import EmployeeEducationInformationFieldset from 'components/fieldsets/shared/EmployeeEducationInformationFieldset'
import { PersonInformationFieldset } from 'components/fieldsets/shared/PersonInformationFieldset'
import React from 'react'

interface Props {}

export const CoworkerVolunteerFields: React.FC<Props> = () => {
    const { i18n } = useLingui()
    return (
        <>
            <SectionTitle title={i18n._(t`Vrijwilliger gegevens`)} heading="H3" />
            <Space pushTop={true} />
            <PersonInformationFieldset
                fieldControls={{
                    familyName: {
                        hidden: true,
                    },
                    additionalName: {
                        hidden: true,
                    },
                    givenName: {
                        hidden: true,
                    },
                }}
            />
            <HorizontalRule />
            <ContactInformationFieldset
                fieldControls={{
                    email: {
                        hidden: true,
                    },
                    telephone: {
                        hidden: true,
                    },
                }}
            />
            <HorizontalRule />
            <EmployeeEducationInformationFieldset />
            <HorizontalRule />
            <CourseInformationFieldset />
        </>
    )
}
