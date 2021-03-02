import { Module } from '@nestjs/common'
import { CommonGroundAPIModule } from 'src/CommonGroundAPI/CommonGroundAPIModule'
import { CreateTaalhuisService } from './CreateTaalhuisService'
import { TaalhuisResolver } from './TaalhuisResolver'
import { UpdateTaalhuisService } from './UpdateTaalhuisService'

@Module({
    imports: [CommonGroundAPIModule],
    providers: [CreateTaalhuisService, TaalhuisResolver, UpdateTaalhuisService],
    exports: [],
})
export class TaalhuisModule {}
