import { Injectable } from '@nestjs/common'
import { AddressRepository, CreateTaalhuisAddressInput } from 'src/CommonGroundAPI/cc/AddressRepository'
import { EmailRepository } from 'src/CommonGroundAPI/cc/EmailRepository'
import { TelephoneRepository } from 'src/CommonGroundAPI/cc/TelephoneRepository'
import { Address } from 'src/generated/cc-graphql'
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
        private addressRepository: AddressRepository
    ) {}

    public async createTaalhuis(input: CreateTaalhuisInput): Promise<TaalhuisType> {
        const address = await this.addressRepository.createAddress(input.address)
        const email = await this.emailRepository.createEmail(input.email)
        const telephone = await this.telephoneRepository.createTelephone(input.phoneNumber)

        const taalhuis = await this.taalhuisRepository.addTaalhuis({
            name: input.name,
            adresses: address ? [address.id] : undefined,
            emails: [email.id],
            telephones: [telephone.id],
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
}
