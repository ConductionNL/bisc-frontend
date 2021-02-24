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
    public addTaalhuis(input: addTaalhuisInput) {
        //
        return !!input
    }
}
