import request = require('request')
import { Injectable } from '@nestjs/common'
import { CommonGroundAPIs } from 'src/CommonGroundAPI/CommonGroundAPIsEnum'
import { ConfigService } from '@nestjs/config'
import { Config } from 'src/config'
import { assertNotNil } from 'src/AssertNotNil'

export enum LearningNeedTopicEnum {
    DUTCH_READING = 'DUTCH_READING', // Nederlands: Lezen
    DUTCH_WRITING = 'DUTCH_WRITING', // Nederlands: Schrijven

    MATH_NUMBERS = 'MATH_NUMBERS', // Rekenen: Getallen
    MATH_PROPORTION = 'MATH_PROPORTION', // Rekenen: Verhoudingen
    MATH_GEOMETRY = 'MATH_GEOMETRY', // Rekenen: Meten en meetkunde
    MATH_LINKS = 'MATH_LINKS', // Rekenen: Verbanden

    DIGITAL_USING_ICT_SYSTEMS = 'DIGITAL_USING_ICT_SYSTEMS', // Digitale vaardigheden: ICT-systemen gebruiken
    DIGITAL_SEARCHING_INFORMATION = 'DIGITAL_SEARCHING_INFORMATION', // Digitale vaardigheden: Informatie zoeken
    DIGITAL_PROCESSING_INFORMATION = 'DIGITAL_PROCESSING_INFORMATION', // Digitale vaardigheden: Informatie verwerken en presenteren
    DIGITAL_COMMUNICATION = 'DIGITAL_COMMUNICATION', // Digitale vaardigheden: Communicatie

    KNOWLEDGE = 'KNOWLEDGE', // Kennis
    SKILLS = 'SKILLS', // Vaardigheden
    ATTITUDE = 'ATTITUDE', // Houding
    BEHAVIOUR = 'BEHAVIOUR', // Gedrag

    OTHER = 'OTHER',
}

export enum LearningNeedApplicationEnum {
    FAMILY_AND_PARENTING = 'FAMILY_AND_PARENTING', // gezin en opvoeden
    LABOR_MARKET_AND_WORK = 'LABOR_MARKET_AND_WORK', // arbeidsmarkt en werk
    HEALTH_AND_WELLBEING = 'HEALTH_AND_WELLBEING', // gezondheid en welzijn
    ADMINISTRATION_AND_FINANCE = 'ADMINISTRATION_AND_FINANCE', // administratie en financiën
    HOUSING_AND_NEIGHBORHOOD = 'HOUSING_AND_NEIGHBORHOOD', // wonen en buurt
    SELFRELIANCE = 'SELFRELIANCE', // zelfredzaamheid

    OTHER = 'OTHER',
}

export enum LearningNeedLevelEnum {
    INSTROOM = 'INSTROOM', // Instroom
    NLQF1 = 'NLQF1', // NLQF 1
    NLQF2 = 'NLQF2', // NLQF 2
    NLQF3 = 'NLQF3', // NLQF 3
    NLQF4 = 'NLQF4', // NLQF 4

    OTHER = 'OTHER',
}

export enum LearningNeedOfferDifferenceEnum {
    NO = 'NO', // Nee, er is geen verschil
    YES_DISTANCE = 'YES_DISTANCE', // Ja, want: niet aangeboden binnen bereisbare afstand
    YES_WAITINGLIST = 'YES_WAITINGLIST', // Ja, want: wachtlijst
    YES_OTHER = 'YES_OTHER', // Ja, want: anders
}

export interface CreateLearningNeedInput {
    studentId: string
    learningNeedDescription: string
    learningNeedMotivation: string
    desiredOutComesGoal: string
    desiredOutComesTopic: LearningNeedTopicEnum
    desiredOutComesTopicOther: string
    desiredOutComesApplication: LearningNeedApplicationEnum
    desiredOutComesApplicationOther: string
    desiredOutComesLevel: LearningNeedLevelEnum
    desiredOutComesLevelOther: string
    offerDesiredOffer: string
    offerAdvisedOffer: string
    offerDifference: LearningNeedOfferDifferenceEnum
    offerDifferenceOther: string
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
    gewensteleeruitkomstonderwerpanders: string
    gewensteleeruitkomsttoepassing: string
    gewensteleeruitkomsttoepassinganders: string
    gewensteleeruitkomstniveau: string
    gewensteleeruitkomstniveauanders: string
    aanbodgewensteaanbod: string
    aanbodgeadviseerdaanbod: string
    aanbodverschilwensadvies: string
    aanbodverschilwensadviesanders: string
    aanbodafspraken?: string | null
}

@Injectable()
export class CreateLearningNeedService {
    public constructor(private configService: ConfigService<Config>) {}

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
            gewensteleeruitkomstonderwerpanders: input.desiredOutComesTopicOther,
            gewensteleeruitkomsttoepassing: input.desiredOutComesApplication,
            gewensteleeruitkomsttoepassinganders: input.desiredOutComesApplicationOther,
            gewensteleeruitkomstniveau: input.desiredOutComesLevel,
            gewensteleeruitkomstniveauanders: input.desiredOutComesLevelOther,
            aanbodgewensteaanbod: input.offerDesiredOffer,
            aanbodgeadviseerdaanbod: input.offerAdvisedOffer,
            aanbodverschilwensadvies: input.offerDifference,
            aanbodverschilwensadviesanders: input.offerDifferenceOther,
            aanbodafspraken: input.offerEngagements,
        })

        const learningNeedId = response['@id']
        assertNotNil(learningNeedId, `Created LearningNeed but didnt get an ID, response: ${JSON.stringify(response)}`)

        await this.addNewIdToParticipantLearningNeedsArray(input.studentId, learningNeedId)

        return {
            id: learningNeedId,
        }
    }

    private async addNewIdToParticipantLearningNeedsArray(participantId: string, newLearningNeedId: string) {
        // TODO: Update eav object for participant
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
                    console.log(res.statusCode)
                    console.log(res.body)
                    console.log(body)

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
