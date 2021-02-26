import { Injectable } from '@nestjs/common'
import { UCRepository } from 'src/CommonGroundAPI/UCRepository'
import { CreateGroupInput } from 'src/generated/uc-graphql'

@Injectable()
export class GroupRepository extends UCRepository {
    public async createGroup(input: CreateGroupInput) {
        const group = await this.sdk.createGroup({ input })

        return group.createGroup?.group
    }
}
