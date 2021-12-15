import { Maybe } from 'api/types/types'

export interface PostPutEmailParams {
    id?: string
    name?: Maybe<string>
    email?: Maybe<string>
}
