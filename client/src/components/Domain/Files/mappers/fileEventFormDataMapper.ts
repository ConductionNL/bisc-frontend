import { PostPutContactMomentParams } from 'api/contactMoment/contactMoment'

export type FileEventFormFields = Pick<PostPutContactMomentParams, 'type' | 'date' | 'explanation'>

export function getMappedFileEventFormData(form: FileEventFormFields, studentId: string): PostPutContactMomentParams {
    return {
        employee: 'af3fbd3f-fbed-43e4-a220-8bce63a7bd9a', // TODO: remove when api is fixed
        student: studentId,
        type: form.type,
        date: form.date,
        explanation: form.explanation,
    }
}
