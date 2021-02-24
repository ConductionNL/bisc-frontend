import { Injectable } from '@nestjs/common'
import { AddressRepository } from 'src/Address/AddressRepository'

export interface CreateTaalhuisInput {
    address: {
        street: string
        postalCode: string
        locality: string
    }
    name: string
}

@Injectable()
export class CreateTaalhuisService {
    public constructor(private addressRepository: AddressRepository) {}

    public async createTaalhuis(input: CreateTaalhuisInput) {
        const address = await this.addressRepository.createAddress(
            input.address.street,
            input.address.postalCode,
            input.address.locality
        )

        if (!address) {
            throw new Error()
        }

        return address
    }
}
