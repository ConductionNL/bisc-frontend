import HorizontalRule from 'components/Core/HorizontalRule/HorizontalRule'
import { GroupFieldset, GroupFieldsetFormModel } from 'components/Domain/Groups/Fieldset/GroupFieldset'
import LearningOutcomeOfferFieldset, {
    LearningOutcomeOfferFieldsetModel,
} from 'components/fieldsets/participants/fieldsets/LearningOutcomeOfferFieldset'
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
        LearningOutcomeOfferFieldsetModel,
        DetailsInformationFieldsetModel,
        AvailabillityFieldsetModel,
        GeneralGroupInformationFieldsetFormModel {}

export const GroupsCreateFields: React.FunctionComponent<Props> = props => {
    return (
        <>
            <GroupFieldset />
            <HorizontalRule />
            <LearningOutcomeOfferFieldset />
            <HorizontalRule />
            <DetailsInformationFieldset
                fieldControls={{
                    detailsGroupFormation: {
                        hidden: true,
                    },
                    detailsEngagements: {
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
