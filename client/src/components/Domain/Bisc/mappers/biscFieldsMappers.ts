import { PostPutOrganizationEmployeeParams } from 'api/employee/employee'
import { OrganizationEmployee } from 'api/types/types'
import { BiscCoworkersInformationFieldsetModel } from 'components/fieldsets/bisc/BiscCoworkersInformationFieldset'

export function getMappedBiscCoworkerFormFields(
    formData: BiscCoworkersInformationFieldsetModel,
    biscOrganizationId: string,
    defaultBiscCoworker?: OrganizationEmployee
): PostPutOrganizationEmployeeParams {
    const telephones = [
        {
            id: defaultBiscCoworker?.person.telephones?.[0].id,
            telephone: formData['person.telephones[0].telephone'] ?? undefined,
        },
    ]

    const emails = [
        {
            id: defaultBiscCoworker?.person.emails?.[0].id,
            email: formData['person.emails[0].email'] ?? undefined,
        },
    ]

    const person: PostPutOrganizationEmployeeParams['person'] = {
        id: defaultBiscCoworker?.person.id,
        givenName: formData['person.givenName'] ?? undefined,
        additionalName: formData['person.additionalName'] ?? undefined,
        familyName: formData['person.familyName'] ?? undefined,
        telephones: telephones,
        emails: emails,
    }

    return {
        person,
        organization: biscOrganizationId,
    }
}
