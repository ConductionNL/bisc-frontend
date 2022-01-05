import { Student } from 'api/types/types'
import HorizontalRule from 'components/Core/HorizontalRule/HorizontalRule'
import { IntakeRemarksReadonlyFieldset } from 'components/fieldsets/participants/fieldsets/IntakeRemarksReadonlyFieldset'
import { ReferringOrganizationReadonlyFieldset } from 'components/fieldsets/participants/fieldsets/ReferringOrganizationReadonlyFieldset'
import { ReferringPersonReadonlyFieldset } from 'components/fieldsets/participants/fieldsets/ReferringPersonReadonlyFieldset'
import React from 'react'

interface Props {
    student?: Student
}

export const ParticipationRegistrationReadFields: React.FunctionComponent<Props> = props => {
    const { student } = props

    return (
        <>
            <ReferringOrganizationReadonlyFieldset
                prefillData={{
                    ['@dateCreated']: student?.['@dateCreated'],
                    ['intake.referringOrganizationOther']: student?.intake?.referringOrganizationOther,
                    ['intake.referringPerson.team']: student?.intake?.referringPerson?.team,
                }}
            />
            <HorizontalRule />
            <ReferringPersonReadonlyFieldset
                prefillData={{
                    ['intake.referringPerson.givenName']: student?.intake?.referringPerson?.givenName,
                    ['intake.referringPerson.additionalName']: student?.intake?.referringPerson?.additionalName,
                    ['intake.referringPerson.familyName']: student?.intake?.referringPerson?.familyName,
                    ['intake.referringPerson.emails[0].email']: student?.intake?.referringPerson?.emails?.[0]?.email,
                    ['intake.referringPerson.telephones[0].telephone']:
                        student?.intake?.referringPerson?.telephones?.[0]?.telephone,
                }}
            />
            <HorizontalRule />
            <IntakeRemarksReadonlyFieldset
                prefillData={{
                    'intake.remarks': student?.intake?.remarks,
                }}
            />
        </>
    )
}
