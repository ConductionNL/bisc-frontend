import { Injectable, Logger } from '@nestjs/common'
import { TaalhuisRepository } from 'src/CommonGroundAPI/cc/TaalhuisRepository'
import { EmployeeRepository } from 'src/CommonGroundAPI/mrc/EmployeeRepository'

export interface UpdateTaalhuisEmployeeInput {
    employeeId: string
    givenName: string
    additionalName?: string
    familyName: string
    email: string
    telephone?: string
}

@Injectable()
export class UpdateTaalhuisEmployeeService {
    private readonly logger = new Logger(this.constructor.name)

    public constructor(
        private taalhuisRepository: TaalhuisRepository,
        private taalhuisEmployeeRepository: EmployeeRepository
    ) {}

    public async updateTaalhuisEmployee(input: UpdateTaalhuisEmployeeInput) {
        const employee = await this.taalhuisEmployeeRepository.employee({ id: input.employeeId })
        if (!employee) {
            throw new Error(`Employee with id ${input.employeeId} not found`)
        }
    }
}
