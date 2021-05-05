export {}
// import HorizontalRule from 'components/Core/HorizontalRule/HorizontalRule'
// import Column from 'components/Core/Layout/Column/Column'
// import {
//     LearningQuestionsFieldset,
//     LearningQuestionsFieldsetModel,
// } from 'components/fieldsets/participants/fieldsets/LearningQuestionsFieldset'
// import LearningOutcomeOfferFieldset, {
//     LearningOutcomeOfferFieldsetModel,
// } from 'components/fieldsets/participants/fieldsets/LearningOutcomeOfferFieldset'
// import React from 'react'
// import OfferInformationFieldset, {
//     OfferInformationFieldsetModel,
// } from 'components/fieldsets/participants/fieldsets/OfferInformationFieldset'
// import { LearningNeedQuery } from 'generated/graphql'
// import { useLingui } from '@lingui/react'
// import { t } from '@lingui/macro'

// export interface TaalhuisParticipantLearningNeedFieldsFormModel
//     extends OfferInformationFieldsetModel,
//         LearningOutcomeOfferFieldsetModel,
//         LearningQuestionsFieldsetModel {}

// interface Props {
//     learningNeed?: LearningNeedQuery
//     readOnly?: boolean
// }

// export const TaalhuisParticipantLearningNeedFields: React.FC<Props> = ({ learningNeed, readOnly }) => {
//     const { i18n } = useLingui()

//     return (
//         <Column>
//             <LearningQuestionsFieldset readOnly={readOnly} defaultValues={learningNeed?.learningNeed} />
//             <HorizontalRule />

//             <LearningOutcomeOfferFieldset
//                 readOnly={readOnly}
//                 fieldNaming={{
//                     title: i18n._(t`Gewenste leeruitkomst`),
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
//                 defaultValues={{
//                     outComesGoal: learningNeed?.learningNeed.desiredOutComesGoal,
//                     outComesTopic: learningNeed?.learningNeed.desiredOutComesTopic,
//                     outComesTopicOther: learningNeed?.learningNeed.desiredOutComesTopicOther ?? undefined,
//                     outComesApplication: learningNeed?.learningNeed.desiredOutComesApplication,
//                     outComesApplicationOther: learningNeed?.learningNeed.desiredOutComesApplicationOther ?? undefined,
//                     outComesLevel: learningNeed?.learningNeed.desiredOutComesLevel,
//                     outComesLevelOther: learningNeed?.learningNeed.desiredOutComesLevelOther ?? undefined,
//                 }}
//             />
//             <HorizontalRule />
//             {!readOnly && (
//                 <OfferInformationFieldset
//                     defaultValues={{
//                         offerDesiredOffer: learningNeed?.learningNeed.offerDesiredOffer ?? undefined,
//                         offerAdvisedOffer: learningNeed?.learningNeed.offerAdvisedOffer ?? undefined,
//                         offerDifference: learningNeed?.learningNeed.offerDifference ?? undefined,
//                         offerDifferenceOther: learningNeed?.learningNeed.offerDifferenceOther ?? undefined,
//                         offerEngagements: learningNeed?.learningNeed.offerDifferenceOther ?? undefined,
//                     }}
//                 />
//             )}
//         </Column>
//     )
// }
