import { MutationError, User } from 'api/types/types'
import PasswordFieldset, { PasswordFieldsetModel } from 'components/fieldsets/participants/fieldsets/PasswordFieldset'

interface Props {
    user?: User
    readOnly?: boolean
    mutationError?: MutationError | string
}

export interface OwnProfileFieldsFormModel extends PasswordFieldsetModel {}

export const OwnProfileFields: React.FunctionComponent<Props> = props => {
    const { readOnly } = props

    return (
        <>
            <PasswordFieldset readOnly={readOnly} prefillData={{}} />
        </>
    )
}
