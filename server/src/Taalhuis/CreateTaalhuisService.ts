import { Injectable } from '@nestjs/common'
import { AddressRepository } from 'src/Address/AddressRepository'
import { TaalhuisRepository } from './TaalhuisRepository'

export interface CreateTaalhuisInput {
    address?: {
        street: string
        postalCode: string
        locality: string
    }
    name: string
}

@Injectable()
export class CreateTaalhuisService {
    public constructor(private addressRepository: AddressRepository, private taalhuisRepository: TaalhuisRepository) {}

    public async createTaalhuis(input: CreateTaalhuisInput) {
        const address = input.address
            ? await this.addressRepository.createAddress(
                  input.address.street,
                  input.address.postalCode,
                  input.address.locality
              )
            : null

        //TODO: emailId, phoneNumberId
        const taalhuis = await this.taalhuisRepository.addTaalhuis({
            name: input.name,
            addressId: address ? address.id : undefined,
        })

        return taalhuis
    }
}
