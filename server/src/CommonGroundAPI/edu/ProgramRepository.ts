import { Injectable } from '@nestjs/common'
import { assertNotNil } from 'src/AssertNotNil'
import { EDURepository } from 'src/CommonGroundAPI/EDURepository'

interface programsParams {
    provider?: string
}

@Injectable()
export class ProgramRepository extends EDURepository {
    public async createProgram(name: string, providerId: string) {
        const result = await this.sdk.createProgram({
            input: {
                name,
                provider: providerId,
            },
        })

        const program = result?.createProgram?.program
        assertNotNil(program, `Failed to create program`)

        return this.returnNonNullable(program)
    }

    public async deleteProgram(id: string) {
        const result = await this.sdk.deleteProgram({ input: { id } })

        return !!result
    }

    public async findPrograms(params: programsParams = {}) {
        const result = await this.sdk.programs(params)

        return result.programs?.edges ?? []
    }
}
