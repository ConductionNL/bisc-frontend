import { PostPutContactMomentParams } from 'api/contactMoment/contactMoment'
import { FileEventFormData } from '../Fieldsets/FileEventFormFields'

export function getMappedFileEventFormData(form: FileEventFormData, studentId: string): PostPutContactMomentParams {
    return {
        employee: 'af3fbd3f-fbed-43e4-a220-8bce63a7bd9a', // TODO: remove when api is fixed
        student: studentId,
        type: form.type,
        date: form.date,
        explanation: form.explanation,
    }
}
