import HorizontalRule from 'components/Core/HorizontalRule/HorizontalRule'
import RegistratorInformationFieldset, {
    RegistratorInformationFieldsetModel,
} from 'components/fieldsets/participants/fieldsets/RegistratorInformationFieldset'
import ExplanationInformationFieldset, {
    ExplanationInformationFieldsetModel,
} from 'components/fieldsets/shared/ExplanationInformationFieldset'
import { StudentQuery } from 'generated/graphql'
import React from 'react'
import { NameFormatters } from 'utils/formatters/name/Name'

interface Props {
    prefillData?: StudentQuery
    readOnly: boolean
}

export interface ParticipationRegistrationFieldsFormModel
    extends RegistratorInformationFieldsetModel,
        ExplanationInformationFieldsetModel {}

export const ParticipationRegistrationFields: React.FunctionComponent<Props> = props => {
    const { prefillData, readOnly } = props
    return (
        <>
            <RegistratorInformationFieldset
                prefillData={{
                    date: prefillData?.student.dateCreated,
                    registeringParty: prefillData?.student.registrar?.organisationName,
                    registratorName: NameFormatters.formattedFullname({
                        givenName: prefillData?.student.registrar?.givenName,
                        additionalName: prefillData?.student.registrar?.additionalName,
                        familyName: prefillData?.student.registrar?.familyName,
                    }),
                    registratorEmail: prefillData?.student.registrar?.email,
                    registratorPhone: prefillData?.student.registrar?.telephone,
                }}
                readOnly={readOnly}
            />
            <HorizontalRule />
            <ExplanationInformationFieldset
                prefillData={{
                    note: prefillData?.student.memo,
                }}
                readOnly={readOnly}
            />
        </>
    )
}
