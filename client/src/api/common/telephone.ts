import { Maybe } from 'api/types/types'

export interface PostPutTelephoneParams {
    id?: string
    name?: Maybe<string>
    telephone?: Maybe<string>
}

/**
 * This name is used to distinguish different telephones on the student form
 */
export const studentContactPersonTelephoneName = 'Contactpersoon'
