import Column from 'components/Core/Layout/Column/Column'
import React from 'react'
import { AanbiederParticipantDetail } from 'views/Authorized/Supplier/AanbiederView/mocks'

interface Props {
    participant: AanbiederParticipantDetail
}

export const AanbiederParticipantIntakeFields: React.FunctionComponent<Props> = props => {
    return (
        <Column>
            {renderCustomerFields()}
            {renderCivicIntegrationFields()}
            {renderPersonalInfoFields()}
            {renderContactInfoFields()}
            {renderGeneralInfoFields()}
            {renderReferrerFields()}
            {renderBackgroundFields()}
            {renderProficiencyFields()}
            {renderLevelFields()}
            {renderEducationFields()}
            {renderClassFields()}
            {renderMotivationFields()}
            {renderReadingTestResultField()}
            {renderWritingTestResultField()}
            {renderPermissionFields()}
        </Column>
    )

    // TODO
    function renderCustomerFields() {
        return
    }

    // TODO
    function renderCivicIntegrationFields() {
        return
    }

    // TODO
    function renderPersonalInfoFields() {
        return
    }

    // TODO
    function renderContactInfoFields() {
        return
    }

    // TODO
    function renderGeneralInfoFields() {
        return
    }

    // TODO
    function renderReferrerFields() {
        return
    }

    // TODO
    function renderBackgroundFields() {
        return
    }

    // TODO
    function renderProficiencyFields() {
        return
    }

    // TODO
    function renderLevelFields() {
        return
    }

    // TODO
    function renderEducationFields() {
        return
    }

    // TODO
    function renderClassFields() {
        return
    }

    // TODO
    function renderMotivationFields() {
        return
    }

    // TODO
    function renderReadingTestResultField() {
        return
    }

    // TODO
    function renderWritingTestResultField() {
        return
    }

    // TODO
    function renderPermissionFields() {
        return
    }
}
