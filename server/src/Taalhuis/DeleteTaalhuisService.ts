import { Injectable, Logger } from '@nestjs/common'
import { assertNotNil } from 'src/AssertNotNil'
import { AddressRepository } from 'src/CommonGroundAPI/cc/AddressRepository'
import { EmailRepository } from 'src/CommonGroundAPI/cc/EmailRepository'
import { PersonRepository } from 'src/CommonGroundAPI/cc/PersonRepository'
import { TaalhuisRepository } from 'src/CommonGroundAPI/cc/TaalhuisRepository'
import { TelephoneRepository } from 'src/CommonGroundAPI/cc/TelephoneRepository'
import { ParticipantRepository } from 'src/CommonGroundAPI/edu/ParticipantRepository'
import { ProgramRepository } from 'src/CommonGroundAPI/edu/ProgramRepository'
import { EmployeeRepository } from 'src/CommonGroundAPI/mrc/EmployeeRepository'
import { SourceTaalhuisRepository } from 'src/CommonGroundAPI/wrc/SourceTaalhuisRepository'

export interface DeleteTaalhuisInput {
    id: string
}

@Injectable()
export class DeleteTaalhuisService {
    private readonly logger = new Logger(this.constructor.name)

    public constructor(
        private participantRepository: ParticipantRepository,
        private taalhuisRepository: TaalhuisRepository,
        private employeeRepository: EmployeeRepository,
        private personRepository: PersonRepository,
        private programRepository: ProgramRepository,
        private sourceTaalhuisRepository: SourceTaalhuisRepository,
        private addressRepository: AddressRepository,
        private emailRepository: EmailRepository,
        private telephoneRepository: TelephoneRepository
    ) {}

    public async deleteTaalhuis(id: string) {
        const taalhuis = await this.taalhuisRepository.getOne(id)
        assertNotNil(taalhuis, `Taalhuis ${id} not found.`)

        const employeesForTaalhuis = await this.employeeRepository.employees({
            organizationId: this.taalhuisRepository.makeURLfromID(taalhuis.id),
        })

        // delete employees and participantobjects
        if (employeesForTaalhuis && employeesForTaalhuis.length) {
            const employeePersonList = employeesForTaalhuis.map(e => e?.node?.person).filter(this.notUndefined)
            const participants = await this.participantRepository.participants({
                ccPersonUrls: employeePersonList.map(p => this.personRepository.makeURLfromID(p)),
            })
            for (const participant of participants) {
                if (!participant?.node?.id) {
                    continue
                }
                await this.participantRepository.deleteParticipant(participant.node.id)
            }

            for (const employee of employeesForTaalhuis) {
                if (!employee?.node?.id) {
                    continue
                }
                await this.employeeRepository.deleteEmployee(employee.node?.id)
            }
        }

        // delete programs
        const programsForTaalhuis = await this.programRepository.findPrograms({ provider: taalhuis.sourceTaalhuis })
        for (const program of programsForTaalhuis) {
            if (!program?.node?.id) {
                continue
            }
            await this.programRepository.deleteProgram(program.node.id)
        }

        // delete contact entities
        if (taalhuis.address?.id) {
            await this.addressRepository.deleteAddress(taalhuis.address.id)
        }
        if (taalhuis.telephoneId) {
            await this.telephoneRepository.deleteTelephone(taalhuis.telephoneId)
        }
        if (taalhuis.emailId) {
            await this.emailRepository.deleteEmail(taalhuis.emailId)
        }

        // delete cc/organization
        await this.taalhuisRepository.deleteTaalhuis(taalhuis.id)
        // delete wrc/organization
        await this.sourceTaalhuisRepository.deleteSourceTaalhuis(taalhuis.sourceTaalhuis)

        return true
    }

    private notUndefined<T>(x: T | undefined): x is T {
        return x !== undefined
    }
}
