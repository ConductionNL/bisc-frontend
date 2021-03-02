import { Injectable, Logger } from '@nestjs/common'
import { TaalhuisRepository } from 'src/CommonGroundAPI/cc/TaalhuisRepository'

@Injectable()
export class DeleteTaalhuisService {
    private readonly logger = new Logger(this.constructor.name)

    public constructor(private taalhuisRepository: TaalhuisRepository) {}

    public async deleteTaalhuis(id: string) {
        return !!id
    }
}
