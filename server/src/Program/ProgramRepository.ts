import { Injectable } from '@nestjs/common'
import { assertNotNil } from 'src/AssertNotNil'
import { EDURepository } from 'src/CommonGroundAPI/EDURepository'

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
}
