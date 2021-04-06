import { Injectable } from '@nestjs/common'
import { assertNotNil } from 'src/AssertNotNil'
import { AddressRepository } from 'src/CommonGroundAPI/cc/AddressRepository'
import { EmailRepository } from 'src/CommonGroundAPI/cc/EmailRepository'
import { PersonRepository } from 'src/CommonGroundAPI/cc/PersonRepository'
import { TelephoneRepository } from 'src/CommonGroundAPI/cc/TelephoneRepository'
import { ParticipantRepository } from 'src/CommonGroundAPI/edu/ParticipantRepository'
import { ParticipantStatusEnum } from 'src/CommonGroundAPI/edu/ParticipantStatusEnum'

@Injectable()
export class RegistrationService {
    public constructor(
        private addressRepository: AddressRepository,
        private emailRepository: EmailRepository,
        private telephoneRepository: TelephoneRepository,
        private personRepository: PersonRepository,
        private participantRepository: ParticipantRepository
    ) {}

    public async deleteRegistration(studentId: string) {
        const student = await this.participantRepository.findById(studentId)
        if (student.status !== ParticipantStatusEnum.pending) {
            throw new Error(
                `Registration can only be deleted when status = pending, student ${studentId} has status ${student.status}`
            )
        }

        const person = await this.personRepository.findById(student.person)
        assertNotNil(person, `Person ${student.person} not found for Participant ${student.id}`)

        await this.participantRepository.deleteParticipant(student.id)

        for (const addressId of person.addressIds) {
            await this.addressRepository.deleteAddress(addressId)
        }

        if (person.emailId) {
            await this.emailRepository.deleteEmail(person.emailId)
        }

        if (person.telephoneId) {
            await this.telephoneRepository.deleteTelephone(person.telephoneId)
        }

        await this.personRepository.deletePerson(person.id)

        // TODO: Delete registrar + memo

        return true
    }

    public async acceptRegistration(studentId: string) {
        const student = await this.participantRepository.findById(studentId)
        if (student.status !== ParticipantStatusEnum.pending) {
            throw new Error(
                `Registration can only be accepted when status = pending, student ${studentId} has status ${student.status}`
            )
        }

        await this.participantRepository.updateParticipantStatus(student.id, ParticipantStatusEnum.accepted)

        return true
    }
}
