import { Module } from '@nestjs/common'
import { CommonGroundAPIModule } from 'src/CommonGroundAPI/CommonGroundAPIModule'
import { AanbiederResolver } from './AanbiederResolver'
import { CreateAanbiederService } from './CreateAanbiederService'
import { DeleteAanbiederService } from './DeleteAanbiederService'
import { UpdateAanbiederService } from './UpdateAanbiederService'

@Module({
    imports: [CommonGroundAPIModule],
    providers: [AanbiederResolver, CreateAanbiederService, DeleteAanbiederService, UpdateAanbiederService],
})
export class AanbiederModule {}
