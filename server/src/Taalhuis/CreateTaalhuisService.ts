import { Injectable } from '@nestjs/common'
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
        await this.createGroupForSourceTaalhuis(sourceTaalhuis)
        // edu/program
        await this.createProgramForSourceTaalhuis(sourceTaalhuis)

        // cc/organization
        const taalhuis = await this.taalhuisRepository.addTaalhuis({
            name: input.name,
            adresses: address ? [address.id] : undefined,
            emails: [email.id],
            telephones: [telephone.id],
            sourceOrganization: sourceTaalhuis.id,
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

    private async createGroupForSourceTaalhuis(sourceTaalhuis: Organization) {
        const createdGroup = await this.groupRepository.createGroup({
            organization: sourceTaalhuis.id,
            name: `${sourceTaalhuis.name} groep`,
            description: `Groep voor organisatie ${sourceTaalhuis.name}`,
        })

        return createdGroup
    }

    private async createProgramForSourceTaalhuis(sourceTaalhuis: Organization) {
        const createdProgram = await this.programRepository.createProgram(
            `${sourceTaalhuis.name} program`,
            sourceTaalhuis.id
        )

        return createdProgram
    }
}
