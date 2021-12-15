import { Maybe } from 'api/types/types'

export interface PostPutTelephoneParams {
    id?: string
    name?: Maybe<string>
    telephone?: Maybe<string>
}
