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
import { GroupType } from 'generated/graphql'
import {
    GeneralGroupInformationFieldset,
    GeneralGroupInformationFieldsetFormModel,
} from '../Fieldset/GeneralGroupInformationFieldset'

interface Props {
    prefillData?: GroupType
    readOnly?: boolean
}

export interface GroupFieldsFormModel
    extends GroupFieldsetFormModel,
        LearningOutcomeOfferFieldsetModel,
        DetailsInformationFieldsetModel,
        AvailabillityFieldsetModel,
        GeneralGroupInformationFieldsetFormModel {}

export const GroupsCreateFields: React.FunctionComponent<Props> = props => {
    const { prefillData, readOnly } = props

    return (
        <>
            <GroupFieldset
                readOnly={readOnly}
                prefillData={
                    prefillData && {
                        groupName: prefillData.name,
                        groupCourseType: prefillData.typeCourse,
                    }
                }
            />
            <HorizontalRule />
            <LearningOutcomeOfferFieldset
                readOnly={readOnly}
                defaultValues={
                    prefillData && {
                        outComesGoal: prefillData.outComesGoal,
                        outComesTopic: prefillData.outComesTopic,
                        outComesTopicOther: prefillData.outComesTopicOther ?? undefined,
                        outComesApplication: prefillData.outComesApplication ?? undefined,
                        outComesApplicationOther: prefillData.outComesApplicationOther ?? undefined,
                        outComesLevel: prefillData.outComesLevel,
                        outComesLevelOther: prefillData.outComesLevelOther ?? undefined,
                    }
                }
            />
            <HorizontalRule />
            <DetailsInformationFieldset
                readOnly={readOnly}
                fieldControls={
                    prefillData && {
                        detailsGroupFormation: {
                            hidden: true,
                        },
                        detailsEngagements: {
                            hidden: true,
                        },
                    }
                }
                defaultValues={{
                    detailsIsFormal: prefillData?.detailsIsFormal,
                    detailsGroupFormation: undefined,
                    detailsTotalClassHours: prefillData?.detailsTotalClassHours,
                    detailsCertificateWillBeAwarded: prefillData?.detailsCertificateWillBeAwarded,
                    detailsStartDate: prefillData?.detailsStartDate ?? undefined,
                    detailsEndDate: prefillData?.detailsEndDate ?? undefined,
                    detailsEngagements: undefined,
                }}
            />
            <HorizontalRule />
            <AvailabillityFieldset
                readOnly={readOnly}
                prefillData={{
                    available: prefillData?.availability ?? undefined,
                    note: prefillData?.availabilityNotes ?? undefined,
                }}
            />
            <HorizontalRule />
            <GeneralGroupInformationFieldset
                readOnly={readOnly}
                prefillData={{
                    location: prefillData?.generalLocation,
                    participantsMin: prefillData?.generalParticipantsMin ?? undefined,
                    participantsMax: prefillData?.generalParticipantsMax ?? undefined,
                    evaluation: prefillData?.generalEvaluation ?? undefined,
                    mentors: prefillData?.providerEmployees ?? undefined,
                }}
            />
        </>
    )
}
