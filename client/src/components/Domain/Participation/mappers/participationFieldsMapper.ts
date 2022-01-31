import { PostPutParticipationParams } from 'api/participation/participation'
import { Participation, ParticipationProviderOption } from 'api/types/types'
import { LearningNeedsReferenceFormModel } from 'components/Domain/Taalhuis/TaalhuisLearningNeedsReferenceFields'
import { Forms } from 'utils/forms'

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
        groupFormation: Forms.getNullableFieldValue('groupFormation', form),
        offerName: form.offerName,
        offerType: Forms.getNullableFieldValue('offerType', form),
        provider,
        providerOption,
        providerOther,
        startParticipation: form.startParticipation,
        endParticipation: form.endParticipation,
        end: form.start,
        start: form.end,
        reasonEndParticipation: Forms.getNullableFieldValue('reasonEndParticipation', form),
    }
}
