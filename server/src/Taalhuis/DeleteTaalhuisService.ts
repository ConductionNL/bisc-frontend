import { Injectable, Logger } from '@nestjs/common'
import { assertNotNil } from 'src/AssertNotNil'
import { TaalhuisRepository } from 'src/CommonGroundAPI/cc/TaalhuisRepository'
import { EmployeeRepository } from 'src/CommonGroundAPI/mrc/EmployeeRepository'

@Injectable()
export class DeleteTaalhuisService {
    private readonly logger = new Logger(this.constructor.name)

    public constructor(private taalhuisRepository: TaalhuisRepository, private mployeeRepository: EmployeeRepository) {}

    public async deleteTaalhuis(id: string) {
        const taalhuis = await this.taalhuisRepository.getOne(id)
        assertNotNil(taalhuis, `Taalhuis ${id} not found.`)

        const employeesForTaalhuis = await this.mployeeRepository.employees({ organizationId })
    }
}
