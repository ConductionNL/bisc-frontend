import { Injectable } from '@nestjs/common'
import { ARCRepository } from '../ARCRepository'

interface CreateScheduleInput {
    name: string
    repeatTill: Date
    freebusies: string[]
    repeatFrequency: 'P' | 'Y' | 'M' | 'W' | 'D' | 'T' | 'H' | 'M' | 'S' // https://en.wikipedia.org/wiki/ISO_8601#Durations
}

@Injectable()
export class ScheduleRepository extends ARCRepository {
    public async createSchedule(input: CreateScheduleInput) {
        await this.sdk.createSchedule({
            input: {
                name: input.name,
                repeatTill: input.repeatTill.toISOString(),
                freebusies: input.freebusies,
                repeatFrequency: input.repeatFrequency,
            },
        })
    }
}
