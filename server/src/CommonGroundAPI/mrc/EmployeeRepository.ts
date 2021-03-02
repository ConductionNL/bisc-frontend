import { Injectable } from '@nestjs/common'
import { MRCRepository } from '../MRCRepository'

interface employeesParams {
    organizationId?: string
}

@Injectable()
export class EmployeeRepository extends MRCRepository {
    public async employees(params: employeesParams = {}) {
        const result = await this.sdk.employees(params)

        return result.employees?.edges ?? []
    }

    public async deleteEmployee(id: string) {
        const result = await this.sdk.deleteEmployee({ input: { id } })

        return !!result
    }
}
