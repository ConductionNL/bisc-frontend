import { Injectable } from '@nestjs/common'
import { AddressRepository } from 'src/Address/AddressRepository'

interface CreateTaalhuisInput {
    street: string
    postalCode: string
    locality: string
}

@Injectable()
export class CreateTaalhuisService {
    public constructor(private addressRepository: AddressRepository) {}

    public async createTaalhuis(input: CreateTaalhuisInput) {
        const address = await this.addressRepository.createAddress(input.street, input.postalCode, input.locality)

        if (!address) {
            throw new Error()
        }

        return address
    }
}
