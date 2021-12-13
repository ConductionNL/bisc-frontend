import { PostPutContactMomentParams } from 'api/contactMoment/contactMoment'
import { FileEventFormData } from '../Fieldsets/FileEventFormFields'

export function getMappedFileEventFormData(form: FileEventFormData, studentId: string): PostPutContactMomentParams {
    return {
        student: studentId,
        type: form.type,
        date: form.date,
        explanation: form.explanation,
    }
}
