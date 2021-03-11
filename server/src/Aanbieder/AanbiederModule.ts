import { Module } from '@nestjs/common'
import { CommonGroundAPIModule } from 'src/CommonGroundAPI/CommonGroundAPIModule'
import { AanbiederResolver } from './AanbiederResolver'

@Module({
    imports: [CommonGroundAPIModule],
    providers: [AanbiederResolver],
})
export class AanbiederModule {}
