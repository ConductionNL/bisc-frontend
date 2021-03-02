import { Injectable } from '@nestjs/common'
import { assertNotNil } from 'src/AssertNotNil'
import { MRCRepository } from '../MRCRepository'

interface employeesParams {
    organizationId?: string
}

@Injectable()
export class EmployeeRepository extends MRCRepository {
    public async createEmployee(personId: string, organizationId: string) {
        const result = await this.sdk.createEmployee({
            input: { person: personId, organization: organizationId },
        })

        const employeeObject = result?.createEmployee?.employee
        assertNotNil(employeeObject, `Failed to create employee`)

        employeeObject.id = this.makeURLfromID(employeeObject.id)

        return this.returnNonNullable(employeeObject)
    }

    public async employees(params: employeesParams = {}) {
        const result = await this.sdk.employees(params)

        return result.employees?.edges ?? []
    }

    public async deleteEmployee(id: string) {
        const result = await this.sdk.deleteEmployee({ input: { id } })

        return !!result
    }
}
