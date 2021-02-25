import { Injectable } from '@nestjs/common'
import { AddressRepository } from 'src/Address/AddressRepository'
import { EmailRepository } from 'src/Email/EmailRepository'
import { TelephoneRepository } from 'src/Email/TelephoneRepository'
import { Address } from 'src/generated/cc-graphql'
import { TaalhuisRepository } from './TaalhuisRepository'
import { TaalhuisAddressType, TaalhuisType } from './types/TaalhuisType'

export interface CreateTaalhuisInput {
    address: CreateTaalhuisAddressInput
    name: string
    email: string
    phoneNumber: string
}

export interface CreateTaalhuisAddressInput {
    street?: string
    postalCode: string
    locality?: string
    houseNumber: string
}

@Injectable()
export class CreateTaalhuisService {
    public constructor(
        private emailRepository: EmailRepository,
        private addressRepository: AddressRepository,
        private telephoneRepository: TelephoneRepository,
        private taalhuisRepository: TaalhuisRepository
    ) {}

    public async createTaalhuis(input: CreateTaalhuisInput): Promise<TaalhuisType> {
        const address = await this.addressRepository.createAddress(input.address)
        const email = await this.emailRepository.createEmail(input.email)
        const telephone = await this.telephoneRepository.createTelephone(input.phoneNumber)

        const taalhuis = await this.taalhuisRepository.addTaalhuis({
            name: input.name,
            addressId: address ? address.id : undefined,
            emailId: email.id,
            phoneNumberId: telephone.id,
        })

        return {
            id: taalhuis.id,
            name: taalhuis.name,
            email: taalhuis.emails?.edges?.pop()?.node?.email || '',
            phoneNumber: taalhuis.telephones?.edges?.pop()?.node?.telephone || '',
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
