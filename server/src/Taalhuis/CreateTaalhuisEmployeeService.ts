import { Injectable, Logger } from '@nestjs/common'
import { EmailRepository } from 'src/CommonGroundAPI/cc/EmailRepository'
import { TelephoneRepository } from 'src/CommonGroundAPI/cc/TelephoneRepository'
import { EmployeeRepository } from 'src/CommonGroundAPI/mrc/EmployeeRepository'
import { UserRepository } from 'src/CommonGroundAPI/uc/UserRepository'
import { PersonRepository } from 'src/Person/PersonRepository'
import { PasswordHashingService } from 'src/User/services/PasswordHashingService'

export interface CreateTaalhuisEmployeeInput {
    taalhuisId: string
    userGroupId: string
    givenName: string
    additionalName?: string
    familyName: string
    email: string
    telephone: string
}

@Injectable()
export class CreateTaalhuisEmployeeService {
    private readonly logger = new Logger(this.constructor.name)

    public constructor(
        private emailRepository: EmailRepository,
        private telephoneRepository: TelephoneRepository,
        private personRepository: PersonRepository,
        private employeeRepository: EmployeeRepository,
        private userRepository: UserRepository,
        private passwordHashingService: PasswordHashingService
    ) {}

    // public async createTaalhuis(input: CreateTaalhuisEmployeeInput): Promise<TaalhuisType> {
    public async createTaalhuisEmployee(input: CreateTaalhuisEmployeeInput) {
        // TODO: Fetch taalhuis, see if it exists

        // cc/organisation
        const taalhuis = { id: input.taalhuisId }
        // cc/email
        const email = await this.emailRepository.createEmail(input.email)
        // cc/telephone
        const telephone = await this.telephoneRepository.createTelephone(input.telephone)
        // cc/person
        const person = await this.personRepository.createPerson({
            ...input,
            telephoneId: telephone.id,
            emailId: email.id,
        })

        // mrc/employee (link cc/person and cc/organization)
        const employee = await this.employeeRepository.createEmployee(person.id, taalhuis.id)

        // uc/user (link cc/person and uc/group)
        const randomPasswordHash = await this.passwordHashingService.hash(this.passwordHashingService.randomPassword())
        const user = await this.userRepository.createUser(input.email, person.id, randomPasswordHash)

        return {
            id: user.id,
            email: email.email,
            telephone: telephone.telephone,
            givenName: person.givenName,
            additionalName: person.additionalName,
            familyName: person.familyName,
        }
    }
}
