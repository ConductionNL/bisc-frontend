import { Injectable } from '@nestjs/common'
import { CCRepository } from 'src/CommonGroundAPI/CCRepository'

export interface addTaalhuisInput {
    name: string
    addressId?: string
    emailId?: string
    phoneNumberId?: string
}

@Injectable()
export class TaalhuisRepository extends CCRepository {
    public async addTaalhuis(input: addTaalhuisInput) {
        const createdTaalhuis = await this.sdk.createOrganization({ input })
        if (createdTaalhuis?.createOrganization?.organization) {
            return createdTaalhuis.createOrganization.organization
        }

        throw new Error(`Failed to create Taalhuis`)
    }
}
