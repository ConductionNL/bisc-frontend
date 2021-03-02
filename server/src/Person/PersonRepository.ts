import { Injectable } from '@nestjs/common'
import { assertNotNil } from 'src/AssertNotNil'
import { CCRepository } from 'src/CommonGroundAPI/CCRepository'

interface CreatePersonInput {
    givenName: string
    additionalName?: string
    familyName: string
    telephoneId: string
    emailId: string
}

// TODO: Move file to src/CommonGroundAPI/ccc + add to CommonGroundAPIModule instead of PersonModule
@Injectable()
export class PersonRepository extends CCRepository {
    public async findPersons() {
        const result = await this.sdk.persons()

        return result?.people?.edges
    }

    public async createPerson(input: CreatePersonInput) {
        const result = await this.sdk.createPerson({
            input: {
                givenName: input.givenName,
                additionalName: input.additionalName,
                familyName: input.familyName,
                telephones: [input.telephoneId],
                emails: [input.emailId],
            },
        })

        const personObject = result?.createPerson?.person
        assertNotNil(personObject, `Failed to create email`)

        personObject.id = this.makeURLfromID(personObject.id)

        return this.returnNonNullable(personObject)
    }
}
