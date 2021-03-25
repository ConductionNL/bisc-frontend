import { Injectable } from '@nestjs/common'
import { EAVRepository } from '../EAVRepository'

interface CreateEntityInput {
    name: 'person' | string
    description?: string
    type: 'cc/people' | string
}

interface UpdateEntityInput {
    id: string
    attributes?: [string]
}

@Injectable()
export class EAVEntityRepository extends EAVRepository {
    public findByEntityType(type: string) {
        return this.sdk.eavEntities({ type })
    }

    public createEntity(input: CreateEntityInput) {
        return this.sdk.createEntity({ input })
    }

    public updateEntity(input: UpdateEntityInput) {
        return this.sdk.updateEntity({ input })
    }
}
