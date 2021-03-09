import { Injectable, Logger } from '@nestjs/common'
import { EmployeeRepository } from 'src/CommonGroundAPI/mrc/EmployeeRepository'

@Injectable()
export class DeleteTaalhuisEmployeeService {
    private readonly logger = new Logger(this.constructor.name)

    public constructor(private employeeRepository: EmployeeRepository) {}

    public async deleteTaalhuisEmplyoee(employeeId: string) {
        const employee = await this.employeeRepository.employee
    }
}
