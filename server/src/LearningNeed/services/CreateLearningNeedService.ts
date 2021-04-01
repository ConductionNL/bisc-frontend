import request = require('request')
import { Injectable, Logger } from '@nestjs/common'
import { CommonGroundAPIs } from 'src/CommonGroundAPI/CommonGroundAPIsEnum'
import { ConfigService } from '@nestjs/config'
import { Config } from 'src/config'
import { assertNotNil } from 'src/AssertNotNil'
import {
    LearningNeedApplicationEnum,
    LearningNeedLevelEnum,
    LearningNeedOfferDifferenceEnum,
    LearningNeedService,
    LearningNeedTopicEnum,
} from './LearningNeedService'

export interface CreateLearningNeedInput {
    studentId: string
    learningNeedDescription: string
    learningNeedMotivation: string
    desiredOutComesGoal: string
    desiredOutComesTopic: LearningNeedTopicEnum
    desiredOutComesTopicOther?: string | null
    desiredOutComesApplication: LearningNeedApplicationEnum
    desiredOutComesApplicationOther?: string | null
    desiredOutComesLevel: LearningNeedLevelEnum
    desiredOutComesLevelOther?: string | null
    offerDesiredOffer: string
    offerAdvisedOffer: string
    offerDifference: LearningNeedOfferDifferenceEnum
    offerDifferenceOther?: string | null
    offerEngagements?: string | null
}

interface CreateLearningNeedRequestBody {
    participant: string
    results: string[]
    groups: string[]
    verwijzingen: string[]
    leervraagomschrijving: string
    leervraagmotivatie: string
    gewensteleeruitkomstwerkwoord: string
    gewensteleeruitkomstonderwerp: string
    gewensteleeruitkomstonderwerpanders: string | null
    gewensteleeruitkomsttoepassing: string
    gewensteleeruitkomsttoepassinganders: string | null
    gewensteleeruitkomstniveau: string
    gewensteleeruitkomstniveauanders: string | null
    aanbodgewensteaanbod: string
    aanbodgeadviseerdaanbod: string
    aanbodverschilwensadvies: string
    aanbodverschilwensadviesanders: string | null
    aanbodafspraken: string | null
}

interface CCObjectCommunicationInput {
    componentCode: 'cc'
    entityName: 'people'
    '@self': string
}

interface MRCObjectCommunicationInput {
    componentCode: 'mrc'
    entityName: 'employees'
    '@self': string
}

interface EDUObjectCommunicationInput {
    componentCode: 'edu'
    entityName: 'participants' | 'tests' | 'results'
    '@self': string
}

interface EDUParticipantObjectCommunicationInput extends EDUObjectCommunicationInput {
    entityName: 'participants'
    leervragen: string[]
}

type CreateObjectCommunicationInput =
    | CCObjectCommunicationInput
    | MRCObjectCommunicationInput
    | EDUObjectCommunicationInput
    | EDUParticipantObjectCommunicationInput

type UpdateObjectCommunicationInput = CreateObjectCommunicationInput & {
    objectEntityId: string
}

@Injectable()
export class CreateLearningNeedService {
    private readonly logger = new Logger(this.constructor.name)

    public constructor(
        private configService: ConfigService<Config>,
        private learningNeedService: LearningNeedService
    ) {}

    public async createLearingNeed(input: CreateLearningNeedInput) {
        const response = await this.createLearingNeedEAVObject({
            participant: input.studentId,
            results: [],
            groups: [],
            verwijzingen: [],
            leervraagomschrijving: input.learningNeedDescription,
            leervraagmotivatie: input.learningNeedMotivation,
            gewensteleeruitkomstwerkwoord: input.desiredOutComesGoal,
            gewensteleeruitkomstonderwerp: input.desiredOutComesTopic,
            gewensteleeruitkomstonderwerpanders: input.desiredOutComesTopicOther ?? null,
            gewensteleeruitkomsttoepassing: input.desiredOutComesApplication,
            gewensteleeruitkomsttoepassinganders: input.desiredOutComesApplicationOther ?? null,
            gewensteleeruitkomstniveau: input.desiredOutComesLevel,
            gewensteleeruitkomstniveauanders: input.desiredOutComesLevelOther ?? null,
            aanbodgewensteaanbod: input.offerDesiredOffer,
            aanbodgeadviseerdaanbod: input.offerAdvisedOffer,
            aanbodverschilwensadvies: input.offerDifference,
            aanbodverschilwensadviesanders: input.offerDifferenceOther ?? null,
            aanbodafspraken: input.offerEngagements ?? null,
        })

        const learningNeedId = response['@id']
        assertNotNil(learningNeedId, `Created LearningNeed but didnt get an ID, response: ${JSON.stringify(response)}`)

        await this.addNewIdToParticipantLearningNeedsArray(input.studentId, learningNeedId)

        return this.learningNeedService.findById(learningNeedId)
    }

    private async addNewIdToParticipantLearningNeedsArray(participantId: string, newLearningNeedId: string) {
        const eavParticipant = await this.learningNeedService.getEavParticipant(participantId)

        if (eavParticipant) {
            // Update existing eavParticipant
            const participantLearningNeeds = eavParticipant.leervragen
            participantLearningNeeds.push(newLearningNeedId)

            const body: UpdateObjectCommunicationInput = {
                objectEntityId: eavParticipant.id,
                componentCode: 'edu',
                entityName: 'participants',
                '@self': participantId,
                leervragen: participantLearningNeeds,
            }

            return this.createOrUpdateEavObjectCommunication(body)
        }

        // Create new eavParticipant
        const body: CreateObjectCommunicationInput = {
            componentCode: 'edu',
            entityName: 'participants',
            '@self': participantId,
            leervragen: [newLearningNeedId],
        }

        return this.createOrUpdateEavObjectCommunication(body)
    }

    private async createOrUpdateEavObjectCommunication(
        bodyJson: CreateObjectCommunicationInput | UpdateObjectCommunicationInput
    ) {
        const baseUrl = CommonGroundAPIs.EAV

        const body = JSON.stringify(bodyJson)

        const responseString: string | null = await new Promise((resolve, reject) => {
            return request(
                `${baseUrl}/object_communications`,
                {
                    method: 'POST',
                    body,
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: this.configService.get('API_KEY'),
                    },
                },
                (err, res) => {
                    this.logger.debug(body)
                    this.logger.debug(res.body)

                    if (err) {
                        reject(err)
                        return
                    }

                    // 201 = created
                    if (res.statusCode === 201) {
                        resolve(res.body)
                        return
                    }

                    // We expect only 201, reject on any other response
                    reject(res.body)
                    return
                }
            )
        })

        const responseObject = responseString ? JSON.parse(responseString) : null

        return responseObject
    }

    private async createLearingNeedEAVObject(requestBody: CreateLearningNeedRequestBody) {
        const baseUrl = CommonGroundAPIs.EAV

        const body = JSON.stringify(requestBody)

        const responseString: string = await new Promise((resolve, reject) => {
            return request(
                `${baseUrl}/object_entities/eav/leervragen`,
                {
                    method: 'POST',
                    body,
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: this.configService.get('API_KEY'),
                    },
                },
                (err, res) => {
                    this.logger.debug(body)
                    this.logger.debug(res.body)

                    if (err) {
                        reject(err)
                        return
                    }

                    // 201 = created
                    if (res.statusCode === 201) {
                        resolve(res.body)
                        return
                    }

                    // We expect only 201, reject on any other response
                    reject(res.body)
                    return
                }
            )
        })

        const responseObject = responseString ? JSON.parse(responseString) : null

        return responseObject
    }
}
