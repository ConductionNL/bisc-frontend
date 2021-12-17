import { PostPutParticipationParams } from 'api/participation/participation'
import { Participation, ParticipationProviderOption } from 'api/types/types'
import { LearningNeedsReferenceFormModel } from 'components/Domain/Taalhuis/TaalhuisLearningNeedsReferenceFields'

export function getMappedParticipationFormFields(
    form: LearningNeedsReferenceFormModel,
    learningNeed: string,
    defaultParticipation?: Participation
): PostPutParticipationParams {
    let provider, providerOption, providerOther

    if (form.provider === ParticipationProviderOption.Other) {
        providerOption = ParticipationProviderOption.Other
        providerOther = form.providerOther
    } else {
        providerOption = ParticipationProviderOption.Provider
        provider = form.provider
    }

    return {
        id: defaultParticipation?.id,
        learningNeed,
        agreement: form.agreement,
        degree: form.degree === 'true',
        explanation: form.explanation,
        formality: form.formality,
        groupFormation: form.groupFormation,
        offerName: form.offerName,
        offerType: form.offerType,
        provider,
        providerOption,
        providerOther,
        startParticipation: form.startParticipation,
        endParticipation: form.endParticipation,
        end: form.start,
        start: form.end,
        reasonEndParticipation: form.reasonEndParticipation,
    }
}