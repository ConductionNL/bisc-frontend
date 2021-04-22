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
import { GroupType } from 'temp/TEMPORARYgraphql'
import {
    GeneralGroupInformationFieldsetFormModel,
    GeneralInformationFieldset,
} from '../Fieldset/GeneralGroupInformationFieldset'

interface Props {
    prefillData?: GroupType
    readOnly?: boolean
}

export interface GroupFieldsFormModel
    extends GroupFieldsetFormModel,
        DesiredOutcomesFieldsetModel,
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
                        groupFormation: {
                            hidden: true,
                        },
                        engagements: {
                            hidden: true,
                        },
                    }
                }
                defaultValues={{
                    formality: prefillData?.detailsIsFormal,
                    groupFormation: undefined,
                    teachingHours: prefillData?.detailsTotalClassHours,
                    certificate: prefillData?.detailsCertificateWillBeAwarded,
                    startDate: prefillData?.detailsStartDate ?? undefined,
                    endDate: prefillData?.detailsEndDate ?? undefined,
                    engagements: undefined,
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
            <GeneralInformationFieldset
                readOnly={readOnly}
                prefillData={{
                    location: prefillData?.generalLocation,
                    participantsMin: prefillData?.generalParticipantsMin ?? undefined,
                    participantsMax: prefillData?.generalParticipantsMax ?? undefined,
                    evaluation: prefillData?.generalEvaluation ?? undefined,
                    mentors: prefillData?.aanbiederEmployees ?? undefined,
                }}
            />
        </>
    )
}
