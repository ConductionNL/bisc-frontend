import { Availability, ContactPreference, Gender, MaritalStatus, Maybe } from 'api/types/types'
import { PostPutAddressParams } from './address'
import { PostPutEmailParams } from './email'
import { PostPutTelephoneParams } from './telephone'

export interface PostPutPersonParams {
    id?: string
    givenName?: Maybe<string>
    additionalName?: Maybe<string>
    familyName?: Maybe<string>
    birthday?: Maybe<string>
    gender?: Maybe<Gender>
    addresses?: PostPutAddressParams[]
    emails?: PostPutEmailParams[]
    telephones?: PostPutTelephoneParams[]
    contactPreference?: Maybe<ContactPreference>
    contactPreferenceOther?: Maybe<string>
    birthplace?: Maybe<string>
    primaryLanguage?: Maybe<string>
    speakingLanguages?: Maybe<string>
    maritalStatus?: Maybe<MaritalStatus>
    children?: Maybe<number>
    availability?: Maybe<Availability[]>
    availabilityNotes?: Maybe<string>
}
