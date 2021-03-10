import { Injectable } from '@nestjs/common'
import { CreateOrganizationAddressInput } from 'src/CommonGroundAPI/cc/AddressRepository'
import { OrganizationRepository } from 'src/CommonGroundAPI/cc/OrganizationRepository'

export interface CreateAanbiederInput {
    address: CreateOrganizationAddressInput
    name: string
    email: string
    phoneNumber: string
}

@Injectable()
export class CreateAanbiederService {
    public constructor(private organizationRepository: OrganizationRepository) {}

    public async createAanbieder(input: CreateAanbiederInput) {
        return input ? null : null
    }
}
