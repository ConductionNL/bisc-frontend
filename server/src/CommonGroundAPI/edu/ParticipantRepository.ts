import { Injectable } from '@nestjs/common'
import { EDURepository } from '../EDURepository'

interface participantsParams {
    ccPersonUrl?: string
}

@Injectable()
export class ParticipantRepository extends EDURepository {
    public async participants(params: participantsParams = {}) {
        const result = await this.sdk.participants(params)

        return result.participants?.edges ?? []
    }

    public async deleteParticipant(id: string) {
        const result = await this.sdk.deleteParticipant({ input: { id } })

        return !!result
    }
}
