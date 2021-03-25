import { Injectable } from '@nestjs/common'
import { EAVRepository } from '../EAVRepository'

interface CreateAttributeInput {
    name: string
    format: 'string' | 'integer' | 'boolean' | 'array' | 'datetime'
    type: 'string' | 'integer' | 'boolean' | 'array' | 'datetime'
}

@Injectable()
export class EAVAttributeRepository extends EAVRepository {
    public creatAttribute(input: CreateAttributeInput) {
        return this.sdk.createAttribute({ input })
    }
}
