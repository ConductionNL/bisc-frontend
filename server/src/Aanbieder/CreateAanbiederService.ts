import { Injectable, Logger } from '@nestjs/common'
import { assertNotNil } from 'src/AssertNotNil'
import { AddressRepository, CreateOrganizationAddressInput } from 'src/CommonGroundAPI/cc/AddressRepository'
import { EmailRepository } from 'src/CommonGroundAPI/cc/EmailRepository'
import { OrganizationRepository, OrganizationTypesEnum } from 'src/CommonGroundAPI/cc/OrganizationRepository'
import { TelephoneRepository } from 'src/CommonGroundAPI/cc/TelephoneRepository'
import { ProgramRepository } from 'src/CommonGroundAPI/edu/ProgramRepository'
import { GroupRepository } from 'src/CommonGroundAPI/uc/GroupRepository'
import { SourceOrganizationRepository } from 'src/CommonGroundAPI/wrc/SourceOrganizationRepository'
import { Address } from 'src/generated/cc-graphql'
import { Organization } from 'src/generated/wrc-graphql'
import { AanbiederAddressType } from './types/AanbiederType'

export interface CreateAanbiederInput {
    address: CreateOrganizationAddressInput
    name: string
    email: string
    phoneNumber: string
}

@Injectable()
export class CreateAanbiederService {
    private readonly logger = new Logger(this.constructor.name)

    public constructor(
        private emailRepository: EmailRepository,
        private telephoneRepository: TelephoneRepository,
        private organizationRepository: OrganizationRepository,
        private addressRepository: AddressRepository,
        private sourceOrganizationRepository: SourceOrganizationRepository,
        private groupRepository: GroupRepository,
        private programRepository: ProgramRepository
    ) {}

    public async createAanbieder(input: CreateAanbiederInput) {
        // cc/address
        const address = await this.addressRepository.createAddress(input.address)
        // cc/email
        const email = await this.emailRepository.createEmail(input.email)
        // cc/telephone
        const telephone = await this.telephoneRepository.createTelephone(input.phoneNumber)

        // wrc/organization
        const sourceAanbieder = await this.sourceOrganizationRepository.createSourceOrganization(input.name)
        // uc/group
        await this.createGroupsForSourceAanbieder(sourceAanbieder)
        // edu/program
        await this.createProgramForSourceAanbieder(sourceAanbieder)

        // cc/organization
        const aanbieder = await this.organizationRepository.createOrganization({
            name: input.name,
            type: OrganizationTypesEnum.AANBIEDER,
            addressIds: address ? [address.id] : undefined,
            emailIds: [email.id],
            telephoneIds: [telephone.id],
            sourceOrganizationId: sourceAanbieder.id,
        })

        // update wrc/organization to include the cc/organization
        await this.sourceOrganizationRepository.updateSourceOrganization(sourceAanbieder.id, {
            ccOrganizationId: aanbieder.id,
        })

        const emailString = aanbieder.emails?.edges?.pop()?.node?.email
        assertNotNil(emailString, `Email not found for aanbieder ${aanbieder.id}`)

        const telephoneString = aanbieder.telephones?.edges?.pop()?.node?.telephone
        assertNotNil(telephoneString, `Telephone not found for aanbieder ${aanbieder.id}`)

        const addressObject = aanbieder.addresses?.edges?.pop()?.node
        assertNotNil(addressObject, `Address not found for aanbieder ${aanbieder.id}`)

        return {
            id: aanbieder.id,
            name: aanbieder.name,
            email: emailString,
            telephone: telephoneString,
            address: this.parseAddressObject(addressObject),
        }
    }

    private parseAddressObject(input: Address): AanbiederAddressType {
        return {
            houseNumber: input?.houseNumber ?? '',
            locality: input?.locality ?? '',
            postalCode: input?.postalCode ?? '',
            street: input?.street ?? '',
            houseNumberSuffix: input?.houseNumberSuffix ?? '',
        }
    }

    private async createGroupsForSourceAanbieder(sourceAanbieder: Organization) {
        // TODO: Check for existing UserGroups for this wrc/organization and only create new if they dont exist

        const coordinatorUserGroup = await this.groupRepository.createGroup({
            organization: sourceAanbieder.id,
            name: `Coördinator`,
            description: `Coördinator rol voor organisatie ${sourceAanbieder.name}`,
        })

        const employeeUserGroup = await this.groupRepository.createGroup({
            organization: sourceAanbieder.id,
            name: `Medewerker`,
            description: `Medewerker rol voor organisatie ${sourceAanbieder.name}`,
        })

        // TODO: Error handling

        this.logger.debug(
            `Created uc/group objects for sourceAanbieder: ${coordinatorUserGroup?.id} and ${employeeUserGroup?.id}`
        )
    }

    private async createProgramForSourceAanbieder(sourceAanbieder: Organization) {
        const createdProgram = await this.programRepository.createProgram(
            `${sourceAanbieder.name} program`,
            sourceAanbieder.id
        )

        return createdProgram
    }
}
