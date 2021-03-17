import { Injectable } from '@nestjs/common'
import { ARCRepository } from '../ARCRepository'

interface FreeBusyInput {
    freebusy: 'FREE' | 'BUSY'
    calendarId: string
    startDate: Date
    endDate: Date
    scheduleId?: string
}

@Injectable()
export class FreebusyRepository extends ARCRepository {
    public createFreebusy(input: FreeBusyInput) {
        return this.sdk.createFreebusy({
            input: {
                calendar: input.calendarId,
                freebusy: input.freebusy,
                startDate: input.startDate.toISOString(),
                endDate: input.startDate.toISOString(),
                schedule: input.scheduleId ?? undefined,
            },
        })
    }
}
