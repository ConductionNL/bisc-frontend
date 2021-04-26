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
import { GroupType } from 'generated/graphql'
import React from 'react'
import {
    GeneralGroupInformationFieldset,
    GeneralGroupInformationFieldsetFormModel,
} from '../Fieldset/GeneralGroupInformationFieldset'
import { GroupMentorDetailModalGroup } from '../Modals/GroupMentorDetailModalSectionView'

interface Props {
    prefillData?: GroupType
    readOnly?: boolean
    group?: GroupMentorDetailModalGroup
}

export interface GroupFieldsFormModel
    extends GroupFieldsetFormModel,
        DesiredOutcomesFieldsetModel,
        DetailsInformationFieldsetModel,
        AvailabillityFieldsetModel,
        GeneralGroupInformationFieldsetFormModel {}

export const GroupsCreateFields: React.FunctionComponent<Props> = props => {
    const { prefillData, readOnly, group } = props

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
            <DesiredOutcomesFieldset
                readOnly={readOnly}
                defaultValues={
                    prefillData && {
                        goal: prefillData.outComesGoal,
                        topic: prefillData.outComesTopic,
                        topicOther: prefillData.outComesTopicOther ?? undefined,
                        application: prefillData.outComesApplication ?? undefined,
                        applicationOther: prefillData.outComesApplicationOther ?? undefined,
                        level: prefillData.outComesLevel,
                        levelOther: prefillData.outComesLevelOther ?? undefined,
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
                group={group}
            />
        </>
    )
}
