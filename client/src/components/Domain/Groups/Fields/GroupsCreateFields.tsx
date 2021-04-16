import HorizontalRule from 'components/Core/HorizontalRule/HorizontalRule'
import { GroupFieldset, GroupFieldsetFormModel } from 'components/Domain/Groups/Fieldset/GroupFieldset'
import {
    DesiredOutcomesFieldset,
    DesiredOutcomesFieldsetModel,
} from 'components/fieldsets/participants/fieldsets/DesiredOutcomesFieldset'
import DetailsInformationFieldset, {
    DetailsInformationFieldsetModel,
} from 'components/fieldsets/participants/learningNeeds/fieldsets/DetailsInformationFieldset'
import AvailabillityFieldset, { AvailabillityFieldsetModel } from 'components/fieldsets/shared/AvailabillityFieldset'
import GeneralInformationFieldset, {
    GeneralInformationFieldsetModel,
} from 'components/fieldsets/shared/GeneralInformationFieldset'
import React from 'react'

interface Props {}

export interface GroupFieldsFormModel
    extends GroupFieldsetFormModel,
        DesiredOutcomesFieldsetModel,
        DetailsInformationFieldsetModel,
        AvailabillityFieldsetModel,
        GeneralInformationFieldsetModel {}

export const GroupsCreateFields: React.FunctionComponent<Props> = props => {
    return (
        <>
            <HorizontalRule />
            <GroupFieldset />
            <DesiredOutcomesFieldset />
            <HorizontalRule />
            <DetailsInformationFieldset />
            <HorizontalRule />
            <AvailabillityFieldset />
            <HorizontalRule />
            <GeneralInformationFieldset />
        </>
    )
}
