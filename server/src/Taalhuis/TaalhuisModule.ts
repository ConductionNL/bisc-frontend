import { Module } from '@nestjs/common'
import { CommonGroundAPIModule } from 'src/CommonGroundAPI/CommonGroundAPIModule'
import { CreateTaalhuisService } from './CreateTaalhuisService'
import { TaalhuisResolver } from './TaalhuisResolver'

@Module({
    providers: [CreateTaalhuisService, TaalhuisResolver],
    // exports: [TaalhuisRepository],
    imports: [CommonGroundAPIModule],
})
export class TaalhuisModule {}
