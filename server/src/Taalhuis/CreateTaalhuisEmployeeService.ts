import { Injectable, Logger } from '@nestjs/common'
import { AppError } from 'src/AppError'
import { assertNotNil } from 'src/AssertNotNil'
import { EmailRepository } from 'src/CommonGroundAPI/cc/EmailRepository'
import { OrganizationRepository, OrganizationTypesEnum } from 'src/CommonGroundAPI/cc/OrganizationRepository'
import { PersonRepository } from 'src/CommonGroundAPI/cc/PersonRepository'
import { TelephoneRepository } from 'src/CommonGroundAPI/cc/TelephoneRepository'
import { EmployeeRepository } from 'src/CommonGroundAPI/mrc/EmployeeRepository'
import { GroupRepository } from 'src/CommonGroundAPI/uc/GroupRepository'
import { UserRepository } from 'src/CommonGroundAPI/uc/UserRepository'
import { ErrorCode } from 'src/ErrorCodes'
import { PasswordHashingService } from 'src/User/services/PasswordHashingService'
import { TaalhuisEmployeeService } from './TaalhuisEmployeeService'

export interface CreateTaalhuisEmployeeInput {
    taalhuisId: string
    userGroupId: string
    givenName: string
    additionalName?: string
    familyName: string
    email: string
    telephone?: string
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
        private passwordHashingService: PasswordHashingService,
        private taalhuisEmployeeService: TaalhuisEmployeeService,
        private groupRepository: GroupRepository,
        private organizationRepository: OrganizationRepository
    ) {}

    public async createTaalhuisEmployee(input: CreateTaalhuisEmployeeInput) {
        const existingUser = await this.userRepository.findByEmail(input.email)
        if (existingUser) {
            throw new AppError(ErrorCode.EntityAlreadyExists, {
                entity: 'User',
                field: 'email',
                value: input.email,
            })
        }

        // cc/organization
        const taalhuis = await this.organizationRepository.getOne(input.taalhuisId, OrganizationTypesEnum.TAALHUIS)
        assertNotNil(taalhuis, `Taalhuis with id ${input.taalhuisId} not found`)
        assertNotNil(
            taalhuis.sourceOrganization,
            `Taalhuis ${taalhuis.id} should have a sourceOrganization, but it doesn't`
        )

        // cc/email
        const email = await this.emailRepository.createEmail(input.email)
        // cc/telephone
        const telephone = input.telephone ? await this.telephoneRepository.createTelephone(input.telephone) : undefined
        // cc/person
        const person = await this.personRepository.createPerson({
            ...input,
            telephoneId: telephone ? telephone.id : undefined,
            emailId: email.id,
        })

        // mrc/employee (link cc/person and cc/organization)
        const employee = await this.employeeRepository.createEmployee(person.id, taalhuis.id)

        // uc/group
        const groups = await this.groupRepository.findByOrganizationId(taalhuis.sourceOrganization)
        const userGroup = groups.find(group => group.id === input.userGroupId)
        assertNotNil(userGroup, `Given UserGroup ${input.userGroupId} does not exist for Taalhuis ${input.taalhuisId}`)

        // uc/user (link cc/person and uc/group)
        const randomPasswordHash = await this.passwordHashingService.hash(this.passwordHashingService.randomPassword())
        await this.userRepository.createUser(
            input.email,
            person.id,
            this.userRepository.stripURLfromID(userGroup.id),
            randomPasswordHash
        )

        return this.taalhuisEmployeeService.findById(employee.id)
    }
}
