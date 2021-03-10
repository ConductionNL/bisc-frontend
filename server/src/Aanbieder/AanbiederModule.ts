import { Module } from '@nestjs/common'
import { CommonGroundAPIModule } from 'src/CommonGroundAPI/CommonGroundAPIModule'
import { AanbiederResolver } from './AanbiederResolver'
import { CreateAanbiederService } from './CreateAanbiederService'

@Module({
    imports: [CommonGroundAPIModule],
    providers: [AanbiederResolver, CreateAanbiederService],
})
export class AanbiederModule {}
