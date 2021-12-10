import { PostPutContactMomentParams } from 'api/contactMoment/contactMoment'
import { FileEventFormData } from '../Fieldsets/FileEventFormFields'

export function getMappedFileEventFormData(form: FileEventFormData, studentId: string): PostPutContactMomentParams {
    return {
        employee: '4dc8e034-ec61-4dd5-a720-41bdf640d328', // TODO: remove when api is fixed
        student: studentId,
        type: form.type,
        date: form.date,
        explanation: form.explanation,
    }
}
