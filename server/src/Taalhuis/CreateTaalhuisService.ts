import { Injectable } from '@nestjs/common'
import { AddressRepository } from 'src/Address/AddressRepository'
import { EmailRepository } from 'src/Email/EmailRepository'
import { TaalhuisRepository } from './TaalhuisRepository'
import { TaalhuisType } from './types/TaalhuisType'

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
        private taalhuisRepository: TaalhuisRepository
    ) {}

    public async createTaalhuis(input: CreateTaalhuisInput): Promise<TaalhuisType> {
        const address = await this.addressRepository.createAddress(input.address)
        const email = await this.emailRepository.createEmail(input.email)
        //TODO:  phoneNumberId
        const taalhuis = await this.taalhuisRepository.addTaalhuis({
            name: input.name,
            addressId: address ? address.id : undefined,
            emailId: email.id,
        })

        return {
            id: taalhuis.id,
            name: taalhuis.name,
            email: taalhuis.,
            phoneNumber: '',
            address: {
                houseNumber: '',
                locality: '',
                postalCode: '',
                street: '',
                houseNumberSuffix: '',
            },
        }
    }
}
