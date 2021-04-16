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

import React from 'react'
import {
    GeneralGroupInformationFieldsetFormModel,
    GeneralInformationFieldset,
} from '../Fieldset/GeneralGroupInformationFieldset'

interface Props {}

export interface GroupFieldsFormModel
    extends GroupFieldsetFormModel,
        DesiredOutcomesFieldsetModel,
        DetailsInformationFieldsetModel,
        AvailabillityFieldsetModel,
        GeneralGroupInformationFieldsetFormModel {}

export const GroupsCreateFields: React.FunctionComponent<Props> = props => {
    return (
        <>
            <GroupFieldset />
            <HorizontalRule />
            <DesiredOutcomesFieldset />
            <HorizontalRule />
            <DetailsInformationFieldset
                fieldControls={{
                    groupFormation: {
                        hidden: true,
                    },
                    engagements: {
                        hidden: true,
                    },
                }}
            />
            <HorizontalRule />
            <AvailabillityFieldset />
            <HorizontalRule />
            <GeneralInformationFieldset />
        </>
    )
}
