import { Injectable } from '@nestjs/common'
import { assertNotNil } from 'src/AssertNotNil'
import { OrganizationRepository, OrganizationTypesEnum } from 'src/CommonGroundAPI/cc/OrganizationRepository'
import { PersonRepository } from 'src/CommonGroundAPI/cc/PersonRepository'
import { ParticipantRepository, ParticipantStatusEnum } from 'src/CommonGroundAPI/edu/ParticipantRepository'
import { ProgramRepository } from 'src/CommonGroundAPI/edu/ProgramRepository'

type StudentEntity = {
    id: string
    status: ParticipantStatusEnum
    dateCreated: string
    givenName: string
    additionalName?: string
    familyName: string
}

@Injectable()
export class RegistrationService {
    public constructor(
        private organizationRepository: OrganizationRepository,
        private programRepository: ProgramRepository,
        // private addressRepository: AddressRepository,
        // private emailRepository: EmailRepository,
        // private telephoneRepository: TelephoneRepository,
        private personRepository: PersonRepository,
        private participantRepository: ParticipantRepository
    ) {}

    public async findByTaalhuisId(taalhuisId: string) {
        const taalhuis = await this.organizationRepository.getOne(taalhuisId, OrganizationTypesEnum.TAALHUIS)
        const program = await this.programRepository.findBySourceOrganizationId(taalhuis.sourceOrganization)
        const participants = await this.participantRepository.findByProgramId(program.id)

        const students: StudentEntity[] = await Promise.all(
            participants.map(async participant => {
                const person = await this.personRepository.findById(participant.person)
                assertNotNil(person, `Person ${participant.person} not found for Participant ${participant.id}`)

                return {
                    id: participant.id,
                    status: participant.status,
                    dateCreated: participant.dateCreated,
                    givenName: person.givenName,
                    additionalName: person.additionalName,
                    familyName: person.familyName,
                }
            })
        )

        return students
    }
}
