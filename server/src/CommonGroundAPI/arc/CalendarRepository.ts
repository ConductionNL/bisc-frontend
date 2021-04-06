import { Injectable } from '@nestjs/common'
import { ARCRepository } from '../ARCRepository'

interface CreateCalendarInput {
    personId: string
    organizationId: string
    name: string
    timeZone: string //mandatory
}

@Injectable()
export class CalendarRepository extends ARCRepository {
    public createCalendar(input: CreateCalendarInput) {
        return this.sdk.createCalendar({ input })
    }
}
