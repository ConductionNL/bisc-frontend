import { Injectable } from '@nestjs/common'
import { assertNotNil } from 'src/AssertNotNil'
import { Employee } from 'src/generated/mrc-graphql'
import { MRCRepository } from '../MRCRepository'

interface employeesParams {
    organizationId?: string
}

type EmployeeEntity = Pick<Employee, 'id' | 'person' | 'organization'>

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

        const employeeEdges = result.employees?.edges

        if (!employeeEdges) {
            return []
        }

        const employeeEntities: EmployeeEntity[] = employeeEdges.map(employeeEdge => {
            const id = employeeEdge?.node?.id
            assertNotNil(id)

            const person = employeeEdge?.node?.person
            assertNotNil(person)

            const organization = employeeEdge?.node?.organization
            assertNotNil(organization)

            return {
                id: this.makeURLfromID(id),
                person,
                organization,
            }
        })

        return employeeEntities
    }

    public async deleteEmployee(id: string) {
        const result = await this.sdk.deleteEmployee({ input: { id } })

        return !!result
    }
}
