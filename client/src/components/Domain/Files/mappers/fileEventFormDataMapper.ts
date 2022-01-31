import { PostPutContactMomentParams } from 'api/contactMoment/contactMoment'
import { Forms } from 'utils/forms'
import { FileEventFormData } from '../Fieldsets/FileEventFormFields'

export function getMappedFileEventFormData(form: FileEventFormData, studentId: string): PostPutContactMomentParams {
    return {
        student: studentId,
        type: Forms.getNullableFieldValue('type', form),
        date: form.date,
        explanation: form.explanation,
    }
}
