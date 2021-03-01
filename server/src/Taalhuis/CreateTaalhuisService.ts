import { Injectable, Logger } from '@nestjs/common'
import { AddressRepository, CreateTaalhuisAddressInput } from 'src/CommonGroundAPI/cc/AddressRepository'
import { EmailRepository } from 'src/CommonGroundAPI/cc/EmailRepository'
import { TelephoneRepository } from 'src/CommonGroundAPI/cc/TelephoneRepository'
import { Address } from 'src/generated/cc-graphql'
import { Organization } from 'src/generated/wrc-graphql'
import { ProgramRepository } from 'src/Program/ProgramRepository'
import { GroupRepository } from './GroupRepository'
import { SourceTaalhuisRepository } from './SourceTaalhuisRepository'
import { TaalhuisRepository } from './TaalhuisRepository'
import { TaalhuisAddressType, TaalhuisType } from './types/TaalhuisType'

export interface CreateTaalhuisInput {
    address: CreateTaalhuisAddressInput
    name: string
    email: string
    phoneNumber: string
}
@Injectable()
export class CreateTaalhuisService {
    private readonly logger = new Logger(this.constructor.name)

    public constructor(
        private emailRepository: EmailRepository,
        private telephoneRepository: TelephoneRepository,
        private taalhuisRepository: TaalhuisRepository,
        private addressRepository: AddressRepository,
        private sourceTaalhuisRepository: SourceTaalhuisRepository,
        private groupRepository: GroupRepository,
        private programRepository: ProgramRepository
    ) {}

    public async createTaalhuis(input: CreateTaalhuisInput): Promise<TaalhuisType> {
        // cc/address
        const address = await this.addressRepository.createAddress(input.address)
        // cc/email
        const email = await this.emailRepository.createEmail(input.email)
        // cc/telephone
        const telephone = await this.telephoneRepository.createTelephone(input.phoneNumber)

        // wrc/organization
        const sourceTaalhuis = await this.sourceTaalhuisRepository.createSourceTaalhuis(input.name)
        // uc/group
        await this.createGroupsForSourceTaalhuis(sourceTaalhuis)
        // edu/program
        await this.createProgramForSourceTaalhuis(sourceTaalhuis)

        // cc/organization
        const taalhuis = await this.taalhuisRepository.addTaalhuis({
            name: input.name,
            adresses: address ? [address.id] : undefined,
            emails: [email.id],
            telephones: [telephone.id],
            sourceOrganization: this.makeURLfromID(sourceTaalhuis.id),
        })

        // update wrc/organization to include the cc/organization
        await this.sourceTaalhuisRepository.updateSourceTaalhuis(sourceTaalhuis.id, {
            ccOrganisationId: this.makeURLfromID(taalhuis.id),
        })

        return {
            id: taalhuis.id,
            name: taalhuis.name,
            email: taalhuis.emails?.edges?.pop()?.node?.email || '',
            telephone: taalhuis.telephones?.edges?.pop()?.node?.telephone || '',
            address: this.parseAddressObject(taalhuis.adresses?.edges?.pop()?.node),
        }
    }

    private parseAddressObject(input?: Address | null): TaalhuisAddressType {
        return {
            houseNumber: input?.houseNumber || '',
            locality: input?.locality || '',
            postalCode: input?.postalCode || '',
            street: input?.street || '',
            houseNumberSuffix: input?.houseNumberSuffix || '',
        }
    }

    private async createGroupsForSourceTaalhuis(sourceTaalhuis: Organization) {
        // TODO: Check for existing UserGroups for this wrc/organization and only create new if they dont exist

        const coordinatorUserGroup = await this.groupRepository.createGroup({
            organization: this.makeURLfromID(sourceTaalhuis.id),
            name: `Coördinator`,
            description: `Coördinator rol voor organisatie ${sourceTaalhuis.name}`,
        })

        const employeeUserGroup = await this.groupRepository.createGroup({
            organization: this.makeURLfromID(sourceTaalhuis.id),
            name: `Medewerker`,
            description: `Medewerker rol voor organisatie ${sourceTaalhuis.name}`,
        })

        // TODO: Error handling

        this.logger.debug(
            `Created uc/group objects for sourceTaalhuis: ${coordinatorUserGroup?.id} and ${employeeUserGroup?.id}`
        )
    }

    private async createProgramForSourceTaalhuis(sourceTaalhuis: Organization) {
        const createdProgram = await this.programRepository.createProgram(
            `${sourceTaalhuis.name} program`,
            this.makeURLfromID(sourceTaalhuis.id)
        )

        return createdProgram
    }

    private makeURLfromID(id: string) {
        return `https://taalhuizen-bisc.commonground.nu${id[0] === '/' ? '' : '/'}${id}`
    }
}
