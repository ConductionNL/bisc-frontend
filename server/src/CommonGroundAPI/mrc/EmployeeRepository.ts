import { Injectable } from '@nestjs/common'
import { assertNotNil } from 'src/AssertNotNil'
import { MRCRepository } from '../MRCRepository'

@Injectable()
export class EmployeeRepository extends MRCRepository {
    public async createEmployee(personId: string, organizationId: string) {
        const result = await this.sdk.createEmployee({
            input: { person: personId, organization: organizationId },
        })

        const employeeObject = result?.createEmployee?.employee
        assertNotNil(employeeObject, `Failed to create employee`)

        return this.returnNonNullable(employeeObject)
    }
}
