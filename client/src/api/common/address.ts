import { Maybe } from 'api/types/types'

export interface PostPutAddressParams {
    id?: string
    street?: Maybe<string>
    houseNumber?: Maybe<string>
    houseNumberSuffix?: Maybe<string>
    postalCode?: Maybe<string>
    locality?: Maybe<string>
    country?: Maybe<string>
}
