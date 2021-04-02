import { Injectable, Logger } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { Config } from 'src/config'
import { LearningNeedApplicationEnum, LearningNeedLevelEnum, LearningNeedTopicEnum } from './LearningNeedService'

export enum ParticipationStatusEnum {
    ACTIVE = 'ACTIVE', // Lopend
    COMPLETED = 'COMPLETED', // Afgerond
    REFERRED = 'REFERRED', // Verwezen
}

export enum ParticipationOfferCourseEnum {
    LANGUAGE = 'LANGUAGE', // Taal
    MATH = 'MATH', // Rekenen
    DIGITAL = 'DIGITAL', // Digitale vaardigheden
    OTHER = 'OTHER', // Overige
}

export enum ParticipationGroupFormationEnum {
    INDIVIDUALLY = 'INDIVIDUALLY', // Individueel
    IN_A_GROUP = 'IN_A_GROUP', // In een groep
}

export interface CreateParticipationInput {
    learningNeedId: string

    aanbiederId?: string | null
    aanbiederName?: string | null
    aanbiederNote?: string | null

    offerName?: string | null
    offerCourse?: ParticipationOfferCourseEnum | null

    outComesGoal?: string | null
    outComesTopic?: LearningNeedTopicEnum | null
    outComesTopicOther?: string | null
    outComesApplication?: LearningNeedApplicationEnum | null
    outComesApplicationOther?: string | null
    outComesLevel?: LearningNeedLevelEnum | null
    outComesLevelOther?: string | null

    detailsIsFormal?: boolean | null
    detailsGroupFormation?: ParticipationGroupFormationEnum | null
    detailsTotalClassHours?: number | null
    detailsCertificateWillBeAwarded?: boolean | null
    detailsStartDate?: Date | null
    detailsEndDate?: Date | null
    detailsEngagements?: string | null
}

@Injectable()
export class ParticipationService {
    private readonly logger = new Logger(this.constructor.name)

    public constructor(private configService: ConfigService<Config>) {}
}
