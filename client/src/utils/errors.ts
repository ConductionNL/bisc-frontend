import { GraphQLError } from 'graphql'

export interface InputValidationError {
    children: InputValidationError[]
    constraints: Record<string, string>
    property: string
    value: string
}

export interface FormattedInputValidationError {
    field: string
    errors: [string, string][]
}

export function hasInputValidationError(errors: readonly GraphQLError[] | undefined) {
    return errors?.some(
        error =>
            error.extensions?.exception?.status === 400 &&
            error.extensions?.exception?.response?.errorCode === 'INPUT_VALIDATION'
    )
}

export function getInputValidationErrors(errors: readonly GraphQLError[] | undefined): FormattedInputValidationError[] {
    return (
        errors?.flatMap(error => {
            const validationErrors: InputValidationError[] = error.extensions?.exception?.response?.validationErrors

            return validationErrors?.map(validationError => {
                return {
                    field: validationError.property,
                    errors: Object.entries(validationError.constraints),
                }
            })
        }) ?? []
    )
}

export function getErrorForField(field: string, errors: FormattedInputValidationError[]) {
    const errorsForField = errors.find(error => error.field === field)

    return errorsForField?.errors[0][1] ?? undefined
}
