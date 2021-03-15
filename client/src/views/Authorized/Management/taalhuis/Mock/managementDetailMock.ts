import { BranchInformationFieldsetModel } from '../../../../../components/fieldsets/shared/BranchInformationFieldset'
import { ContactPersonInformationFieldsetModel } from '../../../../../components/fieldsets/shared/ContactPersonInformationFieldset'

export interface ManagementDetailDataMock
    extends BranchInformationFieldsetModel,
        ContactPersonInformationFieldsetModel {}

export const managementDetailDataMockResponse: ManagementDetailDataMock = {
    nameTaalhuis: `Lifely Talen`,
    street: 'Prinsengracht',
    streetNo: '12',
    streetNoAddition: 'C',
    postcode: '1234 AB',
    postalCode: '1234 AB',
    city: 'Amsterdam',
    phoneNumberContactPerson: '06 123 123 32',
    contact: 'taalhuis@lifely.nl',
}
