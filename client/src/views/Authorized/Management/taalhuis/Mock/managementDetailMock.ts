import { BranchInformationFieldsetModel } from '../../../../../components/fieldsets/shared/BranchInformationFieldset'
import { ContactInformationFieldsetModel } from '../../../../../components/fieldsets/shared/ContactInformationFieldset'

export interface ManagementDetailDataMock extends BranchInformationFieldsetModel, ContactInformationFieldsetModel {}

export const managementDetailDataMockResponse: ManagementDetailDataMock = {
    nameTaalhuis: `Lifely Talen`,
    street: 'Prinsengracht',
    streetNo: 12,
    streetNoAddition: 'C',
    postcode: '1234 AB',
    city: 'Amsterdam',
    phonenumber: '06 123 123 32',
    email: 'taalhuis@lifely.nl',
}