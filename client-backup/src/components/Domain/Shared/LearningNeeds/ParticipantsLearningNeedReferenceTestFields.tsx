export {}
// import HorizontalRule from 'components/Core/HorizontalRule/HorizontalRule'
// import Column from 'components/Core/Layout/Column/Column'
// import LearningOutcomeOfferFieldset from 'components/fieldsets/participants/fieldsets/LearningOutcomeOfferFieldset'
// import TestInformationFieldset from 'components/fieldsets/participants/learningNeeds/fieldsets/TestInformationFieldset'
// import { CreateParticipationInputType, TestResultType } from 'generated/graphql'
// import React from 'react'

// interface Props {
//     defaultValues?: TestResultType
//     readOnly?: boolean
// }
// export interface LearningNeedsReferenceDetails {
//     participation: CreateParticipationInputType
//     tests: TestResultType
// }

// export const ParticipantsLearningNeedReferenceTestFields: React.FC<Props> = ({ defaultValues, readOnly }) => {
//     return (
//         <Column>
//             <LearningOutcomeOfferFieldset
//                 readOnly={readOnly}
//                 defaultValues={{
//                     outComesGoal: defaultValues?.outComesGoal ?? undefined,
//                     outComesTopic: defaultValues?.outComesTopic ?? undefined,
//                     outComesTopicOther: defaultValues?.outComesTopicOther ?? undefined,
//                     outComesApplication: defaultValues?.outComesApplication ?? undefined,
//                     outComesApplicationOther: defaultValues?.outComesApplicationOther ?? undefined,
//                     outComesLevel: defaultValues?.outComesLevel ?? undefined,
//                     outComesLevelOther: defaultValues?.outComesLevelOther ?? undefined,
//                 }}
//                 fieldControls={{
//                     outComesGoal: {
//                         required: true,
//                     },
//                     outComesTopic: {
//                         required: true,
//                     },
//                     outComesApplication: {
//                         required: true,
//                     },
//                     outComesLevel: {
//                         required: true,
//                     },
//                 }}
//             />
//             <HorizontalRule />
//             <TestInformationFieldset readOnly={readOnly} defaultValues={defaultValues} />
//         </Column>
//     )
// }
